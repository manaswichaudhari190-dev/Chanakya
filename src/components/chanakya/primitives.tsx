"use client";

/**
 * CHANAKYA — shared primitives
 * Design language: dark, restrained, thin 1px hairlines, subtle
 * blue/teal/green contextual accents, generous spacing, tiny uppercase labels.
 */

import { cn } from "@/lib/utils";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Logo — CHANAKYA brand mark                                          */
/* ------------------------------------------------------------------ */

export function LogoMark({ size = 22 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/chanakya_logo.png"
      alt="CHANAKYA"
      width={size}
      height={size}
      aria-hidden="true"
      className="shrink-0 object-contain"
      style={{ width: size, height: size }}
    />
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "text-[15px] font-semibold tracking-[0.18em] text-white",
        className
      )}
    >
      CHANAKYA
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                       */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section label (small uppercase eyebrow)                             */
/* ------------------------------------------------------------------ */

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="chk-label inline-flex items-center gap-2 text-white/72">
      <span className="h-1 w-1 rounded-full bg-[#4CB782] shadow-[0_0_8px_rgba(76,183,130,0.9)]" />
      {children}
    </span>
  );
}

export function SectionHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "chk-display text-balance text-[clamp(1.9rem,4vw,3.1rem)] font-semibold text-white",
        className
      )}
    >
      {children}
    </h2>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

type BtnVariant = "primary" | "secondary" | "ghost";

export function ChkButton({
  children,
  variant = "primary",
  className,
  href,
  onClick,
  arrow = false,
  type = "button",
}: {
  children: ReactNode;
  variant?: BtnVariant;
  className?: string;
  href?: string;
  onClick?: () => void;
  arrow?: boolean;
  type?: "button" | "submit";
}) {
  const base =
    "group/btn inline-flex select-none items-center justify-center gap-2 rounded-full text-[13px] font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CA8FF]/60 active:translate-y-[0.5px] cursor-pointer";

  const variants: Record<BtnVariant, string> = {
    primary:
      "bg-[#E5E5E6] text-[#08090A] px-4.5 py-2 shadow-[0_0_1px_rgba(0,0,0,0.08),0_1px_1px_rgba(0,0,0,0.07)] hover:-translate-y-[1px] hover:bg-[#F7F8F8] hover:shadow-[0_8px_28px_-8px_rgba(0,0,0,0.35)]",
    secondary:
      "border border-white/[0.08] bg-white/[0.02] px-4.5 py-2 text-white backdrop-blur hover:-translate-y-[1px] hover:border-white/[0.16] hover:bg-white/[0.05]",
    ghost:
      "px-3 py-1.5 text-white/88 hover:text-white hover:bg-white/[0.05]",
  };

  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          size={13}
          strokeWidth={2}
          className="translate-x-0 transition-transform duration-300 group-hover/btn:translate-x-[3px]"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={cn(base, variants[variant], className)}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cn(base, variants[variant], className)}>
      {inner}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Status chips                                                        */
/* ------------------------------------------------------------------ */

export type ChipTone = "neutral" | "blue" | "green" | "amber" | "red" | "teal";

const chipTones: Record<ChipTone, string> = {
  neutral: "border-white/10 bg-white/[0.05] text-white/72",
  blue: "border-[#5CA8FF]/25 bg-[#5CA8FF]/[0.12] text-[#9CC8FF]",
  green: "border-[#4CB782]/25 bg-[#4CB782]/[0.10] text-[#7DD9A8]",
  amber: "border-[#D29922]/25 bg-[#D29922]/[0.10] text-[#E5BE71]",
  red: "border-[#E5534B]/25 bg-[#E5534B]/[0.10] text-[#F0918B]",
  teal: "border-[#3FB8AF]/25 bg-[#3FB8AF]/[0.12] text-[#7DD9D2]",
};

export function Chip({
  children,
  tone = "neutral",
  className,
  dot = false,
}: {
  children: ReactNode;
  tone?: ChipTone;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-[3px] text-[11px] font-medium leading-none",
        chipTones[tone],
        className
      )}
    >
      {dot && <span className="h-1 w-1 rounded-full bg-current" />}
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Status dot                                                          */
/* ------------------------------------------------------------------ */

export type DotTone = "green" | "amber" | "red" | "blue" | "teal" | "gray";

export function StatusDot({ tone, pulse = false }: { tone: DotTone; pulse?: boolean }) {
  const colors: Record<DotTone, string> = {
    green: "bg-[#4CB782] shadow-[0_0_7px_rgba(76,183,130,0.8)]",
    amber: "bg-[#D29922] shadow-[0_0_7px_rgba(210,153,34,0.8)]",
    red: "bg-[#E5534B] shadow-[0_0_7px_rgba(229,83,75,0.8)]",
    blue: "bg-[#5CA8FF] shadow-[0_0_7px_rgba(92,168,255,0.9)]",
    teal: "bg-[#3FB8AF] shadow-[0_0_7px_rgba(63,184,175,0.8)]",
    gray: "bg-white/45",
  };
  return (
    <span
      className={cn(
        "inline-block h-[6px] w-[6px] shrink-0 rounded-full",
        colors[tone],
        pulse && "chk-pulse"
      )}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Confidence bar — animates when scrolled into view                   */
/* ------------------------------------------------------------------ */

export function ConfidenceBar({
  value,
  className,
  barClassName,
}: {
  value: number;
  className?: string;
  barClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <div
      ref={ref}
      className={cn(
        "h-[3px] w-full overflow-hidden rounded-full bg-white/[0.08]",
        className
      )}
    >
      <motion.div
        className={cn(
          "h-full rounded-full bg-gradient-to-r from-[#5CA8FF] via-[#3FB8AF] to-[#4CB782]",
          barClassName
        )}
        initial={{ width: "0%" }}
        animate={inView ? { width: `${value}%` } : undefined}
        transition={{ duration: 1.4, ease: [0.21, 0.6, 0.35, 1], delay: 0.15 }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Animated counter                                                    */
/* ------------------------------------------------------------------ */

export function Counter({
  value,
  className,
  duration = 1.6,
}: {
  value: number;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = String(Math.round(v));
    });
    return unsub;
  }, [spring]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Card with hover border illumination                                 */
/* ------------------------------------------------------------------ */

export function HoverCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "chk-panel-deep group/card relative transition-all duration-500",
        "hover:-translate-y-[2px] hover:border-white/[0.14]",
        "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_24px_48px_-24px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[16px] bg-gradient-to-b from-white/[0.045] to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Key-value metadata row (dense UI text)                              */
/* ------------------------------------------------------------------ */

export function MetaRow({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: ReactNode;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-6">
      <span className="text-[11px] uppercase tracking-[0.1em] text-white/60">
        {label}
      </span>
      <span className={cn("text-[12.5px] text-white/88", valueClassName)}>
        {value}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ambient page background — atmospheric gradients + grids            */
/* ------------------------------------------------------------------ */

export function AmbientBackground() {
  return null;
}
