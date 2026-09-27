"use client";

/**
 * CHANAKYA — Footer
 * Minimal: wordmark + three link columns + legal line.
 */

import type { View } from "./Navbar";
import { LogoMark, Wordmark } from "./primitives";

type FooterProps = {
  navigate: (v: View, anchor?: string) => void;
};

export function Footer({ navigate }: FooterProps) {
  const year = 2026;

  const productLinks: { label: string; onClick: () => void }[] = [
    { label: "Recommendations", onClick: () => navigate("landing", "product") },
    { label: "Tender Audit", onClick: () => navigate("landing", "solutions") },
    { label: "Standards Graph", onClick: () => navigate("landing", "standards") },
    { label: "Evidence", onClick: () => navigate("landing", "evidence") },
    { label: "Demo", onClick: () => navigate("demo") },
  ];

  const resourceLinks: { label: string; onClick: () => void }[] = [
    { label: "Architecture", onClick: () => navigate("architecture") },
    { label: "Documentation", onClick: () => navigate("docs") },
    { label: "Research", onClick: () => navigate("docs") },
    { label: "SIH 2026", onClick: () => navigate("architecture") },
  ];

  const companyLinks: { label: string; onClick: () => void }[] = [
    { label: "About", onClick: () => navigate("landing", "cta") },
    { label: "Contact", onClick: () => navigate("landing", "cta") },
  ];

  const columns = [
    { title: "Product", links: productLinks },
    { title: "Resources", links: resourceLinks },
    { title: "Company", links: companyLinks },
  ];

  return (
    <footer
      id="resources"
      className="relative mt-auto border-t border-white/[0.06] bg-[#08090A]"
    >
      <div className="mx-auto max-w-[1200px] px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <LogoMark size={20} />
              <Wordmark />
            </div>
            <p className="max-w-[280px] text-[13px] leading-[1.65] text-white/72">
              Standards-aware procurement intelligence for Indian Standards and
              tender compliance.
            </p>
            <button
              onClick={() => navigate("landing", "top")}
              className="w-fit cursor-pointer rounded-md text-[12px] text-white/75 transition-colors hover:text-white"
            >
              Back to top ↑
            </button>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-4">
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/60">
                {col.title}
              </span>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={l.onClick}
                      className="cursor-pointer text-left text-[13px] text-white/72 transition-colors duration-200 hover:text-white"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/[0.055] pt-6 sm:flex-row sm:items-center">
          <span className="text-[12px] text-white/60">
            © {year} CHANAKYA
          </span>
          <span className="text-[12px] text-white/60">
            Built for transparent, evidence-driven procurement.
          </span>
          <span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-[3px] text-[10px] font-medium uppercase tracking-[0.12em] text-white/60">
            Demo presentation layer
          </span>
        </div>
      </div>
    </footer>
  );
}
