"use client";

/**
 * CHANAKYA — Tenth story: PERSONAS
 * Three premium persona cards mapping to the architecture's
 * officer / engineer / reviewer roles.
 */

import { motion } from "framer-motion";
import { ArrowUpRight, Cog, Stamp, UserCheck } from "lucide-react";
import { PERSONAS } from "../data/demoData";
import { Chip, Reveal, SectionHeading, SectionLabel } from "../primitives";

const PERSONA_META = [
  { icon: UserCheck, tone: "blue" as const, iconColor: "text-[#5CA8FF]" },
  { icon: Cog, tone: "teal" as const, iconColor: "text-[#3FB8AF]" },
  { icon: Stamp, tone: "green" as const, iconColor: "text-[#4CB782]" },
];

export function PersonasSection() {
  return (
    <section id="personas" className="relative py-28 sm:py-36" aria-labelledby="personas-heading">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <SectionLabel>Built for three roles</SectionLabel>
          <SectionHeading className="mt-5">
            One system, three points of control.
          </SectionHeading>
          <p className="mt-6 text-pretty text-[16px] leading-[1.7] text-white/72">
            CHANAKYA&apos;s workflows are designed around the people who operate
            them — officers who analyze tenders, engineers who keep the
            knowledge base healthy, and reviewers who resolve the hard cases.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {PERSONAS.map((p, i) => {
            const meta = PERSONA_META[i];
            return (
              <Reveal key={p.role} delay={i * 0.12}>
                <div className="group/persona chk-panel-deep relative h-full overflow-hidden p-6 transition-all duration-500 hover:-translate-y-[2px] hover:border-white/[0.15]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 transition-opacity duration-700 group-hover/persona:opacity-100"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(255,255,255,0.09), transparent 70%)",
                    }}
                  />
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.04]">
                      <meta.icon size={18} className={meta.iconColor} />
                    </span>
                    <Chip tone={meta.tone}>{p.focus}</Chip>
                  </div>
                  <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.01em] text-white">
                    {p.role}
                  </h3>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {p.capabilities.map((c, j) => (
                      <motion.li
                        key={c}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 + j * 0.09 }}
                        className="flex items-center gap-2.5 text-[13px] text-white/72"
                      >
                        <ArrowUpRight size={11.5} className="shrink-0 text-white/60 transition-colors duration-300 group-hover/persona:text-white" />
                        {c}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
