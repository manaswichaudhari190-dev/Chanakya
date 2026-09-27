"use client";

/**
 * CHANAKYA — Fifth story: VERSION + COMPLIANCE INTELLIGENCE
 * Lifecycle timeline with badges and a deterministic compliance card.
 */

import { motion, useInView } from "framer-motion";
import { Award, FileCheck2, Landmark } from "lucide-react";
import { useRef } from "react";
import { VERSION_TIMELINE } from "../data/demoData";
import {
  Chip,
  MetaRow,
  Reveal,
  SectionHeading,
  SectionLabel,
  StatusDot,
} from "../primitives";

const BADGES = [
  { label: "Current", tone: "green" as const },
  { label: "Amended", tone: "amber" as const },
  { label: "Superseded", tone: "red" as const },
  { label: "Review required", tone: "blue" as const },
];

function BadgeDot({ tone }: { tone: "green" | "amber" | "blue" }) {
  return <StatusDot tone={tone} pulse />;
}

export function VersionSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(lineRef, { once: true, margin: "-15% 0px" });

  return (
    <section className="relative py-28 sm:py-36" aria-labelledby="version-heading">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <SectionLabel>Lifecycle intelligence</SectionLabel>
          <SectionHeading className="mt-5">
            Standards change. Your recommendations should know that.
          </SectionHeading>
          <p className="mt-6 text-pretty text-[16px] leading-[1.7] text-white/72">
            Editions, amendments, reaffirmations and supersessions decide
            whether a tender citation is valid. CHANAKYA tracks the lifecycle
            so every recommendation carries current status — not last year&apos;s.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.7fr_1fr]">
          {/* timeline */}
          <Reveal delay={0.1}>
            <div className="chk-panel-deep h-full p-7 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/72">
                  IS 800 lifecycle
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {BADGES.map((b) => (
                    <Chip key={b.label} tone={b.tone} dot>
                      {b.label}
                    </Chip>
                  ))}
                </div>
              </div>

              {/* horizontal timeline — desktop */}
              <div ref={lineRef} className="relative mt-14 hidden md:block">
                {/* base line */}
                <div className="absolute left-[6%] right-[6%] top-[5px] h-[1px] bg-white/[0.09]" />
                {/* progress line */}
                <motion.div
                  className="absolute left-[6%] top-[5px] h-[1px] bg-gradient-to-r from-[#E8824A] via-[#D29922] to-[#4CB782]"
                  initial={{ width: 0, right: "auto" }}
                  animate={inView ? { width: "88%" } : undefined}
                  transition={{ duration: 2.2, ease: [0.21, 0.6, 0.35, 1], delay: 0.3 }}
                />
                <div className="relative grid grid-cols-4">
                  {VERSION_TIMELINE.map((v, i) => (
                    <motion.div
                      key={v.year}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.35 + i * 0.28 }}
                      className="flex flex-col items-center px-2 text-center"
                    >
                      <span className="flex h-[11px] w-[11px] items-center justify-center">
                        <span className="h-[9px] w-[9px] rounded-full border border-[#3FB8AF] bg-[#0F1011] shadow-[0_0_10px_rgba(63,184,175,0.55)]" />
                      </span>
                      <span className="mt-4 font-mono text-[13px] font-medium text-white">
                        {v.year}
                      </span>
                      <span className="mt-2 text-[12px] font-medium text-white/88">
                        {v.title}
                      </span>
                      <span className="mt-1 max-w-[150px] text-[10.5px] leading-[1.5] text-white/60">
                        {v.note}
                      </span>
                      <span className="mt-3">
                        <Chip
                          tone={
                            v.badge === "Amended"
                              ? "amber"
                              : v.badge === "Verified"
                                ? "green"
                                : "teal"
                          }
                        >
                          {v.badge}
                        </Chip>
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* vertical timeline — mobile */}
              <div className="relative mt-10 md:hidden">
                <div className="absolute bottom-2 left-[5px] top-2 w-[1px] bg-white/[0.09]" />
                <div className="flex flex-col gap-7">
                  {VERSION_TIMELINE.map((v, i) => (
                    <motion.div
                      key={v.year}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.12 }}
                      className="relative flex gap-4 pl-1"
                    >
                      <span className="relative z-[1] mt-[5px] h-[9px] w-[9px] shrink-0 rounded-full border border-[#3FB8AF] bg-[#0F1011]" />
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[13px] font-medium text-white">
                          {v.year}
                        </span>
                        <span className="text-[12.5px] font-medium text-white/88">
                          {v.title}
                        </span>
                        <span className="text-[11px] text-white/60">{v.note}</span>
                        <Chip
                          className="mt-1 w-fit"
                          tone={
                            v.badge === "Amended"
                              ? "amber"
                              : v.badge === "Verified"
                                ? "green"
                                : "teal"
                          }
                        >
                          {v.badge}
                        </Chip>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <p className="mt-10 text-[10.5px] text-white/60">
                Sample lifecycle for illustration · demo data
              </p>
            </div>
          </Reveal>

          {/* compliance card */}
          <Reveal delay={0.2}>
            <div className="flex h-full flex-col gap-5">
              <div className="chk-panel-deep flex-1 p-7">
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/72">
                  Deterministic compliance
                </span>
                <div className="mt-6 flex flex-col gap-5">
                  <div className="flex items-start gap-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                      <Award size={15} className="text-[#E5BE71]" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <MetaRow label="Certification" value="ISI mark scheme" />
                      <span className="text-[10.5px] leading-[1.5] text-white/60">
                        Certification marking applies to the product class.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                      <Landmark size={15} className="text-[#5CA8FF]" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <MetaRow label="QCO" value="Applicable" valueClassName="text-[#E5BE71]" />
                      <span className="text-[10.5px] leading-[1.5] text-white/60">
                        Quality Control Order in force for this category.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                      <FileCheck2 size={15} className="text-[#7DD9A8]" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <MetaRow label="Source" value="Gazette notification" />
                      <span className="text-[10.5px] leading-[1.5] text-white/60">
                        Official notification reference attached as evidence.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-[#4CB782]/15 bg-[#4CB782]/[0.05] px-5 py-4">
                <BadgeDot tone="green" />
                <p className="text-[12px] leading-[1.5] text-[#8FCBAA]">
                  Compliance checks run on deterministic rules — recorded, not
                  inferred.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
