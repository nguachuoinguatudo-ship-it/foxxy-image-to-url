"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { copyText } from "@/lib/utils";
import { useToast } from "@/components/ToastProvider";

export default function CopyButton({
  text,
  label = "Copy",
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const onCopy = async () => {
    const ok = await copyText(text);
    if (ok) {
      setCopied(true);
      toast("URL copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } else {
      toast("Copy failed — select the URL manually", "error");
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className={`btn-primary flex items-center justify-center gap-2 !px-5 !py-3 text-sm ${className}`}
    >
      {copied ? (
        <motion.span
          key="ok"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-2"
        >
          <Check size={16} /> Copied!
        </motion.span>
      ) : (
        <motion.span
          key="cp"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-2"
        >
          <Copy size={16} /> {label}
        </motion.span>
      )}
    </button>
  );
}
