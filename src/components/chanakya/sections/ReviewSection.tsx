"use client";

/**
 * CHANAKYA — Seventh story: HUMAN IN THE LOOP
 * Review queue where uncertain results wait for officer decisions
 * instead of being silently promoted.
 */

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Flag,
  Send,
  ShieldQuestion,
  UserCheck,
  X,
} from "lucide-react";
import { useState } from "react";
import { REVIEW_CARDS } from "../data/demoData";
import {
  Chip,
  ConfidenceBar,
  Reveal,
  SectionHeading,
  SectionLabel,
} from "../primitives";

type Decision = "accept" | "correct" | "reject" | "flag";

const REASON_TONES: Record<string, "amber" | "teal" | "red" | "blue"> = {
  "Low confidence": "amber",
  "Needs verification": "blue",
  "Outdated reference": "red",
  "Conflicting evidence": "teal",
};

const DECISION_LABEL: Record<Decision, string> = {
  accept: "Accepted",
  correct: "Corrected",
  reject: "Rejected",
  flag: "Flagged",
};

export function ReviewSection() {
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});
  const resolved = Object.keys(decisions).length;
  const total = REVIEW_CARDS.length;

  return (
    <section className="relative py-28 sm:py-36" aria-labelledby="review-heading">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <SectionLabel>Human in the loop</SectionLabel>
          <SectionHeading className="mt-5">
            The officer always stays in control.
          </SectionHeading>
          <p className="mt-6 text-pretty text-[16px] leading-[1.7] text-white/72">
            When confidence is low, evidence conflicts or a reference is
            outdated, CHANAKYA routes the result to a review queue — nothing
            uncertain is silently promoted into a recommendation.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <div className="chk-app-frame p-5 sm:p-7">
            {/* queue header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-5">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                  <ShieldQuestion size={14} className="text-[#E5BE71]" />
                </span>
                <div className="flex flex-col">
                  <span className="text-[14px] font-semibold text-white">
                    Review queue
                  </span>
                  <span className="text-[11px] text-white/60">
                    Uncertain results awaiting officer decision
                  </span>
                </div>
              </div>
              <span className="font-mono text-[11px] text-white/72">
                {resolved}/{total} resolved
              </span>
            </div>

            {/* cards */}
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {REVIEW_CARDS.map((card, i) => {
                const decision = decisions[card.id];
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                    className={`flex flex-col rounded-xl border p-4.5 transition-colors duration-500 ${
                      decision
                        ? "border-[#4CB782]/20 bg-[#4CB782]/[0.035]"
                        : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12]"
                    } px-4 py-4 sm:px-5 sm:py-5`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <Chip tone={REASON_TONES[card.reason] ?? "amber"} dot>
                        {card.reason}
                      </Chip>
                      <span className="font-mono text-[10px] text-white/60">
                        conf. {card.confidence}%
                      </span>
                    </div>
                    <span className="mt-3 font-mono text-[13px] font-medium text-white">
                      {card.code}
                    </span>
                    <p className="mt-1.5 text-[12px] leading-[1.55] text-white/72">
                      {card.detail}
                    </p>
                    <div className="mt-3.5">
                      <ConfidenceBar value={card.confidence} />
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-1.5">
                      <AnimatePresence mode="wait">
                        {decision ? (
                          <motion.span
                            key="resolved"
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[#4CB782]/30 bg-[#4CB782]/[0.1] px-3 py-1.5 text-[11px] font-medium text-[#7DD9A8]"
                          >
                            <Check size={11} />
                            {DECISION_LABEL[decision]} by officer
                          </motion.span>
                        ) : (
                          <motion.div
                            key="actions"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-wrap items-center gap-1.5"
                          >
                            <button
                              onClick={() =>
                                setDecisions((d) => ({ ...d, [card.id]: "accept" }))
                              }
                              className="cursor-pointer rounded-md border border-[#4CB782]/25 bg-[#4CB782]/[0.08] px-2.5 py-1.5 text-[10.5px] font-medium text-[#7DD9A8] transition-all hover:bg-[#4CB782]/[0.16]"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                setDecisions((d) => ({ ...d, [card.id]: "correct" }))
                              }
                              className="cursor-pointer rounded-md border border-white/[0.1] bg-white/[0.04] px-2.5 py-1.5 text-[10.5px] font-medium text-white/88 transition-all hover:border-white/[0.2] hover:text-white"
                            >
                              Correct
                            </button>
                            <button
                              onClick={() =>
                                setDecisions((d) => ({ ...d, [card.id]: "reject" }))
                              }
                              className="cursor-pointer rounded-md border border-[#E5534B]/25 bg-[#E5534B]/[0.07] px-2.5 py-1.5 text-[10.5px] font-medium text-[#F0918B] transition-all hover:bg-[#E5534B]/[0.14]"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() =>
                                setDecisions((d) => ({ ...d, [card.id]: "flag" }))
                              }
                              className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-[#D29922]/25 bg-[#D29922]/[0.07] px-2.5 py-1.5 text-[10.5px] font-medium text-[#E5BE71] transition-all hover:bg-[#D29922]/[0.14]"
                            >
                              <Flag size={10} />
                              Flag for review
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* footer */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-5">
              <p className="flex items-center gap-2 text-[11.5px] text-white/60">
                <UserCheck size={13} className="text-[#4CB782]" />
                Uncertain results enter review — never silently promoted.
              </p>
              <button className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#E5E5E6] px-4 py-2 text-[12.5px] font-medium text-[#08090A] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#F7F8F8] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)]">
                <Send size={12.5} className="transition-transform duration-300 group-hover:translate-x-[2px]" />
                Send to Reviewer
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
