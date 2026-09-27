"use client";

/**
 * CHANAKYA — Landing page
 * The cinematic marketing surface: hero, product preview and
 * ten story sections in a deliberate vertical rhythm.
 */

import { Hero } from "../Hero";
import { ProductPreview } from "../ProductPreview";
import { CTASection } from "../CTASection";
import { FeatureSection } from "../FeatureSection";
import type { View } from "../Navbar";
import { AISection } from "../sections/AISection";
import { EvidenceSection } from "../sections/EvidenceSection";
import { MultilingualSection } from "../sections/MultilingualSection";
import { PersonasSection } from "../sections/PersonasSection";
import { PurposeSection } from "../sections/PurposeSection";
import { ReviewSection } from "../sections/ReviewSection";
import { StandardsSection } from "../sections/StandardsSection";
import { TenderAuditSection } from "../sections/TenderAuditSection";
import { VersionSection } from "../sections/VersionSection";

export function LandingPage({
  navigate,
}: {
  navigate: (v: View, anchor?: string) => void;
}) {
  return (
    <main className="relative z-[1]">
      <Hero onPrimary={() => navigate("demo")} />
      <ProductPreview />
      <PurposeSection />
      <StandardsSection />
      <TenderAuditSection />
      <EvidenceSection />
      <VersionSection />
      <AISection />
      <ReviewSection />
      <FeatureSection />
      <MultilingualSection />
      <PersonasSection />
      <CTASection
        onLaunchDemo={() => navigate("demo")}
        onViewArchitecture={() => navigate("architecture")}
      />
    </main>
  );
}
