"use client";

/**
 * CHANAKYA — Third story: TENDER COMPLIANCE
 * Split-screen: what the tender cites vs what the system finds,
 * followed by a sequential compliance matrix.
 */

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CircleDashed,
  FileText,
  ScanSearch,
  XCircle,
} from "lucide-react";
import { COMPLIANCE_MATRIX, SYSTEM_FINDINGS, TENDER_REFERENCES } from "../data/demoData";
import { Chip, Reveal, SectionHeading, SectionLabel } from "../primitives";

const FINDING_STYLES = {
  present: {
    icon: <ScanSearch size={13} className="text-[#7DD9A8]" />,
    label: <span className="text-[#7DD9A8]">✓ Present</span>,
  },
  outdated: {
    icon: <AlertTriangle size={13} className="text-[#E5BE71]" />,
    label: <span className="text-[#E5BE71]">⚠ Outdated</span>,
  },
  missing: {
    icon: <XCircle size={13} className="text-[#F0918B]" />,
    label: <span className="text-[#F0918B]">✕ Mandatory missing</span>,
  },
  advisory: {
    icon: <CircleDashed size={13} className="text-white/72" />,
    label: <span className="text-white/72">○ Advisory missing</span>,
  },
} as const;

const STATUS_MATRIX = {
  verified: <Chip tone="green" dot>Verified</Chip>,
  missing: <Chip tone="red" dot>Missing</Chip>,
} as const;

export function TenderAuditSection() {
  return (
    <section id="solutions" className="relative py-28 sm:py-36" aria-labelledby="audit-heading">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <SectionLabel>Tender compliance</SectionLabel>
          <SectionHeading className="mt-5">
            See what a tender cites — and what it still needs.
          </SectionHeading>
          <p className="mt-6 text-pretty text-[16px] leading-[1.7] text-white/72">
            CHANAKYA audits every standards citation in a tender against the
            requirements it contains. Outdated editions, missing mandatory
            references and advisory gaps surface before evaluation — not after.
          </p>
        </Reveal>

        {/* split screen */}
        <Reveal delay={0.12} className="mt-14">
          <div className="chk-app-frame overflow-hidden p-0">
            <div className="grid md:grid-cols-2">
              {/* left — tender references */}
              <div className="border-b border-white/[0.06] p-6 md:border-b-0 md:border-r sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[12px] font-medium text-white/88">
                    <FileText size={13} className="text-white/72" />
                    Tender references
                  </span>
                  <span className="font-mono text-[10px] text-white/60">
                    2 citations found
                  </span>
                </div>
                <div className="mt-5 flex flex-col gap-2.5">
                  {TENDER_REFERENCES.map((r, i) => (
                    <motion.div
                      key={r.code}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: 0.15 + i * 0.12 }}
                      className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.02] px-4 py-3"
                    >
                      <div className="flex flex-col gap-[3px]">
                        <span className="font-mono text-[12.5px] font-medium text-white">
                          {r.code}
                        </span>
                        <span className="text-[11px] text-white/72">{r.note}</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.1em] text-white/60">
                        Cited in §{i + 2}.1
                      </span>
                    </motion.div>
                  ))}
                  <div className="mt-1 rounded-lg border border-dashed border-white/[0.09] px-4 py-3 text-[11px] text-white/60">
                    + 2 unstructured mentions detected for classification
                  </div>
                </div>
              </div>

              {/* right — system analysis */}
              <div className="relative p-6 sm:p-7">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(90% 80% at 100% 0%, rgba(232,130,74,0.06), transparent 60%)",
                  }}
                />
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[12px] font-medium text-white/88">
                    <ScanSearch size={13} className="text-[#E8824A]" />
                    System analysis
                  </span>
                  <span className="font-mono text-[10px] text-white/60">
                    4 findings
                  </span>
                </div>
                <div className="mt-5 flex flex-col gap-2.5">
                  {SYSTEM_FINDINGS.map((f, i) => (
                    <motion.div
                      key={f.label}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: 0.35 + i * 0.16 }}
                      className="flex items-center gap-3 rounded-lg border border-white/[0.07] bg-white/[0.02] px-4 py-3"
                    >
                      {FINDING_STYLES[f.status].icon}
                      <div className="flex flex-col gap-[2px]">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/72">
                          {FINDING_STYLES[f.status].label}
                        </span>
                        <span className="text-[11.5px] text-white/88">
                          {f.text}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* compliance matrix */}
        <Reveal delay={0.2} className="mt-8">
          <div className="chk-app-frame overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  {["Requirement", "Tender", "Recommendation", "Status"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-5 py-3.5 text-[10.5px] font-medium uppercase tracking-[0.13em] text-white/60"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {COMPLIANCE_MATRIX.map((row, i) => (
                  <motion.tr
                    key={row.requirement}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.14 }}
                    className="border-b border-white/[0.05] transition-colors last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3.5 text-[13px] text-white/88">
                      {row.requirement}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[12px] text-white/72">
                      {row.tender}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[12px] text-[#3FB8AF]">
                      {row.recommendation}
                    </td>
                    <td className="px-5 py-3.5">{STATUS_MATRIX[row.status]}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
