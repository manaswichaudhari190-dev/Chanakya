"use client";

/**
 * CHANAKYA — Ninth story: MULTILINGUAL INPUT
 * Language selector + visual retrieval flow. Selecting a language
 * swaps the sample input, keeping the section visual.
 */

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Languages,
  ListTree,
  ScanSearch,
  Sparkles,
  Waypoints,
} from "lucide-react";
import { useState } from "react";
import { LANGUAGES } from "../data/demoData";
import { Reveal, SectionHeading, SectionLabel, StatusDot } from "../primitives";

const STEPS = [
  { icon: Languages, label: "Language detected" },
  { icon: Waypoints, label: "Multilingual retrieval" },
  { icon: ListTree, label: "Requirement extraction" },
  { icon: Sparkles, label: "Standards recommendation" },
];

export function MultilingualSection() {
  const [lang, setLang] = useState(LANGUAGES[1]); // Hindi default
  const active = LANGUAGES.find((l) => l.id === lang.id) ?? lang;

  return (
    <section className="relative py-28 sm:py-36" aria-labelledby="multilingual-heading">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <SectionLabel>Multilingual input</SectionLabel>
          <SectionHeading className="mt-5">
            Procurement starts with the language people actually use.
          </SectionHeading>
          <p className="mt-6 text-pretty text-[16px] leading-[1.7] text-white/72">
            Tenders arrive in English, Hindi and other Indian languages.
            CHANAKYA detects the language, retrieves across it and returns
            standards recommendations — without forcing officers to translate
            first.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <div className="chk-app-frame p-6 sm:p-8">
            {/* language selector */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {LANGUAGES.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLang(l)}
                  className={`cursor-pointer rounded-full border px-4 py-[7px] text-[12.5px] font-medium transition-all duration-300 ${
                    l.id === active.id
                      ? "border-[#E069A8]/45 bg-[#E069A8]/[0.12] text-[#F2A6C9] shadow-[0_0_18px_-4px_rgba(224,105,168,0.45)]"
                      : "border-white/[0.08] bg-white/[0.03] text-white/72 hover:border-white/[0.16] hover:text-white"
                  }`}
                >
                  {l.label}
                </button>
              ))}
              <span className="rounded-full border border-dashed border-white/[0.1] px-4 py-[7px] text-[12px] text-white/60">
                Other supported languages
              </span>
            </div>

            {/* input */}
            <div className="mx-auto mt-7 max-w-[680px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.35 }}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-white/60">
                      Tender input
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4CB782]/25 bg-[#4CB782]/[0.08] px-2.5 py-[3px] text-[10.5px] font-medium text-[#7DD9A8]">
                      <StatusDot tone="green" />
                      Language detected · {active.label}
                    </span>
                  </div>
                  <p
                    dir="auto"
                    className="mt-3.5 text-[15px] leading-[1.75] text-white/88"
                  >
                    {active.sample}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* flow */}
            <div className="chk-scroll-x mx-auto mt-7 flex max-w-[860px] items-stretch justify-center gap-0 overflow-x-auto pb-1">
              {STEPS.map((s, i) => (
                <div key={s.label} className="flex items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.14 }}
                    className="flex w-[150px] flex-col items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-4 text-center"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E069A8]/25 bg-[#E069A8]/[0.1]">
                      <s.icon size={13} className="text-[#F2A6C9]" />
                    </span>
                    <span className="text-[10.5px] font-medium leading-[1.4] text-white/88">
                      {s.label}
                    </span>
                  </motion.div>
                  {i < STEPS.length - 1 && (
                    <ArrowRight size={13} className="mx-2 shrink-0 text-white/40" />
                  )}
                </div>
              ))}
            </div>

            {/* result */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="mx-auto mt-7 flex w-fit flex-wrap items-center justify-center gap-2 rounded-xl border border-[#E069A8]/20 bg-[#E069A8]/[0.06] px-5 py-3.5"
            >
              <ScanSearch size={13} className="text-[#F2A6C9]" />
              <span className="text-[12px] text-white/72">Recommended:</span>
              {["IS 800", "IS 2062", "IS 808"].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-[#E069A8]/30 bg-[#161718] px-2.5 py-[3px] font-mono text-[11px] text-[#F2A6C9]"
                >
                  {c}
                </span>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
