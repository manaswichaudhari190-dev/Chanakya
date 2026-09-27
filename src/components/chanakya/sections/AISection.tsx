"use client";

/**
 * CHANAKYA — Sixth story: AI WORKFLOWS
 * Conversational panel with live analysis metrics and counters.
 */

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, User } from "lucide-react";
import { AI_METRICS } from "../data/demoData";
import { Counter, Reveal, SectionHeading, SectionLabel } from "../primitives";

function AnalyzingDots() {
  return (
    <span className="inline-flex items-center gap-1 align-middle">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block h-[3px] w-[3px] rounded-full bg-[#5CA8FF]"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: i * 0.22,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}

export function AISection() {
  return (
    <section id="how-it-works" className="relative py-28 sm:py-36" aria-labelledby="ai-heading">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <SectionLabel>AI workflows</SectionLabel>
          <SectionHeading className="mt-5">
            AI that works with procurement teams — not around them.
          </SectionHeading>
          <p className="mt-6 text-pretty text-[16px] leading-[1.7] text-white/72">
            The assistant reads the tender, extracts requirements, retrieves
            and ranks candidate standards, and drafts a grounded
            recommendation. Every step is inspectable by the officer.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-14 max-w-[720px]">
          <div className="chk-app-frame overflow-hidden">
            {/* conversation header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
              <div className="flex items-center gap-2.5">
                <Sparkles size={13} className="text-[#5CA8FF]" />
                <span className="text-[12px] font-medium text-white/88">
                  CHANAKYA assistant
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-[3px] text-[10px] text-white/72">
                <span className="h-[5px] w-[5px] rounded-full bg-[#4CB782] chk-pulse" />
                Session live
              </span>
            </div>

            <div className="flex flex-col gap-5 p-5 sm:p-6">
              {/* officer message */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-start gap-3 self-end"
              >
                <div className="rounded-xl rounded-tr-sm border border-[#5CA8FF]/25 bg-[#5CA8FF]/[0.08] px-4 py-3 text-[13.5px] leading-[1.55] text-white/88">
                  “Find the standards applicable to this steel procurement
                  tender.”
                </div>
                <span className="mt-[2px] flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.04]">
                  <User size={12} className="text-white/72" />
                </span>
              </motion.div>

              {/* system response */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex items-start gap-3"
              >
                <span className="mt-[2px] flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#5CA8FF]/30 bg-[#5CA8FF]/[0.1]">
                  <Sparkles size={12} className="text-[#5CA8FF]" />
                </span>
                <div className="min-w-0 flex-1 rounded-xl rounded-tl-sm border border-white/[0.07] bg-white/[0.02] p-4 sm:p-5">
                  <p className="flex items-center gap-2 text-[13px] text-white/72">
                    Analyzing specification
                    <AnalyzingDots />
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
                    {AI_METRICS.map((m, i) => (
                      <motion.div
                        key={m.label}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.55 + i * 0.13 }}
                        className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3"
                      >
                        <span className="chk-zero block font-mono text-[19px] font-semibold tabular-nums tracking-tight text-white">
                          <Counter value={m.value} />
                        </span>
                        <span className="mt-1 block text-[9.5px] font-medium uppercase leading-[1.4] tracking-[0.08em] text-white/60">
                          {m.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* final recommendation */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1.35 }}
                    className="mt-3.5 flex items-center justify-between rounded-lg border border-[#4CB782]/20 bg-[#4CB782]/[0.06] px-4 py-3"
                  >
                    <span className="inline-flex items-center gap-2 text-[12px] text-[#8FCBAA]">
                      <CheckCircle2 size={13} />
                      Final recommendation
                    </span>
                    <span className="chk-zero font-mono text-[13px] font-semibold text-[#7DD9A8]">
                      <Counter value={8} duration={2} /> standards
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
