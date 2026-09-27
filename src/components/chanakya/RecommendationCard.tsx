"use client";

/**
 * CHANAKYA — Recommendation card
 * Dense, enterprise-grade standard recommendation card used inside
 * the product preview and the evidence section.
 */

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Flag, GitBranch, ShieldCheck } from "lucide-react";
import type { Recommendation } from "./data/demoData";
import { Chip, ConfidenceBar, StatusDot } from "./primitives";

export function RecommendationCard({
  rec,
  compact = false,
  className,
  delay = 0,
}: {
  rec: Recommendation;
  compact?: boolean;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.6, 0.35, 1] }}
      className={cn(
        "group/rec flex w-full shrink-0 flex-col rounded-xl border border-white/[0.07] bg-[#161718] text-left transition-all duration-500",
        "hover:-translate-y-[2px] hover:border-[#3FB8AF]/35 hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.85)]",
        compact ? "p-4" : "p-5",
        className
      )}
    >
      {/* header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04]">
            <GitBranch size={14} className="text-[#3FB8AF]" />
          </span>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[15px] font-semibold tracking-tight text-white">
                {rec.code}
              </span>
              <span className="text-[12px] font-medium text-white/72">
                :{rec.year}
              </span>
            </div>
            {!compact && (
              <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/60">
                Bureau of Indian Standards
              </span>
            )}
          </div>
        </div>
        {rec.tag && (
          <Chip tone={rec.tag === "Primary" ? "blue" : "teal"}>{rec.tag}</Chip>
        )}
      </div>

      {/* title */}
      <p className="mt-3.5 text-[13px] leading-[1.5] text-white/88">
        {rec.title}
      </p>

      {/* confidence */}
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[10.5px] uppercase tracking-[0.12em] text-white/60">
            Confidence
          </span>
          <span className="font-mono text-[12px] font-medium text-[#9CC8FF]">
            {rec.confidence}%
          </span>
        </div>
        <ConfidenceBar value={rec.confidence} />
        <p className="mt-2.5 text-[11.5px] leading-relaxed text-white/72">
          <span className="text-white/60">Matched because </span>
          {rec.matchedBecause}
        </p>
      </div>

      {/* metadata grid */}
      <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-2 border-t border-white/[0.055] pt-4 sm:grid-cols-3">
        <div className="flex flex-col gap-[5px]">
          <span className="text-[10px] uppercase tracking-[0.1em] text-white/60">
            Current edition
          </span>
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#7DD9A8]">
            <StatusDot tone="green" />
            {rec.currentEdition}
          </span>
        </div>
        <div className="flex flex-col gap-[5px]">
          <span className="text-[10px] uppercase tracking-[0.1em] text-white/60">
            Amendment
          </span>
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-white/88">
            <StatusDot tone="blue" />
            {rec.amendmentStatus}
          </span>
        </div>
        <div className="flex flex-col gap-[5px]">
          <span className="text-[10px] uppercase tracking-[0.1em] text-white/60">
            Certification
          </span>
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#E5BE71]">
            <StatusDot tone="amber" />
            {rec.certification}
          </span>
        </div>
      </div>

      {/* evidence + actions */}
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.055] pt-4">
        <span className="inline-flex items-center gap-1.5 text-[11px] text-white/72">
          <ShieldCheck size={11.5} className="text-[#4CB782]" />
          {rec.evidence}
        </span>
        <div className="flex items-center gap-1">
          <button className="cursor-pointer rounded-md border border-white/[0.09] bg-white/[0.04] px-2 py-1 text-[10.5px] font-medium text-white/88 transition-all hover:border-white/[0.18] hover:text-white">
            View details
          </button>
          <button className="cursor-pointer rounded-md border border-[#4CB782]/25 bg-[#4CB782]/[0.08] px-2 py-1 text-[10.5px] font-medium text-[#7DD9A8] transition-all hover:bg-[#4CB782]/[0.16]">
            Accept
          </button>
          <button
            aria-label="Flag for review"
            className="cursor-pointer rounded-md border border-white/[0.09] bg-white/[0.04] p-[5px] text-white/72 transition-all hover:border-[#D29922]/40 hover:text-[#E5BE71]"
          >
            <Flag size={11} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
