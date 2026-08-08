import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Terminal, Github, Mail, Code2, Server, Palette, Database } from "lucide-react";

export const metadata: Metadata = { title: "About — FOXXY Image to URL" };

const STACK = [
  { icon: Code2, name: "Next.js 14", role: "App Router + Serverless API" },
  { icon: Database, name: "Blob Storage", role: "Penyimpanan & CDN caching" },
  { icon: Palette, name: "Tailwind + Framer Motion", role: "UI/UX & animasi" },
  { icon: Server, name: "Edge Proxy", role: "Serving gambar di domain sendiri" },
];

const SKILLS = ["TypeScript", "Next.js", "Tailwind", "Node.js", "UI/UX Design", "Motion Design", "Edge CDN", "REST API"];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pt-32 pb-10">
      <Reveal className="text-center">
        <p className="font-mono text-xs tracking-widest text-pink-400 uppercase">// the-developer</p>
        <h1 className="section-title mt-3 text-white">
          Dibuat oleh <span className="text-gradient">Wanz</span>
        </h1>
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <div className="border-gradient relative overflow-hidden rounded-3xl p-8 sm:p-10">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
            <Avatar />
            <div className="text-center sm:text-left">
              <h2 className="font-display text-2xl font-bold text-white">Wanz</h2>
              <p className="mt-1 font-mono text-sm text-cyan-300">fullstack developer & UI/UX designer</p>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-400">
                Creator di balik FOXXY — sebuah proyek image hosting yang dibuat dengan
                semangat: <span className="text-slate-200">cepat, keren, dan bisa dipakai siapa saja</span>.
                Semua halaman, animasi, dan infrastruktur dibangun dari nol. Kalau kamu suka,
                tandanya pekerjaan berhasil.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
                {SKILLS.map((s) => (
                  <span key={s} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mt-10">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-white">
          <Server size={20} className="text-violet-400" /> Tech Stack
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {STACK.map((t) => (
            <div key={t.name} className="card-hover flex items-center gap-4 rounded-2xl border border-white/10 bg-panel/60 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 via-violet-400/20 to-pink-400/20 ring-1 ring-white/10">
                <t.icon size={22} className="text-cyan-300" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-slate-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2} className="mt-12">
        <div className="terminal-window p-6 font-mono text-sm">
          <p className="text-slate-500"># interview me, maybe?</p>
          <p className="mt-2 text-slate-200">
            <span className="text-cyan-300">$</span> wanz --status
          </p>
          <p className="text-emerald-400">[ OK ] ready for new projects</p>
          <p className="mt-2 text-slate-200">
            <span className="text-cyan-300">$</span> wanz --contact
          </p>
          <p className="text-emerald-400">[ OK ] github.com/wanz • wanz@foxxy.dev</p>
          <p className="animate-blink mt-2 inline-block text-cyan-400">▌</p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-ghost inline-flex items-center gap-2">
            <Github size={17} /> GitHub
          </a>
          <a href="mailto:wanz@foxxy.dev" className="btn-ghost inline-flex items-center gap-2">
            <Mail size={17} /> Email
          </a>
          <Link href="/#upload" className="btn-primary inline-flex items-center gap-2">
            <Terminal size={17} /> Coba FOXXY
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative shrink-0">
      <div className="animate-pulseglow absolute inset-0 rounded-3xl bg-violet-400/40" />
      <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 via-violet-400 to-pink-400 shadow-neon-lg">
        <span className="font-display text-4xl font-bold text-[#05060b]">W</span>
      </div>
      <span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-[#0b0d16] ring-1 ring-emerald-400/40">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </span>
    </div>
  );
}
