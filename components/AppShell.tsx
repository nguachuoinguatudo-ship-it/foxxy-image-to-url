"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import BootTerminal from "@/components/BootTerminal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalBackground from "@/components/GlobalBackground";

export default function AppShell({ children }: { children: ReactNode }) {
  const [boot, setBoot] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem("foxxy_booted");
      if (!seen) setBoot(true);
    } catch {
      setBoot(true);
    }
    setMounted(true);
  }, []);

  const onBootDone = () => {
    try {
      sessionStorage.setItem("foxxy_booted", "1");
    } catch {
      /* ignore */
    }
    setBoot(false);
  };

  const reboot = () => setBoot(true);

  return (
    <>
      <GlobalBackground />
      <Navbar onReboot={reboot} />
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.6, 0.35, 1] }}
        className="relative z-10"
      >
        {children}
      </motion.main>
      <Footer onReboot={reboot} />
      {mounted && (
        <BootTerminal
          show={boot}
          onDone={onBootDone}
        />
      )}
    </>
  );
}
