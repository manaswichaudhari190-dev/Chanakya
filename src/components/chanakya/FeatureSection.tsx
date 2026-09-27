"use client";

/**
 * CHANAKYA — Eighth story: PRODUCT CAPABILITIES
 * Six capability cards, each containing a miniature animated UI.
 */

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Check,
  FileSignature,
  GitBranch,
  GitPullRequestArrow,
  History,
  ScanSearch,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { Reveal, SectionHeading, SectionLabel } from "./primitives";

/* ---------------- miniature UIs ---------------- */

function MiniShell({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="relative mt-5 overflow-hidden rounded-lg border border-white/[0.07] bg-[#0F1011] p-3.5">
      {label && (
        <span className="absolute right-2.5 top-2.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-white/40">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

function MiniSemantic() {
  return (
    <MiniShell>
      <div className="flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-2">
        <Search size={10} className="text-[#5CA8FF]" />
        <span className="text-[10.5px] text-white/72">
          structural steel, grade E350, welded sections…
        </span>
        <span className="ml-auto h-[7px] w-[7px] rounded-full bg-[#4CB782]" />
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {["IS 800", "IS 2062", "IS 808"].map((c, i) => (
          <motion.span
            key={c}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.18 }}
            className="rounded-full border border-[#5CA8FF]/25 bg-[#5CA8FF]/[0.1] px-2 py-[3px] font-mono text-[9.5px] text-[#9CC8FF]"
          >
            {c}
          </motion.span>
        ))}
      </div>
    </MiniShell>
  );
}

function MiniGraph() {
  return (
    <MiniShell>
      <div className="flex items-center justify-between px-1 pt-1">
        {["IS 800", "IS 2062", "IS 808"].map((n, i) => (
          <div key={n} className="flex items-center">
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.25 + i * 0.2 }}
              className={`rounded-md border px-2 py-1.5 font-mono text-[9.5px] ${
                i === 0
                  ? "border-[#5CA8FF]/35 bg-[#5CA8FF]/[0.12] text-[#9CC8FF]"
                  : "border-white/[0.1] bg-white/[0.03] text-white/72"
              }`}
            >
              {n}
            </motion.span>
            {i < 2 && (
              <svg width="34" height="8" className="mx-1" aria-hidden>
                <line
                  x1="0"
                  y1="4"
                  x2="34"
                  y2="4"
                  stroke="rgba(63,184,175,0.45)"
                  strokeWidth="1"
                  className="chk-edge"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-1.5 px-1">
        <span className="rounded border border-white/[0.08] px-1.5 py-[2px] text-[8.5px] text-white/60">
          normative
        </span>
        <span className="rounded border border-white/[0.08] px-1.5 py-[2px] text-[8.5px] text-white/60">
          test method
        </span>
        <span className="rounded border border-white/[0.08] px-1.5 py-[2px] text-[8.5px] text-white/60">
          terminology
        </span>
      </div>
    </MiniShell>
  );
}

function MiniTimeline() {
  return (
    <MiniShell>
      <div className="relative mt-2 flex items-center justify-between px-1">
        <div className="absolute left-1 right-1 top-[10px] h-[1px] bg-white/[0.1]" />
        <motion.div
          className="absolute left-1 top-[10px] h-[1px] bg-gradient-to-r from-[#5CA8FF] to-[#4CB782]"
          initial={{ width: 0 }}
          whileInView={{ width: "calc(100% - 8px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.3 }}
        />
        {["2007", "2015", "2020", "2026"].map((y, i) => (
          <div key={y} className="relative z-[1] flex flex-col items-center gap-1.5">
            <span
              className={`h-[7px] w-[7px] rounded-full border ${
                i === 3
                  ? "border-[#4CB782] bg-[#4CB782] shadow-[0_0_8px_rgba(76,183,130,0.7)]"
                  : "border-white/25 bg-[#0F1011]"
              }`}
            />
            <span className="font-mono text-[8.5px] text-white/72">{y}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5 px-1">
        <Check size={9} className="text-[#7DD9A8]" />
        <span className="text-[9px] text-white/60">current · no amendments pending</span>
      </div>
    </MiniShell>
  );
}

function MiniCertification() {
  const rows = [
    { icon: <ShieldCheck size={10} className="text-[#7DD9A8]" />, text: "ISI mark scheme — required", tone: "ok" },
    { icon: <AlertTriangle size={10} className="text-[#E5BE71]" />, text: "QCO — applicable", tone: "warn" },
    { icon: <Check size={10} className="text-[#7DD9A8]" />, text: "Gazette evidence attached", tone: "ok" },
  ];
  return (
    <MiniShell label="rules">
      <div className="flex flex-col gap-1.5">
        {rows.map((r, i) => (
          <motion.div
            key={r.text}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 + i * 0.15 }}
            className="flex items-center gap-2 rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-[7px]"
          >
            {r.icon}
            <span className="text-[9.5px] text-white/72">{r.text}</span>
          </motion.div>
        ))}
      </div>
    </MiniShell>
  );
}

function MiniGap() {
  const rows = [
    { code: "IS 800", state: "present", note: "cited · current" },
    { code: "IS 2062", state: "outdated", note: "superseded edition" },
    { code: "IS 808", state: "missing", note: "required · absent" },
  ];
  return (
    <MiniShell label="audit">
      <div className="flex flex-col gap-1.5">
        {rows.map((r, i) => (
          <motion.div
            key={r.code}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 + i * 0.15 }}
            className="flex items-center justify-between rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-[7px]"
          >
            <span className="font-mono text-[9.5px] text-white/88">{r.code}</span>
            <span
              className={`inline-flex items-center gap-1 text-[8.5px] ${
                r.state === "present"
                  ? "text-[#7DD9A8]"
                  : r.state === "outdated"
                    ? "text-[#E5BE71]"
                    : "text-[#F0918B]"
              }`}
            >
              {r.state === "present" ? (
                <Check size={9} />
              ) : r.state === "outdated" ? (
                <AlertTriangle size={9} />
              ) : (
                <X size={9} />
              )}
              {r.note}
            </span>
          </motion.div>
        ))}
      </div>
    </MiniShell>
  );
}

function MiniClause() {
  return (
    <MiniShell label="draft">
      <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3">
        <div className="flex gap-1.5">
          <div className="w-[3px] shrink-0 rounded-full bg-white/30" />
          <p className="text-[9.5px] leading-[1.7] text-white/72">
            “The contractor shall supply structural steel conforming to{" "}
            <span className="rounded border border-[#3FB8AF]/30 bg-[#3FB8AF]/[0.12] px-1 py-[1px] font-mono text-[9px] text-[#7DD9D2]">
              IS 2062 · E350
            </span>{" "}
            including hot-rolled sections within{" "}
            <span className="rounded border border-[#4CB782]/30 bg-[#4CB782]/[0.1] px-1 py-[1px] font-mono text-[9px] text-[#7DD9A8]">
              IS 808
            </span>{" "}
            tolerances…”
          </p>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1.5 px-1">
        <Sparkles size={9} className="text-[#5CA8FF]" />
        <span className="text-[8.5px] text-white/60">
          clause grounded in 3 evidence sources
        </span>
      </div>
    </MiniShell>
  );
}

/* ---------------- section ---------------- */

const CARDS = [
  {
    icon: ScanSearch,
    color: "text-[#5CA8FF]",
    title: "Semantic recommendations",
    description:
      "Find applicable Indian Standards from natural-language specifications.",
    mini: <MiniSemantic />,
  },
  {
    icon: GitBranch,
    color: "text-[#3FB8AF]",
    title: "Standards relationships",
    description:
      "Expand allied, normative, test, terminology, safety, installation and related-product references.",
    mini: <MiniGraph />,
  },
  {
    icon: History,
    color: "text-[#E5BE71]",
    title: "Version intelligence",
    description: "Track editions, amendments, supersession and currency.",
    mini: <MiniTimeline />,
  },
  {
    icon: ShieldCheck,
    color: "text-[#4CB782]",
    title: "Certification + QCO",
    description:
      "Surface relevant certification and QCO information using deterministic compliance logic.",
    mini: <MiniCertification />,
  },
  {
    icon: GitPullRequestArrow,
    color: "text-[#E8824A]",
    title: "Tender gap analysis",
    description:
      "Compare cited standards against the standards required by the tender requirements.",
    mini: <MiniGap />,
  },
  {
    icon: FileSignature,
    color: "text-[#E069A8]",
    title: "Grounded clause drafting",
    description: "Create reviewable replacement clauses from verified evidence.",
    mini: <MiniClause />,
  },
];

export function FeatureSection() {
  return (
    <section id="product" className="relative py-28 sm:py-36" aria-labelledby="features-heading">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <SectionLabel>Capabilities</SectionLabel>
          <SectionHeading className="mt-5">
            One workflow — from specification to verifiable decision.
          </SectionHeading>
          <p className="mt-6 text-pretty text-[16px] leading-[1.7] text-white/72">
            Six core capabilities cover the officer&apos;s path: reading the
            tender, finding the standards, validating their status, resolving
            gaps and drafting grounded replacement text.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={(i % 3) * 0.1}>
              <div className="group/card chk-panel-deep h-full p-5 transition-all duration-500 hover:-translate-y-[2px] hover:border-white/[0.15] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_28px_56px_-28px_rgba(0,0,0,0.85)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] transition-colors duration-500 group-hover/card:border-white/[0.18]">
                    <card.icon size={15} className={card.color} />
                  </span>
                  <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-white">
                    {card.title}
                  </h3>
                </div>
                <p className="mt-3 text-[13px] leading-[1.6] text-white/72">
                  {card.description}
                </p>
                {card.mini}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
