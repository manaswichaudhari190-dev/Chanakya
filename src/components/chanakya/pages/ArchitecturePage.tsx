"use client";

/**
 * CHANAKYA — Architecture view (#/architecture)
 * Positions CHANAKYA as standards-aware procurement recommendation and
 * tender-gap resolution for Indian Standards — and makes clear that
 * the React page is only the presentation layer.
 */

import { motion } from "framer-motion";
import {
  ArrowLeft,
  BrainCircuit,
  Database,
  FileSearch,
  GitBranch,
  MonitorPlay,
  ScrollText,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { WORKFLOW_STAGES } from "../data/demoData";
import type { View } from "../Navbar";
import {
  ChkButton,
  Reveal,
  SectionHeading,
  SectionLabel,
} from "../primitives";

const PILLARS = [
  {
    icon: Database,
    color: "text-[#3FB8AF]",
    title: "Standards knowledge base",
    text: "Indian Standards metadata: editions, amendments, supersession, relationships, certification and QCO information — stored as a connected graph, not a document pile.",
  },
  {
    icon: BrainCircuit,
    color: "text-[#5CA8FF]",
    title: "Retrieval + reasoning",
    text: "Semantic retrieval and reranking over the standards graph, followed by deterministic lifecycle and compliance validation before anything reaches the officer.",
  },
  {
    icon: ScrollText,
    color: "text-[#E8824A]",
    title: "Tender-gap resolution",
    text: "Extracted requirements are compared against cited standards. Missing, outdated and advisory references become explicit, evidence-backed findings.",
  },
  {
    icon: ShieldCheck,
    color: "text-[#4CB782]",
    title: "Human review + audit",
    text: "Low-confidence or conflicting results are routed to review. Officers accept, correct, reject or flag — every decision is recorded for audit.",
  },
];

export function ArchitecturePage({
  navigate,
}: {
  navigate: (v: View, anchor?: string) => void;
}) {
  return (
    <main className="relative z-[1] mx-auto max-w-[1200px] px-5 pb-28 pt-32 sm:px-8 sm:pt-36">
      <Reveal>
        <button
          onClick={() => navigate("landing")}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.04] px-3.5 py-[7px] text-[12px] text-white/88 transition-all hover:border-white/[0.18] hover:text-white"
        >
          <ArrowLeft size={12} />
          Back to site
        </button>

        <div className="mt-8 max-w-[760px]">
          <SectionLabel>System architecture</SectionLabel>
          <SectionHeading className="mt-5">
            Standards-aware procurement recommendation and tender-gap
            resolution.
          </SectionHeading>
          <p className="mt-6 text-pretty text-[15.5px] leading-[1.75] text-white/72">
            CHANAKYA is architected as a pipeline of inspectable stages — not
            a single opaque model call. Each stage contributes evidence the
            officer can open, verify and overrule. The workflow below is the
            visual backbone of the product and of this landing page.
          </p>
        </div>
      </Reveal>

      {/* workflow pipeline */}
      <Reveal delay={0.12} className="mt-12">
        <div className="chk-panel-deep p-6 sm:p-8">
          <div className="flex items-center gap-2.5">
            <Workflow size={14} className="text-[#5CA8FF]" />
            <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/72">
              End-to-end workflow
            </span>
            <span className="ml-auto font-mono text-[10px] text-white/60">
              11 stages
            </span>
          </div>

          <div className="relative mt-7">
            <div className="absolute bottom-1 left-[11px] top-1 w-[1px] bg-white/[0.08] sm:left-[13px]" />
            <motion.div
              className="absolute left-[11px] top-1 w-[1px] bg-gradient-to-b from-[#5CA8FF] via-[#3FB8AF] to-[#4CB782] sm:left-[13px]"
              initial={{ height: 0 }}
              whileInView={{ height: "calc(100% - 8px)" }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 2.4, ease: [0.21, 0.6, 0.35, 1] }}
            />
            <ol className="flex flex-col gap-3">
              {WORKFLOW_STAGES.map((s, i) => (
                <motion.li
                  key={s.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-6% 0px" }}
                  transition={{ duration: 0.45, delay: 0.08 * i }}
                  className="relative flex items-center gap-4 pl-1"
                >
                  <span className="relative z-[1] flex h-[23px] w-[23px] shrink-0 items-center justify-center rounded-full border border-[#3FB8AF]/35 bg-[#0F1011] font-mono text-[9.5px] font-medium text-[#7DD9D2] sm:h-[27px] sm:w-[27px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-1 flex-wrap items-baseline gap-x-3 gap-y-0.5 rounded-lg border border-white/[0.055] bg-white/[0.02] px-4 py-2.5">
                    <span className="text-[13px] font-medium text-white">
                      {s.label}
                    </span>
                    <span className="text-[11px] text-white/60">{s.detail}</span>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>

      {/* pillars */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} delay={0.08 * i}>
            <div className="chk-panel-deep h-full p-6 transition-all duration-500 hover:-translate-y-[2px] hover:border-white/[0.14]">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                <p.icon size={16} className={p.color} />
              </span>
              <h3 className="mt-4 text-[15.5px] font-semibold text-white">
                {p.title}
              </h3>
              <p className="mt-2.5 text-[13px] leading-[1.65] text-white/72">
                {p.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* presentation layer note */}
      <Reveal delay={0.1} className="mt-6">
        <div className="chk-glow-border flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-7">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
            <MonitorPlay size={17} className="text-[#E8824A]" />
          </span>
          <div>
            <h3 className="text-[15px] font-semibold text-white">
              Presentation layer — this demo
            </h3>
            <p className="mt-1.5 max-w-[720px] text-[13px] leading-[1.65] text-white/72">
              The production architecture uses <strong className="text-white/88">Streamlit + Python</strong> for
              the officer-facing frontend. This React page is a demo-only
              marketing surface — it does not replace or alter the production
              system. All records shown anywhere in this demo are sample data.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
        <ChkButton variant="primary" onClick={() => navigate("demo")} arrow>
          Open the demo
        </ChkButton>
        <ChkButton variant="secondary" onClick={() => navigate("docs")}>
          <FileSearch size={14} className="text-[#E8824A]" />
          Read the docs
        </ChkButton>
      </Reveal>
    </main>
  );
}
