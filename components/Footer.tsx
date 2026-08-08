"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Github, Mail, Heart, TerminalSquare } from "lucide-react";
import { DEV } from "@/lib/utils";

export default function Footer({ onReboot }: { onReboot?: () => void }) {
  return (
    <footer className="relative z-10 mt-24 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-violet-400 to-pink-400 shadow-neon">
                <Zap size={18} className="text-[#05060b]" fill="currentColor" />
              </span>
              <span className="font-display text-lg font-bold text-white">FOXXY</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Image to URL instantly. Upload once, share anywhere — powered by Wanz,
              cloud storage with edge-fast CDN caching.
            </p>
            <button
              type="button"
              onClick={onReboot}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-slate-400 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
            >
              <TerminalSquare size={13} /> $ reboot --play-boot
            </button>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-white">Pages</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              {[
                ["Home", "/"],
                ["Docs", "/docs"],
                ["About", "/about"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-cyan-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-white">Developer</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Github size={14} /> github.com/wanz
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} /> wanz@foxxy.dev
              </li>
            </ul>
            <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-violet-400/25 bg-violet-400/10 px-3 py-1.5 font-mono text-xs text-violet-300">
              DEV: <span className="font-bold text-white">{DEV}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} FOXXY Image Host. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            Crafted with <Heart size={12} className="animate-pulse text-pink-400" fill="currentColor" />
            by <span className="font-bold text-slate-300">{DEV}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
