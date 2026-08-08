"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Smartphone,
  Infinity as InfinityIcon,
  Rocket,
  Terminal,
  ArrowDown,
  BookOpen,
  Copy,
  Images,
  Share2,
} from "lucide-react";
import Uploader from "@/components/Uploader";
import Reveal from "@/components/Reveal";

const FEATURES = [
  {
    icon: Zap,
    title: "Instan & Ringan",
    desc: "File langsung di-stream ke penyimpanan cloud. URL siap dipakai < 1 detik setelah upload.",
    color: "from-cyan-400/20 to-cyan-400/0 text-cyan-300 border-cyan-400/25",
  },
  {
    icon: InfinityIcon,
    title: "Cache CDN 1 Tahun",
    desc: "Setiap file di-cache di edge network. Gambar dimuat kilat dari lokasi terdekat.",
    color: "from-violet-400/20 to-violet-400/0 text-violet-300 border-violet-400/25",
  },
  {
    icon: Shield,
    title: "URL Aman & Acak",
    desc: "Nama file digenerate acak, praktis mustahil ditebak orang lain.",
    color: "from-emerald-400/20 to-emerald-400/0 text-emerald-300 border-emerald-400/25",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    desc: "UI responsif penuh — upload dari HP langsung lancar tanpa turun kualitas.",
    color: "from-pink-400/20 to-pink-400/0 text-pink-300 border-pink-400/25",
  },
  {
    icon: Terminal,
    title: "Boot Terminal",
    desc: "Pengalaman boot seperti OS sungguhan. Tekan reboot di footer buat main lagi.",
    color: "from-amber-400/20 to-amber-400/0 text-amber-300 border-amber-400/25",
  },
  {
    icon: Rocket,
    title: "Deploy Gratis",
    desc: "Deploy sekali, langsung jalan. Storage gratis dengan limit 4.5 MB per file.",
    color: "from-sky-400/20 to-sky-400/0 text-sky-300 border-sky-400/25",
  },
];

const STEPS = [
  { icon: Images, title: "Pilih gambar", desc: "Tarik & lepas, atau klik dropzone. PNG, JPG, GIF, WebP & AVIF, maks 4.5 MB." },
  { icon: Rocket, title: "Upload", desc: "File disimpan ke cloud storage dengan nama acak aman: foxxy-xxxx.png." },
  { icon: Share2, title: "Sebarkan URL", desc: "Salin URL langsung, markdown, atau HTML — buka di mana saja." },
];

const FORMATS = ["png", "jpg", "jpeg", "gif", "webp", "avif", "cdn", "edge", "fast"];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative mx-auto flex max-w-6xl flex-col items-center px-5 pt-36 pb-16 text-center sm:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs text-slate-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          system online — powered by wanz
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-7 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl"
        >
          <span className="text-white">Gambar Jadi</span>
          <br />
          <span className="text-gradient-animated">URL Keren.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          Upload gambar, dapatkan URL yang bisa langsung dibagikan dalam hitungan detik.
          Cepat, aman, dan gratis — bertenaga{" "}
          <span className="font-semibold text-cyan-300">Wanz Cloud</span> + CDN.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.62 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link href="#upload" className="btn-primary flex items-center justify-center gap-2">
            <Zap size={17} fill="currentColor" /> Upload Sekarang
          </Link>
          <Link href="/docs" className="btn-ghost flex items-center justify-center gap-2">
            <BookOpen size={17} /> Lihat Docs
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="terminal-window mt-10 w-full max-w-xl px-5 py-4 text-left font-mono text-[13px]"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            </span>
            <span className="text-[11px]">foxxy://demo</span>
          </div>
          <p className="mt-3 text-slate-300">
            <span className="text-cyan-300">$</span> foxxy upload {FORMATS[0]}-saya.png
          </p>
          <p className="mt-1 text-emerald-400">[ OK ] uploaded in 0.42s</p>
          <p className="mt-1 text-slate-200">
            <span className="text-slate-500">→ </span>
            https://foxxy-free-imghosting.vercel.app/
            <span className="text-gradient font-bold">foxxy-kodeacak.png</span>
          </p>
          <p className="animate-blink mt-1 inline-block text-cyan-400">▌</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 animate-float text-slate-500"
        >
          <ArrowDown size={22} />
        </motion.div>
      </section>

      {/* MARQUEE */}
      <section className="relative border-y border-white/5 bg-white/[0.02] py-4">
        <div className="flex w-max animate-marquee gap-10 font-mono text-sm text-slate-500">
          {[...FORMATS, ...FORMATS].map((f, i) => (
            <span key={i} className="flex items-center gap-10">
              .{f} <span className="text-cyan-400/40">●</span>
            </span>
          ))}
        </div>
      </section>

      {/* UPLOADER */}
      <section id="upload" className="mx-auto max-w-4xl scroll-mt-24 px-5 pt-24">
        <Reveal className="text-center">
          <p className="font-mono text-xs tracking-widest text-cyan-400 uppercase">// upload.zone</p>
          <h2 className="section-title mt-3 text-white">
            Upload <span className="text-gradient">di sini</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-400">
            File diproses aman di server — tanpa upload ke client, tanpa token bocor.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-8">
          <Uploader />
        </Reveal>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-5 pt-28">
        <Reveal className="text-center">
          <p className="font-mono text-xs tracking-widest text-violet-400 uppercase">// features</p>
          <h2 className="section-title mt-3 text-white">
            Dibuat <span className="text-gradient">super keren</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className={`card-hover group relative h-full overflow-hidden rounded-3xl border bg-gradient-to-b ${f.color} p-6`}>
                <f.icon size={26} className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STEPS */}
      <section className="mx-auto max-w-5xl px-5 pt-28">
        <Reveal className="text-center">
          <p className="font-mono text-xs tracking-widest text-pink-400 uppercase">// how-it-works</p>
          <h2 className="section-title mt-3 text-white">
            3 langkah, <span className="text-gradient">3 detik</span>
          </h2>
        </Reveal>
        <div className="relative mt-12 grid gap-6 md:grid-cols-3">
          <div className="absolute top-10 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-cyan-400/40 via-violet-400/40 to-pink-400/40 md:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.15}>
              <div className="relative flex flex-col items-center rounded-3xl border border-white/8 bg-panel/60 p-8 text-center backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1.5">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-violet-400 to-pink-400 shadow-neon-lg">
                  <s.icon size={30} className="text-[#05060b]" />
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#0b0d16] font-mono text-xs font-bold text-cyan-300 ring-1 ring-cyan-400/40">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-5 pt-28">
        <Reveal>
          <div className="border-gradient relative overflow-hidden rounded-3xl p-10 text-center sm:p-14">
            <div className="animate-pulseglow absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/20" />
            <h2 className="relative font-display text-3xl font-bold text-white sm:text-4xl">
              Siap <span className="text-gradient-animated">membagikan</span> gambarmu?
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-sm text-slate-400">
              Coba sekarang — gratis, tanpa daftar, tanpa ribet. Dukung dev{" "}
              <span className="font-semibold text-violet-300">Wanz</span>!
            </p>
            <Link href="#upload" className="btn-primary relative mt-8 inline-flex items-center gap-2">
              <Copy size={16} /> Buat URL Sekarang
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
