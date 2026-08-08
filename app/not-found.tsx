import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-24 text-center">
      <div className="terminal-window w-full max-w-md p-6 text-left font-mono text-sm">
        <p className="text-rose-400">$ foxxy get "file-not-found"</p>
        <p className="mt-2 text-slate-200">ERROR 404 — file tidak ditemukan</p>
        <p className="mt-1 text-slate-500">blob: null • status: missing</p>
        <p className="animate-blink mt-2 inline-block text-cyan-400">▌</p>
      </div>
      <h1 className="mt-8 font-display text-5xl font-bold sm:text-6xl">
        <span className="text-gradient-animated">404</span>
      </h1>
      <p className="mt-3 max-w-sm text-sm text-slate-400">
        Halaman atau file yang kamu cari tidak ada. Mungkin sudah dihapus, atau typo.
      </p>
      <Link href="/" className="btn-primary mt-8 inline-flex items-center gap-2">
        <Home size={16} /> Kembali ke Home
      </Link>
    </div>
  );
}
