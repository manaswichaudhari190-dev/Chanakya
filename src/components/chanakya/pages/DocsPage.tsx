"use client";

/**
 * CHANAKYA — Docs view (#/docs)
 * Linear-style documentation layout: left sidebar navigation,
 * center content column (max 768px), right "On this page" TOC
 * with scroll-spy. Docs home shows popular cards + category lists.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  FileSearch,
  Landmark,
  Network,
  Rocket,
  Search,
  ShieldCheck,
  Users,
  Waypoints,
  X,
} from "lucide-react";
import type { View } from "../Navbar";
import { DOCS, DOC_CATEGORIES, docById, type DocArticle } from "../data/docsData";

/* ------------------------------------------------------------------ */
/* icon map                                                            */
/* ------------------------------------------------------------------ */

const ARTICLE_ICONS = {
  rocket: { Icon: Rocket, color: "text-[#E8824A]" },
  workflow: { Icon: Waypoints, color: "text-[#5CA8FF]" },
  graph: { Icon: Network, color: "text-[#3FB8AF]" },
  audit: { Icon: FileSearch, color: "text-[#E5534B]" },
  shield: { Icon: ShieldCheck, color: "text-[#4CB782]" },
  users: { Icon: Users, color: "text-[#E069A8]" },
  book: { Icon: BookOpen, color: "text-[#E5BE71]" },
} as const;

/* ------------------------------------------------------------------ */
/* search                                                             */
/* ------------------------------------------------------------------ */

function useDocSearch() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement))
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DOCS;
    return DOCS.filter((d) => {
      const hay = [
        d.title,
        d.description,
        d.category,
        ...d.sections.map((s) => s.heading),
        ...d.sections.flatMap((s) =>
          s.blocks
            .filter((b) => b.type === "p" || b.type === "list")
            .map((b) => (b.type === "p" ? b.text : b.items.join(" "))),
        ),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  return { query, setQuery, inputRef, matches };
}

/* ------------------------------------------------------------------ */
/* sidebar                                                            */
/* ------------------------------------------------------------------ */

function Sidebar({
  activeId,
  onSelect,
  matches,
}: {
  activeId: string | null;
  onSelect: (id: string | null) => void;
  matches: DocArticle[];
}) {
  return (
    <nav aria-label="Documentation" className="chk-scroll sticky top-24 hidden max-h-[calc(100vh-120px)] overflow-y-auto pr-2 lg:block">
      <div className="flex flex-col gap-6 pb-10">
        {DOC_CATEGORIES.map((cat) => {
          const arts = matches.filter((d) => d.category === cat);
          if (!arts.length) return null;
          return (
            <div key={cat}>
              <button
                onClick={() => onSelect(arts[0].id)}
                className="mb-1.5 block w-full cursor-pointer px-2.5 text-left text-[12px] font-medium tracking-[0.01em] text-white/50 transition-colors hover:text-white/88"
              >
                {cat}
              </button>
              <ul className="flex flex-col">
                {arts.map((a) => {
                  const active = a.id === activeId;
                  return (
                    <li key={a.id}>
                      <button
                        onClick={() => onSelect(a.id)}
                        className={[
                          "group flex w-full cursor-pointer items-center gap-2 rounded-md px-2.5 py-[7px] text-left text-[13.5px] leading-[1.45] transition-colors",
                          active
                            ? "bg-white/[0.05] text-white"
                            : "text-white/60 hover:bg-white/[0.03] hover:text-white/88",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "h-1 w-1 shrink-0 rounded-full transition-colors",
                            active ? "bg-[#5CA8FF]" : "bg-white/25 group-hover:bg-white/45",
                          ].join(" ")}
                        />
                        <span className="truncate">{a.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        {matches.length === 0 && (
          <p className="px-2.5 text-[13px] text-white/45">No results.</p>
        )}
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* right TOC — scroll spy                                             */
/* ------------------------------------------------------------------ */

function OnThisPage({ doc }: { doc: DocArticle }) {
  const [active, setActive] = useState<string>(doc.sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );
    for (const s of doc.sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [doc]);

  return (
    <aside
      aria-label="On this page"
      className="sticky top-24 hidden max-h-[calc(100vh-120px)] min-w-[220px] xl:block"
    >
      <div className="sticky top-6 flex flex-col gap-1 pb-10">
        <p className="mb-2 px-2.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
          On this page
        </p>
        {doc.sections.map((s) => {
          const isActive = s.id === active;
          return (
            <a
              key={s.id}
              href={`#/docs`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={[
                "cursor-pointer border-l py-[5px] pl-3.5 pr-2 text-[12.5px] leading-[1.5] transition-all",
                isActive
                  ? "border-[#5CA8FF] text-white"
                  : "border-white/[0.07] text-white/50 hover:text-white/80",
              ].join(" ")}
            >
              {s.heading}
            </a>
          );
        })}
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* article blocks renderer                                            */
/* ------------------------------------------------------------------ */

function Blocks({ blocks }: { blocks: DocArticle["sections"][number]["blocks"] }) {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className="text-pretty text-[15px] leading-[1.75] text-white/75">
                {b.text}
              </p>
            );
          case "list":
            return (
              <ul key={i} className="flex flex-col gap-2.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-[14.5px] leading-[1.65] text-white/75">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#5CA8FF]" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          case "code":
            return (
              <div
                key={i}
                className="chk-mono chk-zero overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0F1011] p-4 text-[12.5px] leading-[1.7] text-white/85"
              >
                <pre className="whitespace-pre">{b.text}</pre>
              </div>
            );
          case "callout":
            return b.tone === "note" ? (
              <div
                key={i}
                className="rounded-xl border border-[#5CA8FF]/20 bg-[#5CA8FF]/[0.05] p-4"
              >
                <p className="text-[12.5px] font-semibold text-[#9CC8FF]">{b.title}</p>
                <p className="mt-1.5 text-[13px] leading-[1.65] text-white/70">{b.text}</p>
              </div>
            ) : (
              <div key={i} className="rounded-xl border border-[#D29922]/20 bg-[#D29922]/[0.05] p-4">
                <p className="text-[12.5px] font-semibold text-[#E5BE71]">{b.title}</p>
                <p className="mt-1.5 text-[13px] leading-[1.65] text-white/70">{b.text}</p>
              </div>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-xl border border-white/[0.08]">
                <table className="w-full min-w-[540px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-white/[0.08] bg-white/[0.025]">
                      {b.head.map((h, j) => (
                        <th
                          key={j}
                          className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/55"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, j) => (
                      <tr
                        key={j}
                        className="border-b border-white/[0.05] transition-colors last:border-0 hover:bg-white/[0.02]"
                      >
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className={[
                              "px-4 py-3 text-[13px] leading-[1.55]",
                              k === 0 ? "font-medium text-white/88" : "text-white/70",
                            ].join(" ")}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* article view                                                       */
/* ------------------------------------------------------------------ */

function ArticleView({
  doc,
  onNavigate,
}: {
  doc: DocArticle;
  onNavigate: (id: string | null) => void;
}) {
  const { Icon, color } = ARTICLE_ICONS[doc.icon] ?? { Icon: FileSearch, color: "text-[#5CA8FF]" };
  const idx = DOCS.findIndex((d) => d.id === doc.id);
  const next = DOCS[idx + 1];
  const prev = DOCS[idx - 1];

  return (
    <article className="min-w-0 pb-16">
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12.5px] text-white/45">
        <button onClick={() => onNavigate(null)} className="cursor-pointer transition-colors hover:text-white/80">
          Docs
        </button>
        <ChevronRight size={11} className="shrink-0" />
        <span className="text-white/45">{doc.category}</span>
        <ChevronRight size={11} className="shrink-0" />
        <span className="text-white/85">{doc.title}</span>
      </nav>

      {/* header */}
      <header className="mt-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-[#0F1011]">
          <Icon size={19} className={color} strokeWidth={1.8} />
        </div>
        <h1 className="chk-display mt-5 text-[clamp(1.85rem,3.6vw,2.35rem)] font-semibold">
          {doc.title}
        </h1>
        <p className="mt-3 max-w-[560px] text-pretty text-[15px] leading-[1.7] text-white/70">
          {doc.description}
        </p>
      </header>

      <div className="mt-4 h-px w-full bg-white/[0.07]" />

      {/* sections */}
      <div className="flex flex-col gap-12 pt-10">
        {doc.sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-28">
            <h2 className="text-[20px] font-semibold tracking-[-0.015em] text-white">{s.heading}</h2>
            <Blocks blocks={s.blocks} />
          </section>
        ))}
      </div>

      {/* prev / next */}
      <div className="mt-14 grid gap-3 border-t border-white/[0.07] pt-8 sm:grid-cols-2">
        {prev ? (
          <button
            onClick={() => onNavigate(prev.id)}
            className="group cursor-pointer rounded-xl border border-white/[0.08] bg-[#0F1011] p-4 text-left transition-all hover:border-white/[0.16]"
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/40">
              Previous
            </span>
            <span className="mt-1 flex items-center gap-1.5 text-[14px] font-medium text-white/85 group-hover:text-white">
              <ArrowLeft size={13} className="rotate-180 text-white/40" />
              {prev.title}
            </span>
          </button>
        ) : (
          <span />
        )}
        {next && (
          <button
            onClick={() => onNavigate(next.id)}
            className="group cursor-pointer rounded-xl border border-white/[0.08] bg-[#0F1011] p-4 text-right transition-all hover:border-white/[0.16] sm:col-start-2"
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/40">
              Next
            </span>
            <span className="mt-1 flex items-center justify-end gap-1.5 text-[14px] font-medium text-white/85 group-hover:text-white">
              {next.title}
              <ChevronRight size={13} className="text-white/40" />
            </span>
          </button>
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* docs home                                                          */
/* ------------------------------------------------------------------ */

function DocsHome({
  onSelect,
  matches,
  searching,
}: {
  onSelect: (id: string | null) => void;
  matches: DocArticle[];
  searching: boolean;
}) {
  const popular = matches.filter((d) => d.popular);

  return (
    <div className="min-w-0 pb-16">
      {/* popular */}
      <section>
        <h2 className="text-[20px] font-semibold tracking-[-0.015em] text-white">
          {searching ? `Results (${matches.length})` : "Popular"}
        </h2>
        <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
          {(searching ? matches : popular).map((d, i) => {
            const { Icon, color } = ARTICLE_ICONS[d.icon] ?? { Icon: FileSearch, color: "text-[#5CA8FF]" };
            return (
              <motion.button
                key={d.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 * i }}
                onClick={() => onSelect(d.id)}
                className="group cursor-pointer rounded-xl border border-white/[0.08] bg-[#0F1011] p-5 text-left transition-all duration-300 hover:-translate-y-[2px] hover:border-white/[0.16]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                    <Icon size={16} className={color} strokeWidth={1.8} />
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="mt-0.5 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/70"
                  />
                </div>
                <p className="mt-4 text-[14.5px] font-semibold text-white/90 group-hover:text-white">
                  {d.title}
                </p>
                <p className="mt-1.5 text-[13px] leading-[1.6] text-white/60">{d.description}</p>
              </motion.button>
            );
          })}
        </div>
        {searching && matches.length === 0 && (
          <p className="mt-6 text-[14px] text-white/55">
            No documentation matches your search.
          </p>
        )}
      </section>

      {/* category lists */}
      {!searching &&
        DOC_CATEGORIES.map((cat) => {
          const arts = matches.filter((d) => d.category === cat);
          if (!arts.length) return null;
          return (
            <section key={cat} className="mt-12">
              <h2 className="text-[20px] font-semibold tracking-[-0.015em] text-white">{cat}</h2>
              <div className="mt-4 flex flex-col">
                {arts.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => onSelect(d.id)}
                    className="group flex cursor-pointer items-center justify-between gap-4 border-b border-white/[0.06] py-3.5 text-left transition-colors hover:bg-white/[0.02]"
                  >
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate text-[14px] font-medium text-white/85 group-hover:text-white">
                        {d.title}
                      </span>
                      <span className="mt-0.5 truncate text-[12.5px] text-white/50">
                        {d.description}
                      </span>
                    </span>
                    <ChevronRight
                      size={14}
                      className="shrink-0 text-white/25 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white/70"
                    />
                  </button>
                ))}
              </div>
            </section>
          );
        })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* page                                                               */
/* ------------------------------------------------------------------ */

export function DocsPage({
  navigate,
}: {
  navigate: (v: View, anchor?: string) => void;
}) {
  const [activeDocId, setActiveDocId] = useState<string | null>(null);
  const { query, setQuery, inputRef, matches } = useDocSearch();
  const searching = query.trim().length > 0;
  const activeDoc = activeDocId ? docById(activeDocId) : null;
  // while searching, results replace the article view (like Linear docs)
  const showArticle = activeDoc && !searching;

  const selectDoc = (id: string | null) => {
    setActiveDocId(id);
    // defer so React commits the new article before scrolling
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 60);
  };

  return (
    <main className="relative z-[1] mx-auto w-full max-w-[1216px] px-5 pb-24 pt-24 sm:px-8 sm:pt-28">
      {/* docs masthead */}
      <header>
        <div className="flex items-center justify-between gap-4">
          <div>
            <button
              onClick={() => navigate("landing")}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.04] px-3.5 py-[7px] text-[12px] text-white/88 transition-all hover:border-white/[0.18] hover:text-white"
            >
              <ArrowLeft size={12} />
              Back to site
            </button>
            <h1 className="chk-display mt-5 text-[clamp(2rem,4vw,2.6rem)] font-semibold">
              CHANAKYA Docs
            </h1>
            <p className="mt-3 max-w-[520px] text-pretty text-[15px] leading-[1.7] text-white/70">
              A precise reference for how the system reasons about Indian
              Standards, where its evidence comes from, and the vocabulary
              used across the product.
            </p>
          </div>
        </div>

        {/* search */}
        <div className="relative mt-7 max-w-[480px]">
          <Search size={14} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation…"
            aria-label="Search documentation"
            className="h-10 w-full cursor-text rounded-lg border border-white/[0.09] bg-white/[0.03] pl-9 pr-20 text-[13.5px] text-white placeholder:text-white/40 outline-none transition-all focus:border-[#5CA8FF]/45 focus:bg-white/[0.04]"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white/40 transition-colors hover:text-white"
            >
              <X size={13} />
            </button>
          ) : (
            <kbd className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded border border-white/[0.1] bg-white/[0.04] px-1.5 py-0.5 font-sans text-[10.5px] text-white/45">
              ⌘K
            </kbd>
          )}
        </div>
      </header>

      <div className="mt-4 h-px w-full bg-white/[0.07]" />

      {/* 3-column: sidebar · content · toc */}
      <div className="mt-8 grid gap-10 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[230px_minmax(0,1fr)_220px] xl:gap-14">
        <Sidebar activeId={activeDocId} onSelect={selectDoc} matches={matches} />

        <div className="min-w-0">
          {/* mobile article chips (sidebar replacement) */}
          <div className="chk-scroll-x -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 lg:hidden">
            {DOCS.map((d) => (
              <button
                key={d.id}
                onClick={() => selectDoc(d.id)}
                className={[
                  "shrink-0 cursor-pointer rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors",
                  d.id === activeDocId
                    ? "border-white/[0.16] bg-white/[0.06] text-white"
                    : "border-white/[0.08] bg-white/[0.02] text-white/60 hover:text-white/88",
                ].join(" ")}
              >
                {d.title}
              </button>
            ))}
          </div>

          {showArticle ? (
            <ArticleView doc={activeDoc} onNavigate={selectDoc} />
          ) : (
            <DocsHome onSelect={selectDoc} matches={matches} searching={searching} />
          )}
        </div>

        {showArticle && activeDoc && <OnThisPage key={activeDoc.id} doc={activeDoc} />}
      </div>

      {/* advisory note */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#D29922]/20 bg-[#D29922]/[0.05] p-5">
        <Landmark size={14} className="mt-[3px] shrink-0 text-[#E5BE71]" />
        <p className="text-[12.5px] leading-[1.7] text-[#B9A26D]">
          This documentation describes the CHANAKYA architecture in plain
          language for the demo. Nothing here constitutes legal advice, and all
          records referenced across this demo are sample data. For authoritative
          standards information, consult the Bureau of Indian Standards.
        </p>
      </div>
    </main>
  );
}
