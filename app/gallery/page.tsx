"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Images, Trash2, Loader2, ExternalLink, UploadCloud, FolderOpen, Copy } from "lucide-react";
import { copyText, formatBytes, originOf, timeAgo } from "@/lib/utils";
import { useToast } from "@/components/ToastProvider";
import Reveal from "@/components/Reveal";

interface GalleryItem {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
}

const PAGE_SIZE = 18;

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  const load = useCallback(async (cur: string | null, append: boolean) => {
    if (append) setLoadingMore(true);
    else setLoading(true);
    try {
      const q = new URLSearchParams({ limit: String(PAGE_SIZE) });
      if (cur) q.set("cursor", cur);
      const res = await fetch(`/api/images?${q}`);
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      setItems((prev) => (append ? [...prev, ...data.blobs] : data.blobs));
      setCursor(data.cursor ?? null);
      setHasMore(data.hasMore ?? false);
    } catch {
      toast("Gagal memuat gallery", "error");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [toast]);

  useEffect(() => {
    load(null, false);
  }, [load]);

  const remove = async (pathname: string) => {
    if (deleting) return;
    setDeleting(pathname);
    try {
      const res = await fetch(`/api/images?path=${encodeURIComponent(pathname)}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.pathname !== pathname));
        toast("Gambar dihapus");
      } else {
        toast("Gagal menghapus", "error");
      }
    } catch {
      toast("Gagal menghapus", "error");
    } finally {
      setDeleting(null);
    }
  };

  const copyLink = async (item: GalleryItem) => {
    const ok = await copyText(`${originOf()}/${item.pathname}`);
    toast(ok ? "Link disalin" : "Gagal menyalin", ok ? "success" : "error");
  };

  return (
    <div className="mx-auto max-w-6xl px-5 pt-32 pb-10">
      <Reveal className="text-center">
        <p className="font-mono text-xs tracking-widest text-cyan-400 uppercase">// storage.gallery</p>
        <h1 className="section-title mt-3 text-white">
          Gallery <span className="text-gradient">Gambar</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-slate-400">
          Semua file yang sudah kamu upload, tersimpan di blob storage.
        </p>
      </Reveal>

      {loading ? (
        <div className="mt-14 flex flex-col items-center gap-3 text-slate-500">
          <Loader2 size={28} className="animate-spin text-cyan-400" />
          <span className="font-mono text-xs">memuat isi blob storage...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="mt-14 flex flex-col items-center gap-5 text-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400/20 via-violet-400/20 to-pink-400/20 ring-1 ring-white/10"
          >
            <FolderOpen size={40} className="text-slate-500" />
          </motion.div>
          <div>
            <p className="font-display text-lg font-semibold text-white">Gallery masih kosong</p>
            <p className="mt-1 text-sm text-slate-400">Upload gambar pertamamu dan lihat hasilnya di sini.</p>
          </div>
          <Link href="/#upload" className="btn-primary inline-flex items-center gap-2">
            <UploadCloud size={16} /> Upload Gambar
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => (
                <motion.div
                  key={item.pathname}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ delay: i * 0.04, duration: 0.4, ease: [0.21, 0.6, 0.35, 1] }}
                  className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-panel"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.pathname}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="truncate font-mono text-[10px] text-cyan-200">{item.pathname}</p>
                    <p className="mt-0.5 font-mono text-[9px] text-slate-400">
                      {formatBytes(item.size)} • {timeAgo(item.uploadedAt)}
                    </p>
                    <div className="mt-2 flex gap-1.5">
                      <button
                        type="button"
                        title="Salin link"
                        onClick={() => copyLink(item)}
                        className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-white/10 px-2 py-1.5 text-[10px] font-medium text-white backdrop-blur transition-colors hover:bg-cyan-400 hover:text-black"
                      >
                        <Copy size={11} /> Link
                      </button>
                      <button
                        type="button"
                        title="Buka di tab baru"
                        onClick={() => window.open(`${originOf()}/${item.pathname}`, "_blank")}
                        className="flex items-center justify-center rounded-lg bg-white/10 px-2.5 py-1.5 text-white backdrop-blur transition-colors hover:bg-violet-400 hover:text-black"
                      >
                        <ExternalLink size={11} />
                      </button>
                      <button
                        type="button"
                        title="Hapus"
                        onClick={() => remove(item.pathname)}
                        disabled={deleting === item.pathname}
                        className="flex items-center justify-center rounded-lg bg-rose-500/70 px-2.5 py-1.5 text-white backdrop-blur transition-colors hover:bg-rose-500"
                      >
                        {deleting === item.pathname ? (
                          <Loader2 size={11} className="animate-spin" />
                        ) : (
                          <Trash2 size={11} />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {hasMore && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => load(cursor, true)}
                disabled={loadingMore}
                className="btn-ghost inline-flex items-center gap-2"
              >
                {loadingMore ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Memuat lagi...
                  </>
                ) : (
                  <>Muat lebih banyak</>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
