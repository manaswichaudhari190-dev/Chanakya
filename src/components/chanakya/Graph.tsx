"use client";

/**
 * CHANAKYA — responsive graph canvas
 * A measured SVG layer with curved, directional edges and
 * absolutely-positioned node chips on top. Hovering a node
 * brightens its edges and dims the rest.
 */

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type ReactNode } from "react";

export type GraphNode = {
  id: string;
  label: string;
  sublabel?: string;
  x: number; // fraction 0..1
  y: number; // fraction 0..1
  kind?: "center" | "standard" | "meta" | "result";
  pulse?: boolean;
};

export type GraphEdge = { from: string; to: string };

export function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        setSize({ width: e.contentRect.width, height: e.contentRect.height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, size };
}

function bezier(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): { d: string; end: { x: number; y: number }; mid: { x: number; y: number } } {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const c1x = x1 + dx * 0.38 - dy * 0.08;
  const c1y = y1 + dy * 0.38 + dx * 0.08;
  const c2x = x2 - dx * 0.38 - dy * 0.08;
  const c2y = y2 - dy * 0.38 + dx * 0.08;
  const midT = 0.55;
  const mid = {
    x:
      (1 - midT) ** 3 * x1 +
      3 * (1 - midT) ** 2 * midT * c1x +
      3 * (1 - midT) * midT ** 2 * c2x +
      midT ** 3 * x2,
    y:
      (1 - midT) ** 3 * y1 +
      3 * (1 - midT) ** 2 * midT * c1y +
      3 * (1 - midT) * midT ** 2 * c2y +
      midT ** 3 * y2,
  };
  return {
    d: `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`,
    end: { x: x2, y: y2 },
    mid,
  };
}

export function GraphCanvas({
  nodes,
  edges,
  height = 460,
  activeNode,
  onHoverNode,
  onLeaveNode,
  caption,
  arrow = true,
}: {
  nodes: GraphNode[];
  edges: GraphEdge[];
  height?: number;
  activeNode?: string | null;
  onHoverNode?: (id: string) => void;
  onLeaveNode?: () => void;
  caption?: ReactNode;
  arrow?: boolean;
}) {
  const { ref, size } = useElementSize<HTMLDivElement>();
  const [hovered, setHovered] = useState<string | null>(null);
  const effective = hovered ?? activeNode ?? null;

  const byId = (id: string) => nodes.find((n) => n.id === id)!;
  const px = (n: GraphNode) => ({ x: n.x * size.width, y: n.y * size.height });

  return (
    <div
      ref={ref}
      className="chk-panel relative w-full select-none overflow-hidden"
      style={{ height }}
    >
      {/* vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(8,9,10,0.55) 100%)",
        }}
      />

      {/* SVG edge layer */}
      {size.width > 0 && (
        <svg
          className="absolute inset-0 z-[2]"
          width={size.width}
          height={size.height}
          aria-hidden
        >
          <defs>
            <marker
              id="chk-arrow-dim"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="8"
              markerHeight="8"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 7 4 L 0 7 z" fill="rgba(255,255,255,0.38)" />
            </marker>
            <marker
              id="chk-arrow-bright"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="8"
              markerHeight="8"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 7 4 L 0 7 z" fill="#3FB8AF" />
            </marker>
          </defs>
          {edges.map((e) => {
            const a = px(byId(e.from));
            const b = px(byId(e.to));
            /* trim endpoints so arrowheads land at node edges, not centers */
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const len = Math.hypot(dx, dy) || 1;
            const trimTotal = 60 + 54;
            const scale =
              len > trimTotal + 24 ? 1 : (len - 24) / trimTotal;
            const ax = a.x + (dx / len) * 60 * scale;
            const ay = a.y + (dy / len) * 60 * scale;
            const bx = b.x - (dx / len) * 54 * scale;
            const by = b.y - (dy / len) * 54 * scale;
            const path = bezier(ax, ay, bx, by);
            const isActive =
              effective !== null &&
              (e.from === effective || e.to === effective);
            const dimmed = effective !== null && !isActive;
            return (
              <g key={`${e.from}-${e.to}`}>
                {/* wide soft hit area for glow */}
                <path
                  d={path.d}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={10}
                  className="cursor-pointer"
                />
                <path
                  d={path.d}
                  fill="none"
                  stroke={isActive ? "#3FB8AF" : "rgba(255,255,255,0.14)"}
                  strokeWidth={isActive ? 1.4 : 1}
                  className={cn(isActive && "chk-edge")}
                  markerEnd={
                    arrow && size.width > 620
                      ? isActive
                        ? "url(#chk-arrow-bright)"
                        : "url(#chk-arrow-dim)"
                      : undefined
                  }
                  style={{
                    opacity: dimmed ? 0.3 : 1,
                    transition: "stroke 400ms, opacity 400ms, stroke-width 400ms",
                  }}
                />
                {isActive && (
                  <circle
                    cx={path.mid.x}
                    cy={path.mid.y}
                    r="2.5"
                    fill="#3FB8AF"
                    className="chk-pulse"
                  />
                )}
              </g>
            );
          })}
        </svg>
      )}

      {/* node layer */}
      {nodes.map((n) => {
        const isActive = effective === n.id;
        const dimmed = effective !== null && !isActive && n.kind !== "center";
        const isCenter = n.kind === "center";
        return (
          <div
            key={n.id}
            className="absolute z-[3] -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x * 100}%`, top: `${n.y * 100}%` }}
            onMouseEnter={() => {
              setHovered(n.id);
              onHoverNode?.(n.id);
            }}
            onMouseLeave={() => {
              setHovered(null);
              onLeaveNode?.();
            }}
          >
            <div
              className={cn(
                "flex cursor-default flex-col items-center justify-center rounded-xl border text-center transition-all duration-500",
                isCenter
                  ? "min-w-[128px] gap-1 border-[#3FB8AF]/40 bg-[#161718] px-5 py-3 shadow-[0_0_36px_-8px_rgba(63,184,175,0.4)]"
                  : n.kind === "standard"
                    ? "min-w-[96px] border-white/[0.1] bg-[#0F1011] px-3.5 py-2.5"
                    : "min-w-[92px] border-white/[0.08] bg-[#0F1011] px-3 py-2",
                isActive &&
                  !isCenter &&
                  "-translate-y-[2px] border-[#3FB8AF]/45 shadow-[0_0_24px_-6px_rgba(63,184,175,0.45)]",
                dimmed && "opacity-[0.38]"
              )}
            >
              {isCenter ? (
                <>
                  <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#3FB8AF]">
                    Requirement
                  </span>
                  <span className="text-[14.5px] font-semibold tracking-tight text-white">
                    {n.label}
                  </span>
                </>
              ) : (
                <>
                  <span
                    className={cn(
                      "text-[12px] font-medium",
                      n.kind === "standard" ? "text-white" : "text-white/88"
                    )}
                  >
                    {n.label}
                  </span>
                  {n.sublabel && (
                    <span className="mt-[2px] max-w-[130px] text-[9.5px] leading-[1.35] text-white/60">
                      {n.sublabel}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}

      {caption && (
        <div className="absolute bottom-3.5 left-1/2 z-[4] -translate-x-1/2">
          {caption}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile fallback — simplified vertical relationships                */
/* ------------------------------------------------------------------ */

export function GraphMobileList({
  centerLabel,
  items,
}: {
  centerLabel: string;
  items: { label: string; sublabel?: string }[];
}) {
  return (
    <div className="chk-panel md:hidden">
      <div className="flex flex-col items-center px-5 pb-6 pt-6">
        <div className="flex flex-col items-center rounded-xl border border-[#3FB8AF]/40 bg-[#161718] px-6 py-3 shadow-[0_0_30px_-10px_rgba(63,184,175,0.45)]">
          <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#3FB8AF]">
            Requirement
          </span>
          <span className="text-[15px] font-semibold text-white">
            {centerLabel}
          </span>
        </div>
        <div className="h-6 w-[1px] bg-white/[0.12]" />
        <ul className="w-full max-w-[320px] flex-col gap-2">
          {items.map((it) => (
            <li key={it.label} className="flex flex-col items-center">
              <div className="flex w-full items-center justify-between rounded-lg border border-white/[0.08] bg-[#0F1011] px-4 py-2.5">
                <span className="text-[12.5px] font-medium text-white/88">
                  {it.label}
                </span>
                {it.sublabel && (
                  <span className="text-[10px] text-white/60">
                    {it.sublabel}
                  </span>
                )}
              </div>
              <div className="h-2 w-[1px] bg-white/[0.09]" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
