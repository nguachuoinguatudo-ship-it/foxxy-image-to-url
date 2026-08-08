import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Copy, Code2, Database, Globe, Hash, Shield, Timer } from "lucide-react";

export const metadata: Metadata = { title: "Docs — FOXXY Image to URL" };

const ENDPOINTS = [
  {
    method: "POST",
    path: "/api/upload",
    desc: "Upload gambar (multipart/form-data, field: file). Balasan JSON berisi url & pathname.",
  },
  {
    method: "GET",
    path: "/:nama-file.png",
    desc: "Proxy gambar langsung — ini URL yang kamu bagikan. Auto content-type + cache 1 tahun.",
  },
];

const EMBEDS = [
  {
    lang: "markdown",
    code: "![foxxy-image](https://foxxy-free-imghosting.vercel.app/foxxy-kodeacak.png)",
  },
  {
    lang: "html",
    code: '<img src="https://foxxy-free-imghosting.vercel.app/foxxy-kodeacak.png" alt="foxxy" width="640" />',
  },
  {
    lang: "curl",
    code: 'curl -F "file=@gambar.png" https://foxxy-free-imghosting.vercel.app/api/upload',
  },
  {
    lang: "fetch (js)",
    code: `const fd = new FormData();
fd.append("file", file);
const res = await fetch("/api/upload", { method: "POST", body: fd });
const { direct } = await res.json(); // -> "/foxxy-xxxx.png"`,
  },
];

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pt-32 pb-10">
      <Reveal className="text-center">
        <p className="font-mono text-xs tracking-widest text-violet-400 uppercase">// documentation</p>
        <h1 className="section-title mt-3 text-white">
          Dokumentasi <span className="text-gradient">API</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-slate-400">
          Semua endpoint dijalankan di serverless function — aman, cepat, tanpa config rumit.
        </p>
      </Reveal>

      {/* ENDPOINTS */}
      <Reveal delay={0.1} className="mt-14">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-white">
          <Database size={20} className="text-cyan-400" /> Endpoints
        </h2>
        <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
          {ENDPOINTS.map((e, i) => (
            <div
              key={e.path}
              className={`flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:gap-4 ${
                i !== 0 ? "border-t border-white/5" : ""
              } bg-panel/60`}
            >
              <span
                className={`w-20 shrink-0 rounded-lg px-2 py-1 text-center font-mono text-xs font-bold ${
                  e.method === "GET"
                    ? "bg-cyan-400/15 text-cyan-300"
                    : e.method === "POST"
                      ? "bg-emerald-400/15 text-emerald-300"
                      : "bg-rose-400/15 text-rose-300"
                }`}
              >
                {e.method}
              </span>
              <code className="font-mono text-sm text-slate-200">{e.path}</code>
              <p className="text-xs text-slate-500 sm:ml-auto sm:text-right sm:max-w-[45%]">{e.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* URL FORMAT */}
      <Reveal delay={0.15} className="mt-14">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-white">
          <Globe size={20} className="text-violet-400" /> Format URL
        </h2>
        <div className="terminal-window mt-5 p-5 font-mono text-sm">
          <p className="text-slate-400">
            <span className="text-cyan-300">$</span> foxxy upload foto.png
          </p>
          <p className="mt-2 text-emerald-400">[ OK ] 0.42s • blob stored</p>
          <p className="mt-1 break-all text-slate-200">
            <span className="text-slate-500">→ </span>
            https://foxxy-free-imghosting.vercel.app/<span className="text-gradient font-bold">foxxy-kodeacak.png</span>
          </p>
          <div className="mt-4 grid gap-2 text-xs text-slate-400 sm:grid-cols-3">
            <p className="flex items-center gap-2"><Timer size={13} className="text-cyan-400" /> Cache: 1 tahun (immutable)</p>
            <p className="flex items-center gap-2"><Shield size={13} className="text-emerald-400" /> Nama acak anti-tebak</p>
            <p className="flex items-center gap-2"><Globe size={13} className="text-violet-400" /> Serve di domain sendiri</p>
          </div>
        </div>
      </Reveal>

      {/* EMBEDS */}
      <Reveal delay={0.2} className="mt-14">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-white">
          <Code2 size={20} className="text-pink-400" /> Contoh Pemakaian
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {EMBEDS.map((e) => (
            <div key={e.lang} className="overflow-hidden rounded-2xl border border-white/10 bg-[#080a12]">
              <div className="flex items-center justify-between border-b border-white/5 px-4 py-2">
                <span className="font-mono text-xs text-slate-400">{e.lang}</span>
                <Copy size={12} className="text-slate-600" />
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-slate-300">
                {e.code}
              </pre>
            </div>
          ))}
        </div>
      </Reveal>

      {/* LIMITS */}
      <Reveal delay={0.25} className="mt-14">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-white">
          <Hash size={20} className="text-amber-400" /> Batasan & Catatan
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-panel/60 p-5">
            <p className="text-sm font-semibold text-white">File</p>
            <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-slate-400">
              <li>png, jpg, jpeg, gif, webp, avif</li>
              <li>maks 4.5 MB (batas penyimpanan gratis)</li>
              <li>SVG diblokir (alasan keamanan XSS)</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-panel/60 p-5">
            <p className="text-sm font-semibold text-white">Storage</p>
            <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-slate-400">
              <li>Gratis hingga 5 GB penyimpanan</li>
              <li>Bandwidth: 5 GB/bulan (hobby)</li>
              <li>Upgrade kapasitas kapan saja kalau butuh</li>
            </ul>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">
          Masih bingung? Cek halaman{" "}
          <Link href="/about" className="font-semibold text-cyan-300 hover:underline">
            About
          </Link>{" "}
          atau mulai dari{" "}
          <Link href="/#upload" className="font-semibold text-cyan-300 hover:underline">
            upload
          </Link>{" "}
          langsung.
        </p>
      </Reveal>
    </div>
  );
}
