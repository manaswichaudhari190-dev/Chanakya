"use client";

/**
 * CHANAKYA — Demo app (#/demo)
 * A multi-screen mock Procurement workspace: dashboard, tender analysis,
 * recommendations, standards library, compliance audit, review queue,
 * feedback and settings. Presentation only — the production frontend is
 * Streamlit + Python and is not replaced by this demo. All data is demo data.
 */

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bell,
  BookMarked,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardCheck,
  Clock,
  CornerDownLeft,
  Copy,
  Crosshair,
  Droplets,
  ExternalLink,
  Factory,
  FileSearch,
  FileStack,
  FileText,
  Flame,
  Gavel,
  HardHat,
  IndianRupee,
  Landmark,
  LayoutGrid,
  ListChecks,
  Loader2,
  MapPin,
  MessageSquare,
  Package,
  Plus,
  RotateCcw,
  ScanSearch,
  Search,
  SearchX,
  Settings2,
  ShieldCheck,
  Sparkles,
  Timer,
  TrafficCone,
  TriangleAlert,
  UserRound,
  Waypoints,
  X,
  Zap,
} from "lucide-react";
import {
  AI_METRICS,
  COMPLIANCE_MATRIX,
  DEMO_TENDERS,
  FEEDBACK_ITEMS,
  LIBRARY_STATUS,
  PIPELINE_STEPS,
  RECOMMENDATIONS,
  REVIEW_CARDS,
  SEARCH_SCENARIOS,
  SEARCH_STAGE_MS,
  SEARCH_STAGES,
  SETTINGS_SECTIONS,
  SIDEBAR_ITEMS,
  STANDARDS_LIBRARY,
  SYSTEM_FINDINGS,
} from "../data/demoData";
import type { SearchScenario, SearchedStandard, ExactMatch } from "../data/demoData";
import { Chip, ConfidenceBar, LogoMark, StatusDot } from "../primitives";
import type { View } from "../Navbar";

/* ------------------------------------------------------------------ */
/* sidebar visual map — colorful icons suited to each word             */
/* ------------------------------------------------------------------ */

const SIDEBAR_ICONS: Record<
  string,
  { Icon: typeof LayoutGrid; color: string }
> = {
  dashboard: { Icon: LayoutGrid, color: "text-[#5CA8FF]" },
  "tender-analysis": { Icon: FileSearch, color: "text-[#E8824A]" },
  recommendations: { Icon: ListChecks, color: "text-[#4CB782]" },
  standards: { Icon: BookMarked, color: "text-[#3FB8AF]" },
  compliance: { Icon: ScanSearch, color: "text-[#E5534B]" },
  review: { Icon: ClipboardCheck, color: "text-[#E5BE71]" },
  feedback: { Icon: MessageSquare, color: "text-[#E069A8]" },
  settings: { Icon: Settings2, color: "text-white/72" },
};

const STATUS_MAP = {
  complete: { label: "Complete", tone: "green" as const },
  review: { label: "In review", tone: "amber" as const },
  processing: { label: "Processing", tone: "blue" as const },
};

const STATS = [
  { label: "Tenders analyzed", value: 24, note: "this month" },
  { label: "Standards recommended", value: 117, note: "grounded" },
  { label: "Compliance findings", value: 9, note: "resolved 7" },
  { label: "Review queue", value: 4, note: "awaiting officer" },
];

/* ------------------------------------------------------------------ */
/* shared bits                                                        */
/* ------------------------------------------------------------------ */

function ScreenHeader({
  title,
  sub,
  icon: Icon,
  color,
  action,
}: {
  title: string;
  sub: string;
  icon: typeof LayoutGrid;
  color: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-2.5">
          <Icon size={16} className={color} />
          <h1 className="text-[22px] font-semibold tracking-[-0.02em] text-white">
            {title}
          </h1>
        </div>
        <p className="mt-1 text-[12.5px] text-white/72">{sub}</p>
      </div>
      {action}
    </div>
  );
}

function NewTenderButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#E5E5E6] px-4 py-2 text-[12.5px] font-medium text-[#08090A] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#F7F8F8] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)]"
    >
      <Plus size={13} />
      New tender analysis
    </button>
  );
}

/* ================================================================== */
/* SCREEN: Dashboard                                                  */
/* ================================================================== */

function DashboardScreen() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-semibold tracking-[-0.02em] text-white">
            Officer dashboard
          </h1>
          <p className="mt-1 text-[12.5px] text-white/72">
            Saturday, 27 September 2026 · Government department workspace
          </p>
        </div>
        <NewTenderButton />
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3.5 xl:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 + i * 0.08 }}
            className="chk-panel-deep p-5 transition-colors hover:border-white/[0.13]"
          >
            <span className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-white/60">
              {s.label}
            </span>
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="chk-zero font-mono text-[28px] font-semibold tracking-tight text-white">
                {s.value}
              </span>
            </div>
            <span className="mt-1 block text-[11px] text-white/60">{s.note}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.75fr_1fr]">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          aria-label="Recent tender analyses"
          className="chk-app-frame overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <span className="flex items-center gap-2 text-[13.5px] font-semibold text-white">
              <FileSearch size={14} className="text-[#E8824A]" />
              Recent tender analyses
            </span>
            <span className="chk-zero font-mono text-[10.5px] text-white/60">4 of 24</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Tender", "Date", "Standards", "Findings", "Status"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-[10px] font-medium uppercase tracking-[0.13em] text-white/60"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DEMO_TENDERS.map((t, i) => {
                  const s = STATUS_MAP[t.status];
                  return (
                    <motion.tr
                      key={t.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                      className="cursor-default border-b border-white/[0.05] transition-colors last:border-0 hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex flex-col gap-[2px]">
                          <span className="font-mono text-[11px] text-[#3FB8AF]">{t.id}</span>
                          <span className="text-[13px] text-white/88">{t.title}</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 font-mono text-[11.5px] text-white/72">
                        {t.date}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-[12.5px] text-white">
                        {t.standards}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-[12.5px] text-[#E5BE71]">
                        {t.findings}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.03] px-2.5 py-[3px] text-[10.5px] text-white/88">
                          <StatusDot
                            tone={
                              t.status === "complete"
                                ? "green"
                                : t.status === "review"
                                  ? "amber"
                                  : "blue"
                            }
                            pulse={t.status === "processing"}
                          />
                          {s.label}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.section>

        <div className="flex flex-col gap-5">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            aria-label="Recent recommendations"
            className="chk-app-frame p-5"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[13.5px] font-semibold text-white">
                <ListChecks size={14} className="text-[#7DD9A8]" />
                Latest recommendations
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-2.5">
              {RECOMMENDATIONS.map((r) => (
                <div
                  key={r.code}
                  className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-3 transition-colors hover:border-white/[0.12]"
                >
                  <div className="flex flex-col gap-[3px]">
                    <span className="font-mono text-[12px] font-medium text-white">
                      {r.code}:{r.year}
                    </span>
                    <span className="max-w-[220px] truncate text-[11px] text-white/72">
                      {r.title}
                    </span>
                  </div>
                  <span className="chk-zero font-mono text-[11.5px] text-[#7DD9D2]">
                    {r.confidence}%
                  </span>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.54 }}
            aria-label="Assistant"
            className="chk-app-frame p-5"
          >
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#5CA8FF]" />
              <span className="text-[13.5px] font-semibold text-white">Assistant</span>
              <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-[2px] text-[10px] text-white/72">
                <span className="h-[5px] w-[5px] rounded-full bg-[#4CB782] chk-pulse" />
                ready
              </span>
            </div>
            <p className="mt-3.5 text-[12.5px] leading-[1.6] text-white/72">
              “Which standards apply to welded structural steel sections for the current
              tender?”
            </p>
          </motion.section>
        </div>
      </div>
    </>
  );
}

/* ================================================================== */
/* SCREEN: Tender analysis — search-driven demo                        */
/* ================================================================== */

const SCENARIO_ICONS: Record<string, { Icon: typeof Search; color: string }> = {
  helmet: { Icon: HardHat, color: "text-[#E5BE71]" },
  road: { Icon: TrafficCone, color: "text-[#E8824A]" },
  water: { Icon: Droplets, color: "text-[#5CA8FF]" },
  construction: { Icon: Building2, color: "text-[#3FB8AF]" },
  steel: { Icon: Factory, color: "text-[#4CB782]" },
  cement: { Icon: Package, color: "text-[#7DD9A8]" },
  electrical: { Icon: Zap, color: "text-[#E5BE71]" },
  fire: { Icon: Flame, color: "text-[#E5534B]" },
};

const MATCH_TYPE = {
  exact: { label: "Exact citation", tone: "teal" as const },
  semantic: { label: "Semantic", tone: "blue" as const },
};

const CITATION_STATUS = {
  current: { label: "Current", tone: "green" as const },
  amended: { label: "Amended", tone: "amber" as const },
  superseded: { label: "Superseded", tone: "red" as const },
};

const SEARCH_TOTAL_MS = SEARCH_STAGE_MS.reduce((a, b) => a + b, 0) + 180;

function matchScenario(q: string): SearchScenario | null {
  const s = q.trim().toLowerCase();
  if (!s) return null;
  return (
    SEARCH_SCENARIOS.find((sc) => sc.keywords.some((k) => s.includes(k))) ?? null
  );
}

function TenderScreen() {
  const tender = DEMO_TENDERS[0];
  const [phase, setPhase] = useState<"idle" | "searching" | "results" | "empty">(
    "idle"
  );
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [scenario, setScenario] = useState<SearchScenario | null>(null);
  const [stageIdx, setStageIdx] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const stash = timers.current;
    return () => {
      stash.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const runSearch = (term: string) => {
    const q = term.trim();
    if (!q) {
      searchRef.current?.focus();
      return;
    }
    clearTimers();
    setQuery(q);
    setInput(q);
    setScenario(matchScenario(q));
    setStageIdx(0);
    setPhase("searching");
    let elapsed = 0;
    SEARCH_STAGE_MS.forEach((ms, i) => {
      elapsed += ms;
      timers.current.push(
        window.setTimeout(() => setStageIdx(i + 1), elapsed)
      );
    });
    timers.current.push(
      window.setTimeout(() => {
        setPhase(matchScenario(q) ? "results" : "empty");
      }, SEARCH_TOTAL_MS)
    );
  };

  const resetSearch = () => {
    clearTimers();
    setPhase("idle");
    setInput("");
    setScenario(null);
    setStageIdx(0);
    window.setTimeout(() => searchRef.current?.focus(), 0);
  };

  return (
    <>
      <ScreenHeader
        title="Tender analysis"
        sub="Search a procurement keyword — the demo runs a simulated analysis end to end"
        icon={FileSearch}
        color="text-[#E8824A]"
        action={<NewTenderButton onClick={resetSearch} />}
      />

      {/* ------- big search bar ------- */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="chk-app-frame mt-7 p-5 sm:p-6"
        aria-label="Tender search"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runSearch(input);
          }}
        >
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 transition-all duration-300 focus-within:border-[#5CA8FF]/40 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_0_4px_rgba(92,168,255,0.07)] sm:px-5">
            <Search size={19} className="shrink-0 text-[#5CA8FF]" />
            <input
              ref={searchRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search a tender requirement — try “helmet”, “road construction”, “water pipelines”…"
              aria-label="Search tender requirements"
              className="h-[52px] w-full min-w-0 bg-transparent text-[14.5px] text-white placeholder:text-white/45 focus:outline-none sm:h-[58px] sm:text-[15.5px]"
            />
            {input ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setInput("");
                  searchRef.current?.focus();
                }}
                className="shrink-0 cursor-pointer rounded-md p-1 text-white/45 transition-colors hover:text-white"
              >
                <X size={14} />
              </button>
            ) : null}
            <kbd className="chk-mono hidden shrink-0 items-center gap-1 rounded-md border border-white/[0.08] bg-white/[0.03] px-1.5 py-[3px] text-[9.5px] text-white/72 sm:flex">
              <CornerDownLeft size={9} />
              Enter
            </kbd>
          </div>
        </form>

        {/* demo keywords */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-0.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/45">
            Try
          </span>
          {SEARCH_SCENARIOS.map((sc) => {
            const { Icon, color } = SCENARIO_ICONS[sc.id] ?? {
              Icon: Search,
              color: "text-white/45",
            };
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => runSearch(sc.label)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-[6px] text-[11.5px] text-white/72 transition-all duration-200 hover:-translate-y-[1px] hover:border-white/[0.16] hover:bg-white/[0.05] hover:text-white"
              >
                <Icon size={12} className={color} />
                {sc.label}
              </button>
            );
          })}
        </div>
      </motion.section>

      {/* ------- idle: currently loaded demo tender ------- */}
      {phase === "idle" ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-4 flex flex-wrap items-center gap-2 text-[11.5px] text-white/50"
          >
            <StatusDot tone="green" />
            Currently loaded:
            <span className="chk-mono text-white/72">{tender.id}</span>
            <span className="text-white/30">·</span>
            analysed 26 Sep 2026
            <span className="text-white/30">·</span>
            <span className="chk-zero font-mono">{AI_METRICS[0].value} requirements extracted</span>
          </motion.div>

          {/* pipeline */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="chk-app-frame mt-5 p-5"
            aria-label="Processing pipeline"
          >
            <div className="flex items-center gap-2">
              <Waypoints size={14} className="text-[#5CA8FF]" />
              <span className="text-[13.5px] font-semibold text-white">Processing pipeline</span>
              <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-[2px] text-[10px] text-white/72">
                <StatusDot tone="green" />
                complete
              </span>
            </div>
            <div className="chk-scroll-x mt-4 flex gap-2 overflow-x-auto pb-1">
              {PIPELINE_STEPS.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.07 }}
                  className="flex min-w-[150px] shrink-0 flex-col gap-1 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2.5"
                >
                  <span className="chk-zero font-mono text-[9px] text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[12px] font-medium text-white/88">{p.label}</span>
                  <span className="text-[10px] leading-[1.4] text-white/55">{p.detail}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* findings + extraction metrics */}
          <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_1.25fr]">
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="chk-app-frame p-5"
              aria-label="Extraction metrics"
            >
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-[#5CA8FF]" />
                <span className="text-[13.5px] font-semibold text-white">Extraction metrics</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {AI_METRICS.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }}
                    className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3"
                  >
                    <span className="chk-zero block font-mono text-[19px] font-semibold tabular-nums text-white">
                      {m.value}
                      {m.suffix}
                    </span>
                    <span className="mt-1 block text-[9.5px] font-medium uppercase leading-[1.4] tracking-[0.08em] text-white/55">
                      {m.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.34 }}
              className="chk-app-frame p-5"
              aria-label="Gap findings"
            >
              <div className="flex items-center gap-2">
                <ScanSearch size={14} className="text-[#E5534B]" />
                <span className="text-[13.5px] font-semibold text-white">Gap findings</span>
                <span className="ml-auto chk-zero font-mono text-[10.5px] text-white/60">
                  {SYSTEM_FINDINGS.length} findings
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                {SYSTEM_FINDINGS.map((f, i) => (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                    className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-3"
                  >
                    <StatusDot
                      tone={
                        f.status === "present"
                          ? "green"
                          : f.status === "outdated"
                            ? "red"
                            : f.status === "missing"
                              ? "red"
                              : "amber"
                      }
                    />
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/50">
                        {f.label}
                      </span>
                      <span className="text-[12.5px] leading-[1.5] text-white/80">{f.text}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </>
      ) : null}

      {/* ------- searching: simulated pipeline ------- */}
      {phase === "searching" ? (
        <motion.section
          key="searching"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="chk-app-frame mt-6 p-5 sm:p-6"
          aria-label="Search in progress"
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <Loader2 size={15} className="animate-spin text-[#5CA8FF]" />
            <span className="text-[14px] font-semibold text-white">
              Analysing “{query}”
            </span>
            <span className="chk-zero chk-mono ml-auto rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-[2px] text-[10px] tabular-nums text-white/60">
              {Math.min(stageIdx + 1, SEARCH_STAGES.length)}/{SEARCH_STAGES.length}
            </span>
          </div>

          <div className="mt-5 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.08]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#5CA8FF] to-[#3FB8AF]"
              initial={{ width: "4%" }}
              animate={{
                width: `${(stageIdx / SEARCH_STAGES.length) * 100}%`,
              }}
              transition={{ duration: 0.45, ease: [0.21, 0.6, 0.35, 1] }}
            />
          </div>

          <div className="mt-5 flex flex-col gap-2">
            {SEARCH_STAGES.map((s, i) => {
              const done = i < stageIdx;
              const active = i === stageIdx;
              return (
                <div
                  key={s.label}
                  className={[
                    "flex items-center gap-3 rounded-lg border px-3.5 py-2.5 transition-colors duration-300",
                    active
                      ? "border-[#5CA8FF]/25 bg-[#5CA8FF]/[0.06]"
                      : "border-white/[0.06] bg-white/[0.02]",
                  ].join(" ")}
                >
                  {done ? (
                    <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#4CB782]/[0.15]">
                      <Check size={10} className="text-[#7DD9A8]" />
                    </span>
                  ) : active ? (
                    <Loader2 size={14} className="shrink-0 animate-spin text-[#5CA8FF]" />
                  ) : (
                    <span className="chk-zero chk-mono flex h-[18px] w-[18px] shrink-0 items-center justify-center text-[9px] text-white/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                  <div className="flex min-w-0 flex-col">
                    <span
                      className={
                        done || active
                          ? "text-[12.5px] font-medium text-white/88"
                          : "text-[12.5px] font-medium text-white/55"
                      }
                    >
                      {s.label}
                    </span>
                    <span className="text-[10.5px] leading-[1.4] text-white/45">
                      {s.detail}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>
      ) : null}

      {/* ------- empty: no demo scenario matched ------- */}
      {phase === "empty" ? (
        <motion.section
          key="empty"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="chk-app-frame mt-6 p-10 text-center"
          aria-label="No results"
        >
          <SearchX size={22} className="mx-auto text-white/40" />
          <p className="mt-3 text-[14.5px] font-semibold text-white">
            No tender in the demo data matches “{query}”
          </p>
          <p className="mx-auto mt-1.5 max-w-[460px] text-[12.5px] leading-[1.6] text-white/60">
            This demo indexes eight sample procurement scenarios. Pick one of the
            keyword chips above, or try a term like “helmet”, “road
            construction” or “water pipelines”.
          </p>
        </motion.section>
      ) : null}

      {/* ------- results ------- */}
      {phase === "results" && scenario ? (
        <SearchResults
          scenario={scenario}
          query={query}
          onNewSearch={resetSearch}
        />
      ) : null}
    </>
  );
}

/* ---- citation ↔ standard matching (code-level heuristic) ---- */

function exactMatchesStandard(m: ExactMatch, s: SearchedStandard): boolean {
  const base = s.code.split(" (")[0];
  const hit = m.citation.includes(base) || m.resolvedTo.includes(base);
  if (!hit) return false;
  const part = s.code.match(/Part\s*\d+/)?.[0];
  if (!part) return true;
  const mPart = `${m.citation} ${m.resolvedTo}`.match(/Part\s*\d+/)?.[0];
  return !mPart || mPart === part;
}

/* ---- search result sections ---- */

function SearchResults({
  scenario,
  query,
  onNewSearch,
}: {
  scenario: SearchScenario;
  query: string;
  onNewSearch: () => void;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const totalHits = scenario.documents.reduce((a, d) => a + d.matches, 0);
  const maxDocHits = Math.max(...scenario.documents.map((d) => d.matches), 1);
  const t = scenario.tender;
  const procRows: [string, string][] = [
    ["Method", t.method],
    ["Contract type", t.contractType],
    ["Evaluation", t.evaluation],
    ["Payment terms", t.payment],
    ["Category", t.category],
    ["Tender ID", t.id],
  ];

  return (
    <>
      {/* result recap */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mt-6 flex flex-wrap items-center gap-3"
      >
        <p className="text-[13.5px] text-white/72">
          Results for <span className="font-semibold text-white">“{query}”</span>
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          <Chip tone="teal">{scenario.standards.length} standards</Chip>
          <Chip tone="blue">{scenario.documents.length} documents</Chip>
          <Chip tone="amber">{scenario.exactMatches.length} exact citations</Chip>
          <span className="chk-zero chk-mono inline-flex items-center gap-1 text-[10.5px] text-white/50">
            <Timer size={10} />
            {(SEARCH_TOTAL_MS / 1000).toFixed(1)} s
          </span>
        </div>
        <button
          onClick={onNewSearch}
          className="ml-auto inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1.5 text-[11.5px] text-white/72 transition-all hover:border-white/[0.16] hover:text-white"
        >
          <RotateCcw size={11} />
          New search
        </button>
      </motion.div>

      {/* matched standards + tender summary */}
      <div className="mt-4 grid gap-5 xl:grid-cols-[1.35fr_1fr]">
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="chk-app-frame p-5"
          aria-label="Matched Indian Standards"
        >
          <div className="flex items-center gap-2">
            <BookMarked size={14} className="text-[#3FB8AF]" />
            <span className="text-[13.5px] font-semibold text-white">
              Matched Indian Standards
            </span>
            <span className="chk-zero chk-mono ml-auto shrink-0 whitespace-nowrap text-[10.5px] text-white/60">
              {scenario.standards.length} codes · click for details
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2.5">
            {scenario.standards.map((s, i) => {
              const mt = MATCH_TYPE[s.matchType];
              const st = CITATION_STATUS[s.status];
              return (
                <motion.button
                  type="button"
                  key={s.code}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.06 }}
                  onClick={() => setOpenIdx(i)}
                  aria-haspopup="dialog"
                  aria-label={`View record for ${s.code}`}
                  className="group w-full cursor-pointer rounded-lg border border-white/[0.07] bg-white/[0.02] p-4 text-left transition-all duration-200 hover:-translate-y-[1px] hover:border-white/[0.15] hover:bg-white/[0.04] focus-visible:border-[#5CA8FF]/50 focus-visible:outline-none"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chk-mono text-[12.5px] font-semibold text-white">
                      {s.code}
                      <span className="text-white/45">:{s.year}</span>
                    </span>
                    <Chip tone={mt.tone}>{mt.label}</Chip>
                    <Chip tone={st.tone}>{st.label}</Chip>
                    {s.detail.qco ? (
                      <Chip tone="amber" dot>
                        QCO
                      </Chip>
                    ) : null}
                    <span className="chk-zero chk-mono ml-auto text-[11px] tabular-nums text-white/60">
                      {s.confidence}%
                    </span>
                  </div>
                  <span className="mt-1.5 block text-[13px] font-medium leading-snug text-white/88">
                    {s.title}
                  </span>
                  <span className="mt-1 block text-[11.5px] leading-[1.5] text-white/55">
                    {s.note}
                  </span>
                  <div className="mt-2.5 flex items-center gap-2.5">
                    <ConfidenceBar value={s.confidence} className="max-w-[200px]" />
                    <span className="text-[9.5px] uppercase tracking-[0.08em] text-white/40">
                      relevance
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1 text-[10.5px] font-medium text-[#9CC8FF] opacity-0 transition-opacity duration-200 group-focus-visible:opacity-100 group-hover:opacity-100">
                      Details
                      <ChevronRight size={11} />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14 }}
          className="chk-app-frame p-5"
          aria-label="Tender dossier"
        >
          <div className="flex items-center gap-2">
            <Landmark size={14} className="text-[#E8824A]" />
            <span className="text-[13.5px] font-semibold text-white">
              Tender dossier
            </span>
            <Chip tone="blue" dot>
              AI-drafted
            </Chip>
            <span className="ml-auto chk-zero chk-mono hidden text-[9.5px] uppercase tracking-[0.08em] text-white/40 sm:block">
              structured summary
            </span>
          </div>

          <h3 className="mt-3.5 text-[15.5px] font-semibold leading-snug tracking-[-0.01em] text-white">
            {t.title}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11.5px] text-white/55">
            <span className="inline-flex items-center gap-1">
              <MapPin size={11} className="shrink-0 text-[#5CA8FF]" />
              {t.location}
            </span>
            <span className="text-white/25">·</span>
            <span className="min-w-0 truncate">{t.authority}</span>
          </div>

          <DossierLabel icon={FileText}>Scope of work</DossierLabel>
          <p className="mt-2 text-[12px] leading-[1.6] text-white/72">{t.scope}</p>

          {/* key figures */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
              <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/45">
                <IndianRupee size={9} className="text-[#4CB782]" />
                Est. value
              </span>
              <span className="chk-zero chk-mono mt-1 block text-[12.5px] text-white/88">
                {t.value}
              </span>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
              <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/45">
                <ShieldCheck size={9} className="text-[#E5BE71]" />
                EMD
              </span>
              <span className="chk-zero chk-mono mt-1 block text-[12.5px] text-white/88">
                {t.emd}
              </span>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
              <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/45">
                <Clock size={9} className="text-[#5CA8FF]" />
                Completion
              </span>
              <span className="mt-1 block text-[12px] text-white/88">
                {t.completion}
              </span>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
              <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/45">
                <FileText size={9} className="text-[#3FB8AF]" />
                Pages
              </span>
              <span className="chk-zero chk-mono mt-1 block text-[12.5px] text-white/88">
                {t.pages} pp · {totalHits} hits
              </span>
            </div>
          </div>

          {/* procurement details */}
          <DossierLabel icon={Gavel}>Procurement details</DossierLabel>
          <div className="mt-2.5 flex flex-col divide-y divide-white/[0.05] rounded-lg border border-white/[0.06] bg-white/[0.02]">
            {procRows.map(([k, v]) => (
              <div
                key={k}
                className="flex flex-col gap-[2px] px-3.5 py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <dt className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/45">
                  {k}
                </dt>
                <dd className="text-[12px] font-medium text-white/85 sm:text-right">
                  {v}
                </dd>
              </div>
            ))}
          </div>

          {/* key dates timeline */}
          <DossierLabel icon={CalendarDays}>Key dates</DossierLabel>
          <div className="mt-3 flex flex-col gap-3">
            {t.timeline.map((d, i) => (
              <div key={d.label} className="relative flex items-center gap-3">
                {i < t.timeline.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute left-[4.5px] top-[14px] -bottom-3 w-px bg-white/[0.09]"
                  />
                ) : null}
                <span
                  className={`relative z-10 flex h-[10px] w-[10px] shrink-0 items-center justify-center rounded-full border ${
                    d.done
                      ? "border-[#4CB782] bg-[#4CB782]/[0.25]"
                      : "border-[#D29922] bg-[#D29922]/[0.12]"
                  }`}
                >
                  {d.done ? (
                    <span className="h-[4px] w-[4px] rounded-full bg-[#4CB782]" />
                  ) : null}
                </span>
                <span className="flex-1 text-[12px] text-white/80">
                  {d.label}
                  {d.done ? (
                    <span className="ml-1.5 text-[9.5px] uppercase tracking-[0.08em] text-[#4CB782]">
                      done
                    </span>
                  ) : null}
                </span>
                <span
                  className={`chk-zero chk-mono text-[11px] tabular-nums ${
                    d.done ? "text-white/55" : "text-[#E5BE71]"
                  }`}
                >
                  {d.date}
                </span>
              </div>
            ))}
          </div>

          {/* scope highlights */}
          <DossierLabel icon={Sparkles}>Scope highlights</DossierLabel>
          <ul className="mt-2.5 flex flex-col gap-1.5">
            {t.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5">
                <span className="mt-[3px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full bg-[#3FB8AF]/[0.12]">
                  <Check size={9} className="text-[#7DD9D2]" />
                </span>
                <span className="text-[12px] leading-[1.5] text-white/78">{h}</span>
              </li>
            ))}
          </ul>

          {/* eligibility */}
          <DossierLabel icon={ShieldCheck}>Eligibility & qualification</DossierLabel>
          <ul className="mt-2.5 flex flex-col gap-1.5">
            {t.qualification.map((q) => (
              <li key={q} className="flex items-start gap-2.5">
                <BadgeCheck size={13} className="mt-[2px] shrink-0 text-[#7DD9A8]" />
                <span className="text-[12px] leading-[1.5] text-white/78">{q}</span>
              </li>
            ))}
          </ul>

          {/* analysis flags */}
          <DossierLabel icon={TriangleAlert}>Analysis flags</DossierLabel>
          <ul className="mt-2.5 flex flex-col gap-2">
            {t.riskNotes.map((r) => (
              <li
                key={r}
                className="flex items-start gap-2.5 rounded-lg border border-[#D29922]/20 bg-[#D29922]/[0.06] px-3 py-2.5"
              >
                <TriangleAlert size={13} className="mt-[1px] shrink-0 text-[#E5BE71]" />
                <span className="text-[11.5px] leading-[1.5] text-[#E5BE71]/85">{r}</span>
              </li>
            ))}
          </ul>

          {/* contact */}
          <div className="mt-5 border-t border-white/[0.06] pt-4">
            <div className="flex items-start gap-3">
              <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-white/[0.05]">
                <UserRound size={14} className="text-white/60" />
              </span>
              <div className="flex min-w-0 flex-col gap-[3px]">
                <span className="text-[12px] font-medium text-white/88">
                  {t.officer}
                </span>
                <span className="chk-zero chk-mono break-words text-[10.5px] text-white/55">
                  {t.officerPhone} · {t.officerEmail}
                </span>
              </div>
              <span className="mt-[5px] hidden sm:inline-block">
                <StatusDot tone="green" pulse />
              </span>
            </div>
          </div>
        </motion.section>
      </div>

      {/* documents analysed + exact matches */}
      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1.35fr]">
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="chk-app-frame p-5"
          aria-label="Documents analysed"
        >
          <div className="flex items-center gap-2">
            <FileStack size={14} className="text-[#5CA8FF]" />
            <span className="text-[13.5px] font-semibold text-white">
              Documents analysed
            </span>
            <span className="chk-zero chk-mono ml-auto text-[10.5px] text-white/60">
              {scenario.tender.pages} pp · {totalHits} hits
            </span>
          </div>
          <div className="mt-2 flex flex-col divide-y divide-white/[0.05]">
            {scenario.documents.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.28 + i * 0.07 }}
                className="flex items-center gap-3 py-3"
              >
                <FileText size={13} className="shrink-0 text-white/45" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-medium text-white/88">
                    {d.name}
                  </p>
                  <div className="mt-[3px] flex items-center gap-2">
                    <span className="text-[9.5px] uppercase tracking-[0.08em] text-white/45">
                      {d.type}
                    </span>
                    <span className="chk-zero chk-mono text-[10px] text-white/45">
                      {d.pages} pp
                    </span>
                  </div>
                </div>
                <div className="hidden w-[110px] shrink-0 sm:block">
                  <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/[0.08]">
                    <motion.div
                      className="h-full rounded-full bg-[#5CA8FF]"
                      initial={{ width: "0%" }}
                      animate={{ width: `${(d.matches / maxDocHits) * 100}%` }}
                      transition={{ duration: 0.6, delay: 0.35 + i * 0.07 }}
                    />
                  </div>
                </div>
                <span className="chk-zero chk-mono w-[46px] shrink-0 text-right text-[11px] tabular-nums text-white/60">
                  {d.matches} hits
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.26 }}
          className="chk-app-frame p-5"
          aria-label="Exact matches in tender"
        >
          <div className="flex items-center gap-2">
            <Crosshair size={14} className="text-[#3FB8AF]" />
            <span className="text-[13.5px] font-semibold text-white">
              Exact matches in tender
            </span>
            <span className="chk-zero chk-mono ml-auto text-[10.5px] text-white/60">
              {scenario.exactMatches.length} citations
            </span>
          </div>
          <p className="mt-1.5 text-[11px] leading-[1.5] text-white/50">
            Standards cited verbatim in the tender text, resolved against the
            catalogue record. Click a resolved code to open its record.
          </p>
          <div className="mt-3.5 flex flex-col gap-2">
            {scenario.exactMatches.map((m, i) => {
              const st = CITATION_STATUS[m.status];
              const linkedIdx = scenario.standards.findIndex((s) =>
                exactMatchesStandard(m, s)
              );
              const linked = linkedIdx >= 0;
              return (
                <motion.div
                  key={m.citation}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.32 + i * 0.07 }}
                  onClick={linked ? () => setOpenIdx(linkedIdx) : undefined}
                  role={linked ? "button" : undefined}
                  tabIndex={linked ? 0 : undefined}
                  onKeyDown={
                    linked
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setOpenIdx(linkedIdx);
                          }
                        }
                      : undefined
                  }
                  aria-label={linked ? `Open record for ${m.resolvedTo}` : undefined}
                  className={[
                    "group rounded-lg border border-white/[0.07] bg-white/[0.02] px-3.5 py-3 transition-all duration-200",
                    linked
                      ? "cursor-pointer hover:-translate-y-[1px] hover:border-white/[0.15] hover:bg-white/[0.04] focus-visible:border-[#5CA8FF]/50 focus-visible:outline-none"
                      : "",
                  ].join(" ")}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chk-mono text-[11.5px] text-white/72">
                      {m.citation}
                    </span>
                    <ArrowRight size={11} className="text-white/40" />
                    <span className="chk-mono text-[12px] font-semibold text-white">
                      {m.resolvedTo}
                    </span>
                    {linked ? (
                      <ChevronRight
                        size={12}
                        className="hidden text-[#9CC8FF] opacity-0 transition-opacity duration-200 group-focus-visible:opacity-100 group-hover:opacity-100 sm:block"
                      />
                    ) : null}
                    <Chip tone={st.tone} className="ml-auto">
                      {st.label}
                    </Chip>
                  </div>
                  <p className="mt-1.5 text-[11.5px] leading-[1.5] text-white/55">
                    {m.note}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      </div>

      {/* standard detail drawer */}
      <AnimatePresence>
        {openIdx !== null && scenario.standards[openIdx] ? (
          <StandardDrawer
            key={`${scenario.id}-${scenario.standards[openIdx].code}`}
            scenario={scenario}
            std={scenario.standards[openIdx]}
            onClose={() => setOpenIdx(null)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

/* ---- small label used inside the dossier ---- */

function DossierLabel({
  icon: Icon,
  children,
}: {
  icon: typeof Landmark;
  children: ReactNode;
}) {
  return (
    <div className="mt-5 flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/45">
      <Icon size={11} className="text-white/55" />
      {children}
    </div>
  );
}

/* ---- standard detail drawer (slide-over record) ---- */

function VersionRow({
  k,
  v,
  tone,
}: {
  k: string;
  v: string;
  tone?: "red" | "amber";
}) {
  return (
    <div className="flex flex-col gap-[3px] px-3.5 py-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/45">
        {k}
      </dt>
      <dd
        className={`text-[12px] font-medium ${
          tone === "red"
            ? "text-[#F0918B]"
            : tone === "amber"
              ? "text-[#E5BE71]"
              : "text-white/85"
        }`}
      >
        {v}
      </dd>
    </div>
  );
}

function StandardDrawer({
  scenario,
  std,
  onClose,
}: {
  scenario: SearchScenario;
  std: SearchedStandard;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | null>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
    };
  }, [onClose]);

  const d = std.detail;
  const st = CITATION_STATUS[std.status];
  const mt = MATCH_TYPE[std.matchType];
  const cites = scenario.exactMatches.filter((m) => exactMatchesStandard(m, std));
  const catalogueUrl =
    d.publisher === "Bureau of Indian Standards"
      ? "https://www.bis.gov.in"
      : "https://irc.nic.in";

  const copyCitation = async () => {
    try {
      await navigator.clipboard.writeText(`${std.code}:${std.year} — ${std.title}`);
      setCopied(true);
      copyTimer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — demo context */
    }
  };

  return (
    <>
      <motion.div
        key="std-backdrop"
        className="fixed inset-0 z-[80] bg-black/55 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
        aria-hidden
      />
      <motion.aside
        key="std-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`Standard record — ${std.code}`}
        className="fixed inset-y-0 right-0 z-[85] flex w-full max-w-[540px] flex-col border-l border-white/[0.08] bg-[#0D0E10] shadow-[-24px_0_60px_rgba(0,0,0,0.45)]"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* header */}
        <div className="flex items-center gap-2.5 border-b border-white/[0.07] px-5 py-4">
          <BookMarked size={14} className="text-[#3FB8AF]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
            Standard record
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close standard details"
            autoFocus
            className="ml-auto cursor-pointer rounded-md p-1.5 text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <X size={15} />
          </button>
        </div>

        {/* body */}
        <div className="flex-1 overflow-y-auto px-5 pb-6">
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="chk-mono text-[15px] font-semibold text-white">
              {std.code}
              <span className="text-white/45">:{std.year}</span>
            </span>
            <Chip tone={st.tone}>{st.label}</Chip>
            <Chip tone={mt.tone}>{mt.label}</Chip>
          </div>
          <h3 className="mt-2 text-[15px] font-semibold leading-snug tracking-[-0.01em] text-white">
            {std.title}
          </h3>

          {/* meta grid */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
              <span className="block text-[9px] font-semibold uppercase tracking-[0.12em] text-white/45">
                Publisher
              </span>
              <span className="mt-1 block text-[11.5px] leading-snug text-white/85">
                {d.publisher}
              </span>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
              <span className="block text-[9px] font-semibold uppercase tracking-[0.12em] text-white/45">
                ICS classification
              </span>
              <span className="chk-zero chk-mono mt-1 block text-[11.5px] text-white/85">
                {d.ics}
              </span>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
              <span className="block text-[9px] font-semibold uppercase tracking-[0.12em] text-white/45">
                Document length
              </span>
              <span className="chk-zero chk-mono mt-1 block text-[11.5px] text-white/85">
                {d.docPages} pages
              </span>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
              <span className="block text-[9px] font-semibold uppercase tracking-[0.12em] text-white/45">
                Quality control
              </span>
              <span
                className={`mt-1 block text-[11.5px] ${
                  d.qco ? "text-[#E5BE71]" : "text-white/85"
                }`}
              >
                {d.qco ? "QCO — mandatory" : "Not under a QCO"}
              </span>
            </div>
          </div>
          {d.qcoNote ? (
            <p className="mt-2 text-[11px] leading-[1.55] text-[#E5BE71]/75">
              {d.qcoNote}
            </p>
          ) : null}

          {/* why matched */}
          <div className="mt-5 rounded-lg border border-[#5CA8FF]/20 bg-[#5CA8FF]/[0.05] px-3.5 py-3">
            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#9CC8FF]">
              Why matched in this tender
            </span>
            <p className="mt-1.5 text-[12px] leading-[1.55] text-white/80">{std.note}</p>
            <div className="mt-2.5 flex items-center gap-2.5">
              <ConfidenceBar
                value={std.confidence}
                className="max-w-[220px]"
                barClassName="bg-gradient-to-r from-[#5CA8FF] to-[#3FB8AF]"
              />
              <span className="chk-zero chk-mono text-[11px] tabular-nums text-white/70">
                {std.confidence}% relevance
              </span>
            </div>
          </div>

          {/* abstract */}
          <span className="mt-5 block text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/45">
            Abstract
          </span>
          <p className="mt-2 text-[12.5px] leading-[1.65] text-white/78">{d.scope}</p>

          {/* key clauses */}
          <span className="mt-5 block text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/45">
            Key clauses
          </span>
          <div className="mt-2.5 flex flex-col gap-2">
            {d.clauses.map((c) => (
              <div
                key={c.ref}
                className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5"
              >
                <span className="chk-mono text-[10.5px] font-semibold text-[#7DD9D2]">
                  {c.ref}
                </span>
                <p className="mt-1 text-[12px] leading-[1.55] text-white/75">{c.text}</p>
              </div>
            ))}
          </div>

          {/* version & alignment */}
          <span className="mt-5 block text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/45">
            Version & alignment
          </span>
          <div className="mt-2.5 flex flex-col divide-y divide-white/[0.05] rounded-lg border border-white/[0.06] bg-white/[0.02]">
            {d.supersedes ? <VersionRow k="Supersedes" v={d.supersedes} /> : null}
            {d.supersededBy ? (
              <VersionRow k="Superseded by" v={d.supersededBy} tone="red" />
            ) : null}
            {d.amendment ? (
              <VersionRow k="Amendments" v={d.amendment} tone="amber" />
            ) : null}
            {d.isoAligned ? <VersionRow k="ISO / IEC" v={d.isoAligned} /> : null}
            {!d.supersedes &&
            !d.supersededBy &&
            !d.amendment &&
            !d.isoAligned ? (
              <VersionRow k="Status" v="Referenced edition active" />
            ) : null}
          </div>

          {/* cited in this tender */}
          <span className="mt-5 block text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/45">
            Cited in this tender
          </span>
          {cites.length ? (
            <div className="mt-2.5 flex flex-col gap-2">
              {cites.map((m) => {
                const cst = CITATION_STATUS[m.status];
                return (
                  <div
                    key={m.citation}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="chk-mono text-[11.5px] text-white/72">
                        {m.citation}
                      </span>
                      <ArrowRight size={11} className="text-white/40" />
                      <span className="chk-mono text-[12px] font-semibold text-white">
                        {m.resolvedTo}
                      </span>
                      <Chip tone={cst.tone} className="ml-auto">
                        {cst.label}
                      </Chip>
                    </div>
                    <p className="mt-1.5 text-[11.5px] leading-[1.5] text-white/55">
                      {m.note}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="mt-2.5 rounded-lg border border-dashed border-white/[0.1] bg-white/[0.015] px-3.5 py-3 text-[12px] leading-[1.55] text-white/55">
              No verbatim citation of {std.code} in the tender text — matched
              semantically from the scope and annexures.
            </p>
          )}
        </div>

        {/* footer */}
        <div className="flex flex-wrap items-center gap-2.5 border-t border-white/[0.07] px-5 py-4">
          <button
            type="button"
            onClick={copyCitation}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 py-2 text-[11.5px] font-medium text-white/80 transition-all hover:border-white/[0.18] hover:text-white"
          >
            {copied ? (
              <Check size={12} className="text-[#7DD9A8]" />
            ) : (
              <Copy size={12} />
            )}
            {copied ? "Citation copied" : "Copy citation"}
          </button>
          <a
            href={catalogueUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#5CA8FF]/25 bg-[#5CA8FF]/[0.08] px-3.5 py-2 text-[11.5px] font-medium text-[#9CC8FF] transition-all hover:border-[#5CA8FF]/45 hover:bg-[#5CA8FF]/[0.14]"
          >
            View in catalogue
            <ExternalLink size={11} />
          </a>
        </div>
      </motion.aside>
    </>
  );
}

/* ================================================================== */
/* SCREEN: Recommendations                                            */
/* ================================================================== */

function RecommendationsScreen() {
  return (
    <>
      <ScreenHeader
        title="Recommendations"
        sub={`${tender0()} · ranked by confidence · evidence attached to every card`}
        icon={ListChecks}
        color="text-[#4CB782]"
        action={<NewTenderButton />}
      />
      <div className="mt-7 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {RECOMMENDATIONS.map((r, i) => (
          <motion.article
            key={r.code}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.09 }}
            className="chk-panel-deep flex flex-col p-5 transition-all duration-300 hover:-translate-y-[2px] hover:border-white/[0.14]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-[3px]">
                <span className="font-mono text-[13px] font-semibold text-white">
                  {r.code}:{r.year}
                </span>
                <span className="max-w-[380px] text-[12.5px] leading-[1.5] text-white/72">
                  {r.title}
                </span>
              </div>
              {r.tag ? <Chip tone={r.tag === "Primary" ? "blue" : "teal"}>{r.tag}</Chip> : null}
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-[10.5px] text-white/60">
                <span className="uppercase tracking-[0.12em]">Confidence</span>
                <span className="chk-zero font-mono text-[11.5px] text-[#7DD9D2]">
                  {r.confidence}%
                </span>
              </div>
              <div className="mt-2">
                <ConfidenceBar value={r.confidence} />
              </div>
            </div>

            <p className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 text-[12px] leading-[1.55] text-white/72">
              <span className="font-medium text-white/88">Matched — </span>
              {r.matchedBecause}
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { k: "Edition", v: r.currentEdition },
                { k: "Amendment", v: r.amendmentStatus },
                { k: "Certification", v: r.certification },
              ].map((m) => (
                <div
                  key={m.k}
                  className="flex flex-col gap-1 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-2"
                >
                  <span className="text-[9px] font-medium uppercase tracking-[0.1em] text-white/45">
                    {m.k}
                  </span>
                  <span className="text-[10.5px] leading-[1.3] text-white/80">{m.v}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between pt-4">
              <span className="text-[10px] text-white/45">{r.evidence}</span>
              <div className="flex gap-1.5">
                <button className="cursor-pointer rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-[5px] text-[10.5px] text-white/85 transition-colors hover:border-white/[0.2] hover:text-white">
                  View details
                </button>
                <button className="cursor-pointer rounded-full border border-[#4CB782]/30 bg-[#4CB782]/[0.12] px-3 py-[5px] text-[10.5px] font-medium text-[#7DD9A8] transition-colors hover:border-[#4CB782]/50">
                  Accept
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </>
  );
}

function tender0() {
  return DEMO_TENDERS[0].id;
}

/* ================================================================== */
/* SCREEN: Standards library                                          */
/* ================================================================== */

function StandardsScreen() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return STANDARDS_LIBRARY;
    return STANDARDS_LIBRARY.filter(
      (r) =>
        r.code.toLowerCase().includes(s) ||
        r.title.toLowerCase().includes(s) ||
        r.sector.toLowerCase().includes(s),
    );
  }, [q]);

  return (
    <>
      <ScreenHeader
        title="Standards library"
        sub={`${STANDARDS_LIBRARY.length} records synced from the BIS catalogue · last verified 27 Sep 2026`}
        icon={BookMarked}
        color="text-[#3FB8AF]"
      />
      <div className="relative mt-6 max-w-[380px]">
        <Search size={13} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter standards…"
          aria-label="Filter standards"
          className="h-9 w-full cursor-text rounded-lg border border-white/[0.09] bg-white/[0.03] pl-8 pr-3 text-[12.5px] text-white placeholder:text-white/40 outline-none transition-all focus:border-[#3FB8AF]/50"
        />
      </div>

      <div className="chk-app-frame mt-5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Standard", "Sector", "Status", "References", "QCO", "Action"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-[10px] font-medium uppercase tracking-[0.13em] text-white/60"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => {
                const st = LIBRARY_STATUS[r.status];
                return (
                  <motion.tr
                    key={r.code}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35, delay: 0.05 * i }}
                    className="border-b border-white/[0.05] transition-colors last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex flex-col gap-[2px]">
                        <span className="font-mono text-[12px] font-medium text-[#7DD9D2]">
                          {r.code}:{r.year}
                        </span>
                        <span className="max-w-[360px] truncate text-[12.5px] text-white/80">
                          {r.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-[12px] text-white/72">{r.sector}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5">
                        <StatusDot tone={st.tone} />
                        <span className="text-[12px] text-white/85">{st.label}</span>
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="chk-zero font-mono text-[12px] text-white/72">
                        {r.references}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {r.qco ? (
                        <Chip tone="amber">QCO</Chip>
                      ) : (
                        <span className="text-[12px] text-white/40">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <button className="inline-flex cursor-pointer items-center gap-1 text-[11.5px] text-white/60 transition-colors hover:text-white">
                        Open
                        <ChevronRight size={11} />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="px-5 py-8 text-center text-[13px] text-white/55">
            No standards match your filter.
          </p>
        )}
      </div>
    </>
  );
}

/* ================================================================== */
/* SCREEN: Compliance audit                                           */
/* ================================================================== */

function AuditScreen() {
  return (
    <>
      <ScreenHeader
        title="Compliance audit"
        sub="Deterministic checks on every standards reference · recorded, not inferred"
        icon={ScanSearch}
        color="text-[#E5534B]"
        action={
          <button className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2 text-[12.5px] font-medium text-white/88 transition-all hover:border-white/[0.2]">
            <RotateCcw size={13} />
            Re-run audit
          </button>
        }
      />

      <div className="mt-7 grid gap-5 xl:grid-cols-[1.3fr_1fr]">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="chk-app-frame overflow-hidden"
          aria-label="Requirement coverage matrix"
        >
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <span className="flex items-center gap-2 text-[13.5px] font-semibold text-white">
              <Landmark size={14} className="text-[#E5BE71]" />
              Requirement coverage
            </span>
            <span className="chk-zero font-mono text-[10.5px] text-white/60">
              2 of 4 verified
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Requirement", "Tender cites", "Recommended", "Status"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-[10px] font-medium uppercase tracking-[0.13em] text-white/60"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPLIANCE_MATRIX.map((row, i) => (
                  <motion.tr
                    key={row.requirement}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                    className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3.5 text-[12.5px] text-white/85">
                      {row.requirement}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[12px] text-[#3FB8AF]">
                      {row.tender}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[12px] text-white/80">
                      {row.recommendation}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5">
                        <StatusDot tone={row.status === "verified" ? "green" : "red"} />
                        <span className="text-[12px] text-white/85">
                          {row.status === "verified" ? "Verified" : "Gap"}
                        </span>
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="chk-app-frame p-5"
          aria-label="Audit findings"
        >
          <div className="flex items-center gap-2">
            <ScanSearch size={14} className="text-[#E5534B]" />
            <span className="text-[13.5px] font-semibold text-white">Findings</span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            {SYSTEM_FINDINGS.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-3"
              >
                <StatusDot
                  tone={
                    f.status === "present"
                      ? "green"
                      : f.status === "outdated"
                        ? "red"
                        : f.status === "missing"
                          ? "red"
                          : "amber"
                  }
                />
                <div className="flex flex-col gap-[2px]">
                  <span className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/50">
                    {f.label}
                  </span>
                  <span className="text-[12.5px] leading-[1.5] text-white/80">{f.text}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-3">
            <p className="text-[10.5px] leading-[1.6] text-white/55">
              Findings are produced by fixed rules against source records — the model
              proposes, the rules dispose. Every finding cites the rule that produced it.
            </p>
          </div>
        </motion.section>
      </div>
    </>
  );
}

/* ================================================================== */
/* SCREEN: Review queue                                               */
/* ================================================================== */

type Decision = "accept" | "correct" | "reject" | "flag";

const DECISION_LABEL: Record<Decision, string> = {
  accept: "Accepted",
  correct: "Corrected",
  reject: "Rejected",
  flag: "Flagged",
};

function ReviewScreen() {
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});
  const remaining = REVIEW_CARDS.filter((c) => !decisions[c.id]).length;

  return (
    <>
      <ScreenHeader
        title="Review queue"
        sub={`${remaining} case${remaining === 1 ? "" : "s"} awaiting a human decision · every decision is recorded for audit`}
        icon={ClipboardCheck}
        color="text-[#E5BE71]"
      />
      <div className="mt-7 grid gap-4 lg:grid-cols-2">
        {REVIEW_CARDS.map((c, i) => {
          const d = decisions[c.id];
          return (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.08 }}
              className="chk-panel-deep p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[12.5px] font-semibold text-white">
                    {c.code}
                  </span>
                  <span className="text-[12px] leading-[1.55] text-white/72">{c.detail}</span>
                </div>
                <Chip
                  tone={
                    c.reason === "Low confidence"
                      ? "amber"
                      : c.reason === "Outdated reference"
                        ? "red"
                        : c.reason === "Needs verification"
                          ? "blue"
                          : "teal"
                  }
                >
                  {c.reason}
                </Chip>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-[10.5px] text-white/60">
                  <span className="uppercase tracking-[0.12em]">Confidence</span>
                  <span className="chk-zero font-mono text-[11.5px] text-[#7DD9D2]">
                    {c.confidence}%
                  </span>
                </div>
                <div className="mt-2">
                  <ConfidenceBar value={c.confidence} />
                </div>
              </div>
              {d ? (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center justify-between rounded-lg border border-[#4CB782]/25 bg-[#4CB782]/[0.07] px-3.5 py-2.5"
                >
                  <span className="flex items-center gap-2 text-[12px] font-medium text-[#7DD9A8]">
                    <Check size={13} />
                    {DECISION_LABEL[d]} — recorded
                  </span>
                  <button
                    onClick={() =>
                      setDecisions((prev) => {
                        const next = { ...prev };
                        delete next[c.id];
                        return next;
                      })
                    }
                    className="cursor-pointer text-white/55 transition-colors hover:text-white"
                    aria-label="Undo decision"
                  >
                    <X size={13} />
                  </button>
                </motion.div>
              ) : (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(
                    [
                      ["accept", "Accept"],
                      ["correct", "Correct"],
                      ["reject", "Reject"],
                      ["flag", "Flag"],
                    ] as [Decision, string][]
                  ).map(([k, label]) => (
                    <button
                      key={k}
                      onClick={() => setDecisions((prev) => ({ ...prev, [c.id]: k }))}
                      className={[
                        "cursor-pointer rounded-full border px-3 py-[5px] text-[10.5px] font-medium transition-colors",
                        k === "accept"
                          ? "border-[#4CB782]/30 bg-[#4CB782]/[0.1] text-[#7DD9A8] hover:border-[#4CB782]/50"
                          : k === "correct"
                            ? "border-[#5CA8FF]/30 bg-[#5CA8FF]/[0.1] text-[#9CC8FF] hover:border-[#5CA8FF]/50"
                            : k === "reject"
                              ? "border-[#E5534B]/30 bg-[#E5534B]/[0.1] text-[#F0918B] hover:border-[#E5534B]/50"
                              : "border-[#D29922]/30 bg-[#D29922]/[0.1] text-[#E5BE71] hover:border-[#D29922]/50",
                      ].join(" ")}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </motion.article>
          );
        })}
      </div>
    </>
  );
}

/* ================================================================== */
/* SCREEN: Feedback                                                   */
/* ================================================================== */

function FeedbackScreen() {
  return (
    <>
      <ScreenHeader
        title="Feedback"
        sub="Recorded outcomes and observations from the people operating the system"
        icon={MessageSquare}
        color="text-[#E069A8]"
      />
      <div className="mt-7 flex flex-col gap-4">
        {FEEDBACK_ITEMS.map((f, i) => (
          <motion.article
            key={f.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 + i * 0.09 }}
            className="chk-panel-deep flex items-start gap-4 p-5"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E069A8] to-[#5CA8FF] text-[10px] font-semibold text-white">
              {f.author
                .split(" ")
                .map((p) => p[0])
                .join("")}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[13px] font-semibold text-white">{f.author}</span>
                <span className="text-[11px] text-white/50">· {f.role}</span>
                <span className="ml-auto font-mono text-[10.5px] text-white/45">{f.date}</span>
                <Chip
                  tone={
                    f.tag === "Accepted"
                      ? "green"
                      : f.tag === "Corrected"
                        ? "blue"
                        : "neutral"
                  }
                >
                  {f.tag}
                </Chip>
              </div>
              <p className="text-[12.5px] leading-[1.65] text-white/72">{f.text}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </>
  );
}

/* ================================================================== */
/* SCREEN: Settings                                                   */
/* ================================================================== */

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={onChange}
      className={[
        "relative h-[18px] w-[32px] shrink-0 cursor-pointer rounded-full border transition-colors",
        on
          ? "border-[#4CB782]/50 bg-[#4CB782]/[0.35]"
          : "border-white/[0.12] bg-white/[0.05]",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-[2px] h-[12px] w-[12px] rounded-full transition-all",
          on ? "left-[16px] bg-[#7DD9A8]" : "left-[2px] bg-white/60",
        ].join(" ")}
      />
    </button>
  );
}

function SettingsScreen() {
  const [state, setState] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const s of SETTINGS_SECTIONS) for (const it of s.items) init[it.id] = it.on;
    return init;
  });

  return (
    <>
      <ScreenHeader
        title="Settings"
        sub="Workspace preferences for the demo environment · changes stay on this device"
        icon={Settings2}
        color="text-white/72"
      />

      {/* profile */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="chk-panel-deep mt-7 flex flex-wrap items-center gap-5 p-6"
        aria-label="Profile"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#4CB782] to-[#3FB8AF] text-[15px] font-semibold text-white">
          AK
        </span>
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-2 text-[16px] font-semibold text-white">
            <UserRound size={15} className="text-[#5CA8FF]" />
            A. Kulkarni
          </span>
          <span className="text-[12.5px] text-white/60">
            Procurement Officer · Government department workspace
          </span>
          <span className="font-mono text-[11px] text-white/45">a.kulkarni@workspace.gov.in</span>
        </div>
        <button className="ml-auto cursor-pointer rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2 text-[12px] font-medium text-white/88 transition-colors hover:border-white/[0.2] hover:text-white">
          Edit profile
        </button>
      </motion.section>

      {/* sections */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {SETTINGS_SECTIONS.map((s, si) => (
          <motion.section
            key={s.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 + si * 0.08 }}
            className="chk-panel-deep p-5"
            aria-label={s.title}
          >
            <h2 className="text-[13.5px] font-semibold text-white">{s.title}</h2>
            <div className="mt-4 flex flex-col gap-3">
              {s.items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-start justify-between gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-3"
                >
                  <div className="flex min-w-0 flex-col gap-[2px]">
                    <span className="text-[12.5px] font-medium text-white/88">{it.label}</span>
                    <span className="text-[11px] leading-[1.5] text-white/55">{it.detail}</span>
                  </div>
                  <Toggle
                    on={state[it.id]}
                    onChange={() => setState((p) => ({ ...p, [it.id]: !p[it.id] }))}
                  />
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      {/* demo notice */}
      <div className="mt-6 rounded-xl border border-[#D29922]/20 bg-[#D29922]/[0.05] p-4">
        <p className="text-[11.5px] leading-[1.65] text-[#B9A26D]">
          This settings screen demonstrates the workspace preferences layout. The
          production system (Streamlit + Python) holds the real configuration; all
          records here are sample data.
        </p>
      </div>
    </>
  );
}

/* ================================================================== */
/* PAGE SHELL                                                         */
/* ================================================================== */

export function DemoPage({
  navigate,
}: {
  navigate: (v: View, anchor?: string) => void;
}) {
  const [activeItem, setActiveItem] = useState<string>("dashboard");

  const screen = (() => {
    switch (activeItem) {
      case "tender-analysis":
        return <TenderScreen />;
      case "recommendations":
        return <RecommendationsScreen />;
      case "standards":
        return <StandardsScreen />;
      case "compliance":
        return <AuditScreen />;
      case "review":
        return <ReviewScreen />;
      case "feedback":
        return <FeedbackScreen />;
      case "settings":
        return <SettingsScreen />;
      default:
        return <DashboardScreen />;
    }
  })();

  const activeLabel =
    SIDEBAR_ITEMS.find((i) => i.id === activeItem)?.label ?? "Dashboard";

  return (
    <div className="relative z-[1] flex min-h-screen flex-col bg-[#08090A]">
      {/* ---------------- app top bar ---------------- */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#08090A]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[50px] max-w-[1400px] items-center justify-between px-5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("landing")}
              className="group flex cursor-pointer items-center gap-2.5"
              aria-label="Back to CHANAKYA site"
            >
              <LogoMark size={18} />
              <span className="text-[13px] font-semibold tracking-[0.16em] text-white">
                CHANAKYA
              </span>
            </button>
            <span className="hidden items-center gap-1.5 text-[11px] text-white/60 sm:flex">
              <ChevronRight size={11} />
              <span className="text-white/72">Procurement workspace</span>
              <ChevronRight size={11} />
              <span className="text-white/88">{activeLabel}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("landing")}
              className="hidden cursor-pointer items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.04] px-3 py-[6px] text-[11.5px] text-white/88 transition-all hover:border-white/[0.18] hover:text-white sm:inline-flex"
            >
              <ArrowLeft size={11} />
              Back to site
            </button>
            <div className="hidden items-center gap-2 rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-[5px] text-[11px] text-white/60 md:flex">
              <Search size={11} />
              <span>Search tenders, standards…</span>
              <kbd className="chk-mono rounded border border-white/[0.08] bg-white/[0.03] px-1 text-[9px] text-white/72">
                ⌘K
              </kbd>
            </div>
            <div className="relative">
              <Bell size={14} className="text-white/72" />
              <span className="absolute -right-0.5 -top-0.5 h-[5px] w-[5px] rounded-full bg-[#4CB782]" />
            </div>
            <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-gradient-to-br from-[#4CB782] to-[#3FB8AF] text-[9.5px] font-semibold text-white">
              AK
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 px-0 sm:px-5">
        {/* ---------------- sidebar ---------------- */}
        <aside className="sticky top-[50px] hidden h-[calc(100vh-50px)] w-[212px] shrink-0 flex-col border-r border-white/[0.055] p-4 lg:flex">
          <button
            className="mb-4 flex w-full cursor-pointer items-center justify-between rounded-lg border border-[#5CA8FF]/25 bg-[#5CA8FF]/[0.08] px-3 py-2.5 text-left transition-colors hover:border-[#5CA8FF]/40"
          >
            <span className="flex items-center gap-2 text-[12px] font-medium text-[#9CC8FF]">
              <Sparkles size={12.5} />
              New tender analysis
            </span>
            <Plus size={12} className="text-[#5CA8FF]" />
          </button>
          <nav className="flex flex-col gap-[2px]" aria-label="Workspace">
            {SIDEBAR_ITEMS.map((item) => {
              const isActive = activeItem === item.id;
              const { Icon, color } = SIDEBAR_ICONS[item.id] ?? {
                Icon: LayoutGrid,
                color: "text-white/60",
              };
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-[7px] text-left text-[12.5px] transition-colors ${
                    isActive
                      ? "bg-white/[0.06] font-medium text-white"
                      : "text-white/72 hover:bg-white/[0.03] hover:text-white/88"
                  }`}
                >
                  <Icon size={13.5} className={isActive ? color : "text-white/45"} />
                  {item.label}
                  {"count" in item && item.count ? (
                    <span className="ml-auto rounded-full border border-[#D29922]/30 bg-[#D29922]/[0.12] px-1.5 py-[1px] text-[9.5px] font-medium text-[#E5BE71]">
                      {item.count}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
          <div className="mt-auto rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
            <p className="text-[10.5px] leading-[1.55] text-white/60">
              Demo environment — records shown are sample data. Production frontend:
              Streamlit + Python.
            </p>
          </div>
        </aside>

        {/* ---------------- main ---------------- */}
        <main className="min-w-0 flex-1 px-5 py-7 sm:px-7">
          {/* mobile screen chips */}
          <div className="chk-scroll-x -mx-5 mb-5 flex gap-2 overflow-x-auto px-5 lg:hidden">
            {SIDEBAR_ITEMS.map((item) => {
              const { Icon, color } = SIDEBAR_ICONS[item.id] ?? {
                Icon: LayoutGrid,
                color: "text-white/45",
              };
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={[
                    "flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] transition-colors",
                    isActive
                      ? "border-white/[0.16] bg-white/[0.06] font-medium text-white"
                      : "border-white/[0.08] bg-white/[0.02] text-white/60 hover:text-white/88",
                  ].join(" ")}
                >
                  <Icon size={12} className={isActive ? color : "text-white/45"} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <motion.div
            key={activeItem}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.21, 0.6, 0.35, 1] }}
          >
            {screen}
          </motion.div>

          <p className="mt-8 text-center text-[11px] text-white/60">
            CHANAKYA demo · presentation layer only · sample records — the production
            system is Streamlit + Python.
          </p>
        </main>
      </div>
    </div>
  );
}
