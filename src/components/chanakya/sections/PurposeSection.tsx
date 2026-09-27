"use client";

/**
 * CHANAKYA — First story: PURPOSE-BUILT
 * Large editorial statement + interactive requirement graph.
 */

import { Reveal, SectionHeading, SectionLabel } from "../primitives";
import { GraphCanvas, GraphMobileList, type GraphEdge, type GraphNode } from "../Graph";

const NODES: GraphNode[] = [
  { id: "center", label: "Structural Steel", x: 0.5, y: 0.47, kind: "center" },
  { id: "is800", label: "IS 800", sublabel: "Design code", x: 0.155, y: 0.19, kind: "standard" },
  { id: "is2062", label: "IS 2062", sublabel: "Material grade", x: 0.845, y: 0.17, kind: "standard" },
  { id: "is808", label: "IS 808", sublabel: "Section dimensions", x: 0.905, y: 0.55, kind: "standard" },
  { id: "qco", label: "QCO", sublabel: "Applicability", x: 0.74, y: 0.86, kind: "meta" },
  { id: "evidence", label: "Evidence", sublabel: "14 sources", x: 0.5, y: 0.9, kind: "meta" },
  { id: "certification", label: "Certification", sublabel: "ISI mark scheme", x: 0.135, y: 0.78, kind: "meta" },
  { id: "amendments", label: "Amendments", sublabel: "Lifecycle currency", x: 0.065, y: 0.42, kind: "meta" },
];

const EDGES: GraphEdge[] = NODES.filter((n) => n.id !== "center").map((n) => ({
  from: "center",
  to: n.id,
}));

export function PurposeSection() {
  return (
    <section className="relative py-28 sm:py-36" aria-labelledby="purpose-heading">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <SectionLabel>Purpose-built</SectionLabel>
          <SectionHeading className="mt-5">
            Procurement intelligence built around how standards actually work.
          </SectionHeading>
          <p className="mt-6 text-pretty text-[16px] leading-[1.7] text-white/72">
            CHANAKYA does not treat standards as isolated documents. It connects
            requirements, standards, relationships, lifecycle information,
            certification requirements, evidence, and tender gaps into one
            workflow.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-14 hidden md:block">
          <GraphCanvas
            nodes={NODES}
            edges={EDGES}
            height={470}
            caption={
              <span className="rounded-full border border-white/[0.07] bg-[#0F1011]/85 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/60 backdrop-blur">
                Sample knowledge graph · demo data
              </span>
            }
          />
        </Reveal>

        <Reveal delay={0.15} className="mt-12 md:hidden">
          <GraphMobileList
            centerLabel="Structural Steel"
            items={[
              { label: "IS 800", sublabel: "Design code" },
              { label: "IS 2062", sublabel: "Material grade" },
              { label: "IS 808", sublabel: "Dimensions" },
              { label: "QCO", sublabel: "Applicability" },
              { label: "Certification", sublabel: "ISI mark" },
              { label: "Amendments", sublabel: "Currency" },
              { label: "Evidence", sublabel: "14 sources" },
            ]}
          />
        </Reveal>
      </div>
    </section>
  );
}
