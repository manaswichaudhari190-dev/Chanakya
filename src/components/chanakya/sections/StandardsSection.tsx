"use client";

/**
 * CHANAKYA — Second story: CONNECTED KNOWLEDGE
 * Standards relationship graph with hover-highlight and a floating
 * evidence panel that reflects the hovered relationship.
 */

import { AnimatePresence, motion } from "framer-motion";
import { BookMarked } from "lucide-react";
import { useState } from "react";
import { GraphCanvas, GraphMobileList, type GraphEdge, type GraphNode } from "../Graph";
import { MetaRow, Reveal, SectionHeading, SectionLabel, StatusDot } from "../primitives";

const NODES: GraphNode[] = [
  { id: "center", label: "Requirement", x: 0.5, y: 0.46, kind: "center" },
  { id: "primary", label: "Primary Standard", sublabel: "IS 800:2007", x: 0.15, y: 0.2, kind: "standard" },
  { id: "normative", label: "Normative Reference", sublabel: "cited within text", x: 0.16, y: 0.78, kind: "standard" },
  { id: "test", label: "Test Method", sublabel: "IS 1608 · tensile testing", x: 0.42, y: 0.9, kind: "standard" },
  { id: "terminology", label: "Terminology", sublabel: "defined terms", x: 0.71, y: 0.86, kind: "standard" },
  { id: "safety", label: "Safety", sublabel: "safety clauses", x: 0.895, y: 0.6, kind: "standard" },
  { id: "installation", label: "Installation", sublabel: "erection practice", x: 0.85, y: 0.19, kind: "standard" },
  { id: "product", label: "Related Product", sublabel: "coated sections", x: 0.56, y: 0.12, kind: "standard" },
];

const EDGES: GraphEdge[] = NODES.filter((n) => n.id !== "center").map((n) => ({
  from: "center",
  to: n.id,
}));

const RELATION_LABELS: Record<string, string> = {
  primary: "Primary standard",
  normative: "Normative reference",
  test: "Test method",
  terminology: "Terminology",
  safety: "Safety requirement",
  installation: "Installation practice",
  product: "Related product",
};

export function StandardsSection() {
  const [active, setActive] = useState<string | null>("normative");
  const relation = active ? (RELATION_LABELS[active] ?? "Normative reference") : "Normative reference";

  return (
    <section id="standards" className="relative py-28 sm:py-36" aria-labelledby="standards-heading">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="max-w-[720px]">
          <SectionLabel>Connected knowledge</SectionLabel>
          <SectionHeading className="mt-5">
            From one requirement to the standards around it.
          </SectionHeading>
          <p className="mt-6 text-pretty text-[16px] leading-[1.7] text-white/72">
            Most requirements are covered by more than one document. CHANAKYA
            expands a single requirement into the standards that surround it —
            primary, normative, test, terminology, safety, installation and
            related products — so nothing is missed at evaluation time.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="relative mt-14 hidden md:block">
          <GraphCanvas
            nodes={NODES}
            edges={EDGES}
            height={500}
            onHoverNode={setActive}
            onLeaveNode={() => setActive("normative")}
          />

          {/* floating evidence panel */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="chk-float absolute right-6 top-6 z-[5] w-[228px] rounded-xl border border-white/[0.09] bg-[#161718]/95 p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur"
          >
            <div className="flex items-center gap-2">
              <BookMarked size={12.5} className="text-[#3FB8AF]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/72">
                Evidence
              </span>
            </div>
            <div className="mt-3.5 flex flex-col gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-[0.1em] text-white/60">
                  Relationship
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={relation}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22 }}
                    className="mt-[3px] text-[12.5px] font-medium text-white/88"
                  >
                    {relation}
                  </motion.div>
                </AnimatePresence>
              </div>
              <MetaRow label="Source" value="BIS catalogue" />
              <MetaRow
                label="Status"
                value={
                  <span className="inline-flex items-center gap-1.5 text-[#7DD9A8]">
                    <StatusDot tone="green" /> Verified
                  </span>
                }
              />
            </div>
          </motion.div>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 md:hidden">
          <GraphMobileList
            centerLabel="Requirement"
            items={[
              { label: "Primary Standard", sublabel: "IS 800:2007" },
              { label: "Normative Reference", sublabel: "cited in text" },
              { label: "Test Method", sublabel: "IS 1608" },
              { label: "Terminology", sublabel: "defined terms" },
              { label: "Safety", sublabel: "clauses" },
              { label: "Installation", sublabel: "erection" },
              { label: "Related Product", sublabel: "coated sections" },
            ]}
          />
        </Reveal>
      </div>
    </section>
  );
}
