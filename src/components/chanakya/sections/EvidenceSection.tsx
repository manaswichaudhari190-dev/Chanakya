"use client";

/**
 * CHANAKYA — Fourth story: EVIDENCE-FIRST AI
 * A recommendation on the left, its reasons and evidence on the right.
 */

import { Quote, ShieldAlert } from "lucide-react";
import { RECOMMENDATIONS } from "../data/demoData";
import { RecommendationCard } from "../RecommendationCard";
import {
  ConfidenceBar,
  MetaRow,
  Reveal,
  SectionHeading,
  SectionLabel,
  StatusDot,
} from "../primitives";

export function EvidenceSection() {
  return (
    <section id="evidence" className="relative py-28 sm:py-36" aria-labelledby="evidence-heading">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <SectionLabel>Evidence-first AI</SectionLabel>
          <SectionHeading className="mt-5">
            Every recommendation comes with a reason.
          </SectionHeading>
          <p className="mt-6 text-pretty text-[16px] leading-[1.7] text-white/72">
            CHANAKYA is designed so that recommendations are traceable to
            evidence, standard metadata, lifecycle information, and
            deterministic compliance checks.
          </p>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-2">
          {/* left — the recommendation */}
          <Reveal delay={0.1}>
            <RecommendationCard rec={RECOMMENDATIONS[0]} className="h-full" />
          </Reveal>

          {/* right — why it matched */}
          <Reveal delay={0.2}>
            <div className="chk-glow-border flex h-full flex-col p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#7DD9A8]">
                  Why it matched
                </span>
                <span className="font-mono text-[10px] text-white/60">
                  trace · IS 800:2007
                </span>
              </div>

              <div className="mt-5 flex flex-col gap-5">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.1em] text-white/60">
                    Matched requirement
                  </span>
                  <p className="mt-1.5 text-[14px] font-medium text-white">
                    Structural steel fabrication
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-[0.1em] text-white/60">
                    Evidence
                  </span>
                  <div className="mt-2 rounded-lg border border-white/[0.07] bg-white/[0.02] p-4">
                    <Quote size={12} className="mb-2 text-white/60" />
                    <p className="text-[13px] leading-[1.65] text-white/88">
                      “Structural steel design shall comply with the general
                      construction requirements for steel, including grade
                      selection, section properties and fabrication
                      tolerances…”
                    </p>
                    <div className="mt-3 flex items-center gap-2 border-t border-white/[0.06] pt-3">
                      <span className="rounded border border-white/[0.08] bg-white/[0.03] px-1.5 py-[1px] font-mono text-[9.5px] text-white/72">
                        § 4.2.1
                      </span>
                      <span className="text-[10.5px] text-white/60">
                        clause linked to recommendation
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-4">
                    <span className="text-[10px] uppercase tracking-[0.1em] text-white/60">
                      Source
                    </span>
                    <p className="mt-1.5 text-[13px] text-white/88">
                      BIS Standard Catalogue
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-4">
                    <span className="text-[10px] uppercase tracking-[0.1em] text-white/60">
                      Last verified
                    </span>
                    <p className="mt-1.5 inline-flex items-center gap-2 text-[13px] text-white/88">
                      <StatusDot tone="green" />
                      27 Sep 2026
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.1em] text-white/60">
                      Match confidence
                    </span>
                    <span className="font-mono text-[11.5px] text-[#7DD9A8]">96%</span>
                  </div>
                  <ConfidenceBar value={96} />
                </div>
              </div>

              <div className="mt-auto pt-6">
                <div className="flex items-start gap-3 rounded-lg border border-[#D29922]/20 bg-[#D29922]/[0.06] p-3.5">
                  <ShieldAlert size={14} className="mt-[1px] shrink-0 text-[#E5BE71]" />
                  <p className="text-[11.5px] leading-[1.6] text-[#B9A26D]">
                    AI assists the officer with grounded evidence. The final
                    legal and procurement decision always remains with the
                    reviewing authority.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
