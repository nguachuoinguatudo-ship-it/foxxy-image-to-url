"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Zap } from "lucide-react";

const BOOT_LINES: { text: string; status?: "OK" | "WARN"; type?: "cmd" | "info" }[] = [
  { text: "FOXXY IMAGE HOST v2.0.0 — boot sequence started", type: "cmd" },
  { text: "> loading kernel .................. ", status: "OK" },
  { text: "> mounting storage [wanz-cloud] ... ", status: "OK" },
  { text: "> initializing ui engine .......... ", status: "OK" },
  { text: "> compiling animations ............ ", status: "OK" },
  { text: "> warming cdn cache ............... ", status: "OK" },
  { text: "> establishing secure session ...... ", status: "OK" },
  { text: "> spawning web server .............. ", status: "OK" },
  { text: "all systems operational.", type: "info" },
  { text: "welcome, developer Wanz.", type: "info" },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function BootTerminal({
  show,
  onDone,
}: {
  show: boolean;
  onDone: () => void;
}) {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "booting" | "done">("typing");
  const [skipped, setSkipped] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!show || doneRef.current) return;
    let cancelled = false;

    (async () => {
      for (let i = 0; i < BOOT_LINES.length; i++) {
        if (cancelled) return;
        setStep(i);
        setPhase("typing");
        const line = BOOT_LINES[i].text;
        for (let c = 0; c < line.length; c++) {
          if (cancelled) return;
          setTyped(line.slice(0, c + 1));
          await sleep(8 + Math.random() * 18);
        }
        if (BOOT_LINES[i].status) {
          setPhase("booting");
          await sleep(420);
        }
        await sleep(140);
      }
      if (cancelled) return;
      setPhase("done");
      await sleep(900);
      if (cancelled) return;
      doneRef.current = true;
      onDone();
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const skip = () => {
    if (skipped) return;
    setSkipped(true);
    doneRef.current = true;
    onDone();
  };

  const isBootingPhase = phase === "booting";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.21, 0.6, 0.35, 1] }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#04050a] px-4"
          onClick={skip}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="animate-scanline absolute left-0 h-24 w-full bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="terminal-window relative w-full max-w-xl overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              </div>
              <span className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                <Zap size={11} className="text-cyan-400" /> foxxy-boot
              </span>
              <button
                type="button"
                onClick={skip}
                className="rounded-md px-2 py-0.5 font-mono text-[11px] text-slate-500 transition-colors hover:text-cyan-300"
              >
                SKIP [enter]
              </button>
            </div>

            <div className="min-h-[300px] p-5 font-mono text-[13px] leading-relaxed sm:min-h-[320px] sm:text-sm">
              {BOOT_LINES.slice(0, step).map((l, i) => (
                <div
                  key={i}
                  className={
                    l.status === "OK"
                      ? "text-slate-300"
                      : l.type === "cmd"
                        ? "text-cyan-300"
                        : "text-emerald-300"
                  }
                >
                  {l.text}
                  {l.status && (
                    <span
                      className={`ml-1 font-bold ${
                        l.status === "OK" ? "text-emerald-400" : "text-amber-400"
                      }`}
                    >
                      [ {l.status} ]
                    </span>
                  )}
                </div>
              ))}

              {step < BOOT_LINES.length && (
                <div className="text-slate-200">
                  {typed}
                  <span className="animate-blink ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-cyan-400" />
                </div>
              )}

              {phase === "done" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 flex items-center gap-2 font-mono text-sm text-emerald-300"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    ✓
                  </motion.span>
                  SYSTEM READY — entering desktop
                </motion.div>
              )}
            </div>

            <div className="px-5 pb-5">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className={`h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 transition-all duration-300 ${
                    phase === "done"
                      ? "w-full"
                      : isBootingPhase
                        ? "animate-bootbar"
                        : "w-[8%]"
                  }`}
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10px] text-slate-600">
                <span>boot@foxxy:~</span>
                <span>
                  {Math.round((step / BOOT_LINES.length) * 100)}%
                  {phase === "done" ? " — 100% complete" : ""}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
