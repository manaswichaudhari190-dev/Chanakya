"use client";

/**
 * CHANAKYA — Final CTA
 * Large dark rounded container with a subtle radial glow.
 */

import { Layers, PlayCircle } from "lucide-react";
import { ChkButton, Reveal } from "./primitives";

export function CTASection({
  onLaunchDemo,
  onViewArchitecture,
}: {
  onLaunchDemo: () => void;
  onViewArchitecture: () => void;
}) {
  return (
    <section id="cta" className="relative pb-32 pt-16 sm:pb-40" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <div className="chk-glow-border relative overflow-hidden px-6 py-20 text-center sm:px-12 sm:py-24">
            {/* radial glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[880px] max-w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full chk-breathe"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(92,168,255,0.10), rgba(63,184,175,0.06) 48%, transparent 72%)",
              }}
            />
            {/* hairline arcs */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-[260px] mx-auto h-[420px] w-[720px] max-w-[92%] rounded-[full] border border-white/[0.045]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-[200px] mx-auto h-[420px] w-[520px] max-w-[80%] rounded-[full] border border-white/[0.05]"
            />

            <div className="relative z-[1] mx-auto max-w-[640px]">
              <h2
                id="cta-heading"
                className="chk-display text-balance text-[clamp(1.9rem,4.4vw,3.3rem)] font-semibold text-white"
              >
                Turn tender specifications into decisions you can verify.
              </h2>
              <p className="mx-auto mt-6 max-w-[520px] text-pretty text-[15.5px] leading-[1.7] text-white/72">
                Explore a live demonstration of CHANAKYA&apos;s standards
                recommendation and tender-gap workflow.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <ChkButton
                  variant="primary"
                  onClick={onLaunchDemo}
                  className="px-5 py-[10px] text-[14px]"
                  arrow
                >
                  Launch Demo
                </ChkButton>
                <ChkButton
                  variant="secondary"
                  onClick={onViewArchitecture}
                  className="px-5 py-[10px] text-[14px]"
                >
                  <Layers size={14.5} strokeWidth={1.8} className="text-[#5CA8FF]" />
                  View Architecture
                </ChkButton>
              </div>
              <div className="mt-8 flex items-center justify-center gap-2 text-[11.5px] text-white/60">
                <PlayCircle size={11.5} />
                Interactive walkthrough · runs entirely in your browser · demo data
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
