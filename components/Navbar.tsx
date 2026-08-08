"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Home, BookOpen, User, Menu, X, Zap, TerminalSquare } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/docs", label: "Docs", icon: BookOpen },
  { href: "/about", label: "About", icon: User },
];

export default function Navbar({ onReboot }: { onReboot?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.6, 0.35, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass border-b border-white/5 py-2.5" : "bg-transparent py-4"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-violet-400 to-pink-400 shadow-neon transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
              <Zap size={18} className="text-[#05060b]" fill="currentColor" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              FOXXY
              <span className="ml-1.5 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-cyan-300">
                v2.0
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    active ? "text-cyan-300" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl border border-cyan-400/25 bg-cyan-400/10"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    <l.icon size={15} />
                    {l.label}
                  </span>
                </Link>
              );
            })}
            <button
              type="button"
              onClick={onReboot}
              title="Reboot terminal"
              className="ml-2 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
            >
              <TerminalSquare size={16} />
            </button>
          </div>

          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass fixed top-[68px] left-3 right-3 z-50 rounded-2xl p-2 md:hidden"
          >
            {LINKS.map((l, i) => {
              const active = pathname === l.href;
              return (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                      active ? "bg-cyan-400/10 text-cyan-300" : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    <l.icon size={16} />
                    {l.label}
                  </Link>
                </motion.div>
              );
            })}
            <button
              type="button"
              onClick={onReboot}
              className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5"
            >
              <TerminalSquare size={16} /> Reboot terminal
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
