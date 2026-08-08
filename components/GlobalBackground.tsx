"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function GlobalBackground() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="grid-overlay animate-gridpan absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />

      <div className="animate-pulseglow absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-cyan-500/25" />
      <div className="animate-pulseglow absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full bg-violet-600/25 [animation-delay:2s]" />
      <div className="animate-pulseglow absolute -bottom-40 left-1/4 h-[420px] w-[420px] rounded-full bg-pink-500/20 [animation-delay:4s]" />

      {[
        { top: "12%", left: "8%", d: "0s" },
        { top: "28%", left: "85%", d: "1.2s" },
        { top: "62%", left: "15%", d: "2.1s" },
        { top: "78%", left: "70%", d: "0.7s" },
        { top: "8%", left: "55%", d: "1.8s" },
        { top: "45%", left: "45%", d: "2.6s" },
      ].map((s, i) => (
        <span
          key={i}
          className="animate-twinkle absolute h-1.5 w-1.5 rounded-full bg-cyan-300"
          style={{ top: s.top, left: s.left, animationDelay: s.d, boxShadow: "0 0 12px 2px rgba(34,211,238,0.6)" }}
        />
      ))}

      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400"
        style={{ scaleX }}
      />
    </div>
  );
}
