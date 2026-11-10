/**
 * Architectural composition after the brand cover: a derwent slab with a
 * quarter-wheel cut out, a gritstone block, a thin ink slab at the edge and a
 * single copper rectangle. The shaft draws once and the wheel turns once on load.
 * All fills come from theme tokens.
 */

const W = 480;
const H = 560;
const STEP = 40;

function gridPath() {
  let d = "";
  for (let x = 0; x <= W; x += STEP) d += `M${x + 0.5} 0V${H}`;
  for (let y = 0; y <= H; y += STEP) d += `M0 ${y + 0.5}H${W}`;
  return d;
}

export function HeroVisual({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      focusable="false"
      className={`block h-auto w-full ${className}`}
    >
      {/* Faint hairline grid */}
      <path d={gridPath()} className="stroke-line" strokeWidth="1" fill="none" shapeRendering="crispEdges" />

      {/* Tall derwent slab */}
      <rect x="120" y="40" width="200" height="480" className="fill-derwent" />

      {/* Gritstone block beside it */}
      <rect x="320" y="200" width="100" height="320" className="fill-gritstone" />

      {/* Thin ink slab at the edge */}
      <rect x="436" y="120" width="8" height="400" className="fill-ink" />

      {/* The single copper accent */}
      <rect x="320" y="176" width="24" height="24" className="fill-copper" />

      {/* Quarter wheel cut out of the derwent slab in the ground colour */}
      <path d="M140 400V250A150 150 0 0 1 290 400Z" className="hero-wheel fill-surface" />

      {/* Drive shaft and square hub */}
      <rect x="140" y="394" width="296" height="12" className="hero-shaft fill-ink" />
      <rect x="124" y="384" width="32" height="32" className="fill-ink" />
    </svg>
  );
}
