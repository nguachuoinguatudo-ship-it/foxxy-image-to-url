"use client";

import { useRef, useState, type DragEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  UploadCloud,
  ImagePlus,
  X,
  Loader2,
  PartyPopper,
  Link2,
  FileCheck2,
} from "lucide-react";
import { copyText, formatBytes, originOf } from "@/lib/utils";
import { useToast } from "@/components/ToastProvider";
import CopyButton from "@/components/CopyButton";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp", "image/avif"];
const MAX_SIZE = 4.5 * 1024 * 1024;
const EXT_FROM_TYPE: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/avif": "avif",
};

interface UploadResult {
  url: string;
  pathname: string;
  direct: string;
  size: number;
  type: string;
}

export default function Uploader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const pickFile = (f: File | undefined | null) => {
    setError(null);
    setResult(null);
    if (!f) return;
    if (!ALLOWED_TYPES.includes(f.type)) {
      setError(`Format ${f.type || "unknown"} tidak didukung. Gunakan PNG / JPG / JPEG / GIF / WEBP / AVIF.`);
      toast("Format file tidak didukung", "error");
      return;
    }
    if (f.size > MAX_SIZE) {
      setError("Ukuran maksimal 4.5 MB (batas penyimpanan gratis).");
      toast("File terlalu besar (maks 4.5 MB)", "error");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
    pickFile(e.dataTransfer.files?.[0]);
  };

  const upload = () => {
    if (!file || uploading) return;
    setUploading(true);
    setProgress(0);
    setResult(null);

    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    fd.append("file", file);

    xhr.open("POST", "/api/upload");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      setUploading(false);
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && data.direct) {
          setResult(data);
          toast("Upload sukses! URL siap dibagikan");
        } else {
          setError(data.error || "Upload gagal. Coba lagi.");
          toast(data.error || "Upload gagal", "error");
        }
      } catch {
        setError("Upload gagal. Coba lagi.");
        toast("Upload gagal", "error");
      }
    };
    xhr.onerror = () => {
      setUploading(false);
      setError("Koneksi gagal. Periksa jaringan lalu coba lagi.");
      toast("Koneksi gagal", "error");
    };
    xhr.send(fd);
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  const shareUrl = result ? `${originOf()}${result.direct}` : "";

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.gif,.webp,.avif,image/*"
        className="hidden"
        onChange={(e) => pickFile(e.target.files?.[0])}
      />

      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="drop"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={onDrop}
            className={`border-gradient group relative flex min-h-[280px] cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl p-8 text-center transition-all duration-300 ${
              drag ? "scale-[1.02] shadow-neon-lg" : ""
            }`}
          >
            <div className="animate-pulseglow absolute inset-0 rounded-3xl bg-cyan-500/10" />
            <motion.div
              animate={drag ? { scale: 1.15, rotate: -6 } : { scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 via-violet-400 to-pink-400 shadow-neon-lg transition-transform duration-300 group-hover:-translate-y-1"
            >
              <UploadCloud size={34} className="text-[#05060b]" />
            </motion.div>
            <div className="relative">
              <p className="font-display text-lg font-semibold text-white">
                {drag ? "Lepaskan di sini!" : "Tarik & lepas gambar di sini"}
              </p>
              <p className="mt-1.5 text-sm text-slate-400">
                atau <span className="font-semibold text-cyan-300">klik untuk memilih file</span>
              </p>
            </div>
            <div className="relative flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] text-slate-500">
              {["PNG", "JPG", "JPEG", "GIF", "WEBP", "AVIF"].map((f) => (
                <span key={f} className="rounded-lg border border-white/10 bg-white/5 px-2 py-1">
                  {f}
                </span>
              ))}
              <span className="rounded-lg border border-amber-400/20 bg-amber-400/5 px-2 py-1 text-amber-300">
                MAX 4.5 MB
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="file"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="border-gradient rounded-3xl p-6"
          >
            {!result ? (
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:w-32">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview ?? ""}
                    alt="preview"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-sm text-cyan-200">{file.name}</p>
                  <p className="mt-1 font-mono text-xs text-slate-500">
                    {formatBytes(file.size)} • {file.type}
                  </p>
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 transition-all duration-200"
                      style={{ width: `${uploading ? progress : 0}%` }}
                    />
                  </div>
                  <p className="mt-1.5 font-mono text-[11px] text-slate-500">
                    {uploading ? `mengupload... ${progress}%` : "siap diupload"}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:w-44">
                  <button
                    type="button"
                    onClick={upload}
                    disabled={uploading}
                    className="btn-primary flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Uploading...
                      </>
                    ) : (
                      <>
                        <UploadCloud size={16} /> Upload
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    disabled={uploading}
                    className="btn-ghost flex items-center justify-center gap-2 !py-2.5 text-sm"
                  >
                    <X size={15} /> Batal
                  </button>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="flex flex-col gap-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10"
                >
                  <PartyPopper size={28} className="text-emerald-400" />
                </motion.div>

                <div className="text-center">
                  <h3 className="font-display text-xl font-bold text-white">URL berhasil dibuat!</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Bagikan link di bawah — langsung terbuka sebagai gambar.
                  </p>
                </div>

                <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview ?? ""}
                    alt="result"
                    className="max-h-52 w-full object-contain"
                  />
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative min-w-0 flex-1">
                    <input readOnly value={shareUrl} className="input-copy pr-10" onFocus={(e) => e.target.select()} />
                    <Link2 size={15} className="absolute top-1/2 right-3.5 -translate-y-1/2 text-cyan-400" />
                  </div>
                  <CopyButton text={shareUrl} label="Copy URL" className="w-full sm:w-auto" />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1">
                    <FileCheck2 size={11} className="text-emerald-400" /> {formatBytes(result.size)}
                  </span>
                  <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1">cache: 1 tahun</span>
                  <button
                    type="button"
                    onClick={() => copyText(`![image](${shareUrl})`)}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    copy markdown
                  </button>
                  <button
                    type="button"
                    onClick={() => copyText(`<img src="${shareUrl}" alt="foxxy" />`)}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    copy html
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded-lg border border-pink-400/20 bg-pink-400/5 px-2.5 py-1 text-pink-300 transition-colors hover:border-pink-400/50"
                  >
                    upload lagi
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-2.5 text-center text-sm text-rose-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
