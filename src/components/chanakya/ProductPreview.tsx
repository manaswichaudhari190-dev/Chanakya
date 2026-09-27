"use client";

/**
 * CHANAKYA — Hero product preview
 * A realistic enterprise application mockup built from real React
 * components (no screenshots): app chrome, sidebar, tender intake,
 * animated processing pipeline, and standards recommendations.
 * All records are demo data.
 */

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Bell,
  BookOpen,
  ChevronRight,
  ClipboardCheck,
  Database,
  FileCheck2,
  FileSearch,
  Inbox,
  Languages,
  LayoutDashboard,
  ListChecks,
  ListTree,
  Loader2,
  MessagesSquare,
  Network,
  ScanText,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PIPELINE_STEPS, RECOMMENDATIONS, SIDEBAR_ITEMS } from "./data/demoData";
import { RecommendationCard } from "./RecommendationCard";
import { LogoMark, StatusDot } from "./primitives";

const SIDEBAR_ICONS = [
  LayoutDashboard,
  FileSearch,
  ListChecks,
  BookOpen,
  ShieldCheck,
  ClipboardCheck,
  MessagesSquare,
  Settings,
] as const;

const PIPELINE_ICONS = [
  Inbox,
  ScanText,
  Languages,
  ListTree,
  Database,
  SlidersHorizontal,
  Network,
  ShieldCheck,
  FileCheck2,
] as const;

const STEPS = PIPELINE_STEPS;
const LOOP_DONE_PAUSE = 4600;
const STEP_MS = 1050;

export function ProductPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.45"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  /* pipeline state machine */
  const [activeIdx, setActiveIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done && activeIdx >= STEPS.length - 1) {
      const t = setTimeout(() => setDone(true), STEP_MS * 0.8);
      return () => clearTimeout(t);
    }
    if (!done) {
      const t = setTimeout(
        () => setActiveIdx((i) => Math.min(i + 1, STEPS.length - 1)),
        STEP_MS
      );
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setActiveIdx(0);
      setDone(false);
    }, LOOP_DONE_PAUSE);
    return () => clearTimeout(t);
  }, [activeIdx, done]);

  const progressPct = done
    ? 100
    : Math.round((activeIdx / (STEPS.length - 1)) * 100);

  return (
    <section
      ref={ref}
      aria-label="CHANAKYA application preview"
      className="relative px-4 pb-8 sm:px-8"
    >
      {/* ambient glow behind the frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[8%] h-[560px] w-[min(1060px,96vw)] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(92,168,255,0.13), rgba(63,184,175,0.05) 52%, transparent 74%)",
        }}
      />

      <motion.div
        style={{ rotateX, scale, transformPerspective: 2200 }}
        className="chk-app-frame relative mx-auto max-w-[1150px] origin-top"
      >
        {/* demo badge */}
        <div className="absolute -top-3 right-5 z-20 rounded-full border border-white/[0.1] bg-[#161718] px-2.5 py-[3px] text-[9.5px] font-medium uppercase tracking-[0.14em] text-white/72">
          Demo data
        </div>

        {/* ---------------- top application bar ---------------- */}
        <div className="flex h-[46px] items-center justify-between border-b border-white/[0.06] px-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <LogoMark size={16} />
              <span className="text-[12.5px] font-semibold tracking-[0.14em] text-white">
                CHANAKYA
              </span>
            </div>
            <div className="hidden items-center gap-1 text-[11.5px] text-white/60 sm:flex">
              <ChevronRight size={11} className="text-white/40" />
              <span>Workspace</span>
              <ChevronRight size={11} className="text-white/40" />
              <span className="text-white/72">Procurement</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="hidden items-center gap-2 rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-[5px] text-[11px] text-white/60 md:flex">
              <Search size={11} />
              <span>Search standards…</span>
              <kbd className="rounded border border-white/[0.08] bg-white/[0.03] px-1 font-mono text-[9px] text-white/72">
                ⌘K
              </kbd>
            </div>
            <div className="relative">
              <Bell size={13.5} className="text-white/72" />
              <span className="absolute -right-0.5 -top-0.5 h-[5px] w-[5px] rounded-full bg-[#4CB782]" />
            </div>
            <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-gradient-to-br from-[#4CB782] to-[#3FB8AF] text-[9.5px] font-semibold text-white">
              AK
            </div>
          </div>
        </div>

        <div className="flex">
          {/* ---------------- left sidebar ---------------- */}
          <aside className="hidden w-[196px] shrink-0 flex-col border-r border-white/[0.055] bg-white/[0.012] p-3 xl:flex">
            <nav className="flex flex-col gap-[2px]" aria-label="Workspace">
              {SIDEBAR_ITEMS.map((item, i) => {
                const Icon = SIDEBAR_ICONS[i];
                const active = "active" in item && item.active;
                return (
                  <div
                    key={item.id}
                    className={cn(
                      "flex cursor-default items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[12px] transition-colors",
                      active
                        ? "bg-white/[0.06] font-medium text-white"
                        : "text-white/72 hover:bg-white/[0.03] hover:text-white/88"
                    )}
                  >
                    <Icon
                      size={13.5}
                      className={active ? "text-white" : "text-white/60"}
                    />
                    {item.label}
                    {"count" in item && item.count ? (
                      <span className="ml-auto rounded-full border border-[#D29922]/30 bg-[#D29922]/[0.12] px-1.5 py-[1px] text-[9.5px] font-medium text-[#E5BE71]">
                        {item.count}
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </nav>
            <div className="mt-auto rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-gradient-to-br from-[#4CB782] to-[#3FB8AF] text-[9.5px] font-semibold text-white">
                  AK
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-medium text-white/88">
                    A. Kumar
                  </span>
                  <span className="text-[9.5px] text-white/60">
                    Procurement Officer
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* ---------------- main content ---------------- */}
          <div className="min-w-0 flex-1 overflow-hidden p-4 sm:p-5">
            {/* title row */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-col gap-1">
                <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-white">
                  Tender Standards Analysis
                </h3>
                <span className="font-mono text-[10.5px] text-white/60">
                  PSU/STL/2026/014 · uploaded 09:41 IST
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-[3px] text-[10.5px] text-white/72">
                  <StatusDot tone={done ? "green" : "amber"} pulse={!done} />
                  {done ? "Analysis complete" : "Analyzing"}
                </span>
                <span className="font-mono text-[10.5px] text-white/60">
                  {progressPct}%
                </span>
              </div>
            </div>

            {/* tender input card */}
            <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <div className="flex items-start gap-3">
                <div className="mt-[2px] flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03]">
                  <FileSearch size={14} className="text-[#E8824A]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] leading-[1.6] text-white/88">
                    “Supply, installation and commissioning of structural steel
                    components for public infrastructure. The contractor shall
                    ensure all materials conform to the applicable Indian
                    Standards, including design, grade selection and
                    dimensional tolerances…”
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-white/72">
                    <span>
                      <span className="text-white/60">Input language </span>
                      <span className="text-white/88">English</span>
                    </span>
                    <span>
                      <span className="text-white/60">Document type </span>
                      <span className="text-white/88">Tender specification</span>
                    </span>
                    <span>
                      <span className="text-white/60">Pages </span>
                      <span className="text-white/88">24</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="text-white/60">Status </span>
                      {done ? (
                        <span className="inline-flex items-center gap-1.5 text-[#7DD9A8]">
                          <StatusDot tone="green" /> Processed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[#E5BE71]">
                          <Loader2 size={10} className="animate-spin" /> Processing
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* processing pipeline */}
            <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] uppercase tracking-[0.12em] text-white/60">
                  Processing pipeline
                </span>
                <span className="font-mono text-[10px] text-white/60">
                  {done ? "9/9 stages" : `${activeIdx + 1}/9 · ${STEPS[Math.min(activeIdx, STEPS.length - 1)].label}`}
                </span>
              </div>
              <div className="chk-scroll-x mt-3.5 flex items-start gap-0 overflow-x-auto pb-1">
                {STEPS.map((step, i) => {
                  const state =
                    done || i < activeIdx ? "complete" : i === activeIdx ? "active" : "idle";
                  const Icon = PIPELINE_ICONS[i];
                  return (
                    <div key={step.id} className="flex shrink-0 items-center">
                      <div className="flex w-[88px] flex-col items-center gap-1.5 text-center">
                        <div
                          className={cn(
                            "flex h-[26px] w-[26px] items-center justify-center rounded-full border transition-all duration-500",
                            state === "complete" &&
                              "border-[#4CB782]/40 bg-[#4CB782]/[0.12] text-[#7DD9A8]",
                            state === "active" &&
                              "border-[#5CA8FF]/50 bg-[#5CA8FF]/[0.14] text-[#9CC8FF] shadow-[0_0_14px_rgba(92,168,255,0.35)]",
                            state === "idle" &&
                              "border-white/[0.08] bg-white/[0.02] text-white/50"
                          )}
                        >
                          <Icon size={12} />
                        </div>
                        <span
                          className={cn(
                            "text-[9px] font-medium leading-[1.3] transition-colors duration-500",
                            state === "idle" ? "text-white/60" : "text-white/88"
                          )}
                        >
                          {step.label}
                        </span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className="mb-6 h-[1px] w-[10px] shrink-0 bg-white/[0.08]" />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#5CA8FF] to-[#9CC8FF] transition-[width] duration-700 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* results */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10.5px] uppercase tracking-[0.12em] text-white/60">
                Recommended standards
              </span>
              <div className="flex flex-wrap items-center gap-2 text-[10.5px] text-white/72">
                <span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2 py-[2px]">
                  8 relevant standards
                </span>
                <span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2 py-[2px]">
                  3 compliance findings
                </span>
                <span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2 py-[2px]">
                  14 evidence sources
                </span>
              </div>
            </div>
            <div className="chk-scroll-x mt-3 flex gap-3.5 overflow-x-auto pb-2 xl:grid xl:grid-cols-3 xl:overflow-visible">
              {RECOMMENDATIONS.map((rec, i) => (
                <RecommendationCard key={rec.code} rec={rec} delay={i * 0.12} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
