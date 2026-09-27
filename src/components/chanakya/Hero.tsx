"use client";

/**
 * CHANAKYA — Hero
 * Enormous tight-tracked headline, gradient only on key words,
 * cursor-following radial glow, restrained entrance animation.
 */

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, FileSearch, PlayCircle, ShieldCheck, UserCheck } from "lucide-react";
import type { MouseEvent } from "react";
import { useCallback } from "react";
import { ChkButton } from "./primitives";

const ease = [0.21, 0.6, 0.35, 1] as const;

export function Hero({ onPrimary }: { onPrimary: () => void }) {
  /* cursor-following radial glow — very subtle */
  const gx = useMotionValue(-600);
  const gy = useMotionValue(-600);
  const sx = useSpring(gx, { stiffness: 52, damping: 18, mass: 0.6 });
  const sy = useSpring(gy, { stiffness: 52, damping: 18, mass: 0.6 });

  const onMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    gx.set(e.clientX - rect.left - 300);
    gy.set(e.clientY - rect.top - 300);
  }, [gx, gy]);

  return (
    <section
      onMouseMove={onMouseMove}
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-5 pb-24 pt-40 sm:px-8"
    >
      {/* cursor glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] rounded-full"
        style={{
          x: sx,
          y: sy,
          background:
            "radial-gradient(closest-side, rgba(92,168,255,0.07), rgba(63,184,175,0.05) 46%, transparent 70%)",
        }}
      />

      {/* beam behind heading */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[210px] h-[340px] w-[820px] max-w-[92vw] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(92,168,255,0.09), transparent 72%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-[1020px] flex-col items-center text-center">
        {/* eyebrow */}
        <motion.button
          type="button"
          onClick={onPrimary}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.02] py-[6px] pl-3 pr-3.5 backdrop-blur transition-colors duration-300 hover:border-white/[0.16]"
        >
          <span className="relative flex h-[6px] w-[6px]">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4CB782] opacity-60" />
            <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-[#4CB782]" />
          </span>
          <span className="text-[12.5px] font-medium tracking-[0.02em] text-white/88 transition-colors group-hover:text-white">
            AI-powered standards intelligence for procurement
          </span>
        </motion.button>

        {/* headline */}
        <motion.h1
          initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.05, delay: 0.24, ease }}
          className="chk-display mt-8 text-balance text-[clamp(2.65rem,6.6vw,5.15rem)] font-semibold text-white"
        >
          The intelligence layer for Indian Standards and tender
          compliance.
        </motion.h1>

        {/* supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.42, ease }}
          className="mt-7 max-w-[640px] text-pretty text-[16.5px] leading-[1.65] text-white/72"
        >
          CHANAKYA helps procurement teams identify the right Indian Standards,
          understand their relationships, verify currency and compliance, and
          resolve gaps in tender specifications.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.56, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <ChkButton
            variant="primary"
            onClick={onPrimary}
            className="px-5 py-[10px] text-[14px]"
            arrow
          >
            Explore CHANAKYA
          </ChkButton>
          <ChkButton
            variant="secondary"
            href="#how-it-works"
            className="px-5 py-[10px] text-[14px]"
          >
            <PlayCircle size={15} strokeWidth={1.8} className="text-[#5CA8FF]" />
            See how it works
          </ChkButton>
        </motion.div>

        {/* trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.78 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[12.5px] text-white/72"
        >
          <span className="inline-flex items-center gap-1.5">
            <UserCheck size={12.5} className="text-[#4CB782]" />
            Built for procurement officers
          </span>
          <span className="text-white/40">·</span>
          <span className="inline-flex items-center gap-1.5">
            <FileSearch size={12.5} className="text-[#5CA8FF]" />
            Evidence-first
          </span>
          <span className="text-white/40">·</span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={12.5} className="text-[#4CB782]" />
            Human-reviewed
          </span>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5 text-white/60"
        >
          <ArrowRight size={13} className="-rotate-90" />
        </motion.div>
      </motion.div>
    </section>
  );
}
