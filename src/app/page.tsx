"use client";

/**
 * CHANAKYA — application shell
 * -------------------------------------------------------------
 * Demo navigation (hash-based, client-side):
 *   #/              → cinematic landing page
 *   #/demo          → mock Procurement Officer dashboard
 *   #/architecture  → system architecture overview
 *   #/docs          → documentation
 *
 * The React layer is a presentation/demo surface only. The
 * production frontend remains Streamlit + Python.
 */

import { AnimatePresence, motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import { Footer } from "@/components/chanakya/Footer";
import { Navbar, type View } from "@/components/chanakya/Navbar";
import { AmbientBackground } from "@/components/chanakya/primitives";
import { ArchitecturePage } from "@/components/chanakya/pages/ArchitecturePage";
import { DemoPage } from "@/components/chanakya/pages/DemoPage";
import { DocsPage } from "@/components/chanakya/pages/DocsPage";
import { LandingPage } from "@/components/chanakya/pages/LandingPage";

const VIEWS: View[] = ["landing", "demo", "architecture", "docs"];

function viewFromHash(hash: string): View {
  const clean = hash.replace(/^#\/?/, "").split("?")[0].toLowerCase();
  return (VIEWS.find((v) => v === clean) ?? "landing") as View;
}

/* external store: window.location.hash → View */
const subscribeHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};
const getSnapshot = (): View => viewFromHash(window.location.hash);
const getServerSnapshot = (): View => "landing";

/* hydration flag without setState-in-effect */
const subscribeNoop = () => () => {};
const getClientTrue = () => true;
const getServerFalse = () => false;

export default function Home() {
  const view = useSyncExternalStore(subscribeHash, getSnapshot, getServerSnapshot);
  const mounted = useSyncExternalStore(subscribeNoop, getClientTrue, getServerFalse);

  const prevView = useRef<View>("landing");
  const pendingAnchor = useRef<string | null>(null);

  /* react to view changes: scroll to top or resolve pending anchor */
  useEffect(() => {
    if (prevView.current === view) return;
    prevView.current = view;
    const anchor = pendingAnchor.current;
    if (anchor) {
      pendingAnchor.current = null;
      const t = setTimeout(() => {
        document
          .getElementById(anchor)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 520);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [view]);

  /* navigate between views (and optionally to a section anchor) */
  const navigate = useCallback(
    (v: View, anchor?: string) => {
      const target = `#/${v === "landing" ? "" : v}`;
      const sameView = v === view;

      if (!anchor || anchor === "top") {
        if (sameView) window.scrollTo({ top: 0, behavior: "smooth" });
        pendingAnchor.current = null;
      } else if (sameView) {
        /* defer past the click-event lifecycle — smooth scrolls issued
           synchronously inside React handlers can be cancelled */
        setTimeout(() => {
          document
            .getElementById(anchor)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 60);
      } else {
        pendingAnchor.current = anchor;
      }

      if (window.location.hash !== target) {
        window.location.hash = target;
      } else if (sameView) {
        /* same hash — force nothing; view already current */
      }
    },
    [view]
  );

  /* Avoid hydration mismatch for deep links: render landing on the
     server pass, then swap once mounted. */
  const activeView = mounted ? view : "landing";
  const isLanding = activeView === "landing";

  return (
    <div className="relative flex min-h-screen flex-col bg-[#000000] text-white">
      {/* atmospheric gradients — landing only */}
      {isLanding && <AmbientBackground />}

      {/* marketing navbar — hidden inside the fullscreen demo app mock */}
      {activeView !== "demo" && <Navbar view={activeView} navigate={navigate} />}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.21, 0.6, 0.35, 1] }}
          className="flex flex-1 flex-col"
        >
          {activeView === "landing" && <LandingPage navigate={navigate} />}
          {activeView === "demo" && <DemoPage navigate={navigate} />}
          {activeView === "architecture" && <ArchitecturePage navigate={navigate} />}
          {activeView === "docs" && <DocsPage navigate={navigate} />}
        </motion.div>
      </AnimatePresence>

      {activeView !== "demo" && <Footer navigate={navigate} />}
    </div>
  );
}
