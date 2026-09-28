"use client";

/**
 * CHANAKYA — Navbar
 * Transparent initially; gains blur + hairline border on scroll.
 * Compact, small typography, rounded CTA — Linear-style density.
 */

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LogoMark, Wordmark } from "./primitives";

export type View = "landing" | "demo" | "architecture" | "docs";

const SECTION_LINKS: { label: string; id: string }[] = [
  { label: "Product", id: "product" },
  { label: "Solutions", id: "solutions" },
  { label: "How it works", id: "how-it-works" },
  { label: "Resources", id: "resources" },
];

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function Navbar({
  view,
  navigate,
}: {
  view: View;
  navigate: (v: View, anchor?: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || view !== "landing";

  const goSection = (id: string) => {
    setOpen(false);
    navigate("landing", id);
  };

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.21, 0.6, 0.35, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "border-b border-white/[0.06] bg-[#000000]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[52px] max-w-[1200px] items-center justify-between px-5 sm:px-8"
      >
        {/* Left — logo */}
        <button
          onClick={() => {
            setOpen(false);
            navigate("landing");
          }}
          className="group flex cursor-pointer items-center gap-2.5"
          aria-label="CHANAKYA home"
        >
          <LogoMark size={21} />
          <Wordmark />
          <span className="mt-[1px] hidden rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-[1px] text-[9.5px] font-medium tracking-[0.08em] text-white/72 sm:inline-block">
            DEMO
          </span>
        </button>

        {/* Center — section links */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {SECTION_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => goSection(l.id)}
              className="cursor-pointer rounded-md px-2.5 py-1.5 text-[13px] text-white/72 transition-colors duration-200 hover:bg-white/[0.05] hover:text-white"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Right — utility links + CTA */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate("docs")}
            className={cn(
              "hidden cursor-pointer rounded-md px-2.5 py-1.5 text-[13px] transition-colors duration-200 hover:text-white md:block",
              view === "docs" ? "text-white" : "text-white/72"
            )}
          >
            Docs
          </button>
          <button
            onClick={() => navigate("demo")}
            className={cn(
              "hidden cursor-pointer rounded-md px-2.5 py-1.5 text-[13px] transition-colors duration-200 hover:text-white md:block",
              view === "demo" ? "text-white" : "text-white/72"
            )}
          >
            Demo
          </button>
          <button
            onClick={() => navigate("landing", "cta")}
            className="hidden cursor-pointer rounded-md px-2.5 py-1.5 text-[13px] text-white/72 transition-colors duration-200 hover:text-white md:block"
          >
            Sign in
          </button>

          <button
            onClick={() => navigate("demo")}
            className="group/cta ml-1.5 hidden cursor-pointer items-center gap-1.5 rounded-full bg-[#E5E5E6] px-3.5 py-[7px] text-[12.5px] font-medium text-[#08090A] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#F7F8F8] hover:shadow-[0_6px_24px_-6px_rgba(0,0,0,0.4)] md:inline-flex"
          >
            Launch Demo
            <ArrowRight
              size={12}
              strokeWidth={2.2}
              className="transition-transform duration-300 group-hover/cta:translate-x-[2px]"
            />
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="cursor-pointer rounded-md p-2 text-white/88 transition-colors hover:bg-white/[0.06] hover:text-white md:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.21, 0.6, 0.35, 1] }}
            className="overflow-hidden border-b border-white/[0.06] bg-[#08090A]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-0.5 px-5 pb-5 pt-2">
              {SECTION_LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => goSection(l.id)}
                  className="cursor-pointer rounded-lg px-3 py-2.5 text-left text-[14px] text-white/88 transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  {l.label}
                </button>
              ))}
              <div className="chk-hairline my-2.5" />
              <button
                onClick={() => navigate("docs")}
                className="cursor-pointer rounded-lg px-3 py-2.5 text-left text-[14px] text-white/88 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                Docs
              </button>
              <button
                onClick={() => navigate("demo")}
                className="cursor-pointer rounded-lg px-3 py-2.5 text-left text-[14px] text-white/88 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                Demo
              </button>
              <button
                onClick={() => navigate("demo")}
                className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#E5E5E6] px-4 py-2.5 text-[13.5px] font-medium text-[#08090A] transition-colors hover:bg-[#F7F8F8]"
              >
                Launch Demo
                <ArrowRight size={13} strokeWidth={2.2} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
