---
name: svg-infographic
description: Dynamically display a static SVG infographic file inside a Remotion composition with entrance animation, pan, zoom, or sequential reveal
metadata:
  tags: svg, infographic, staticFile, animation, blockscore
---

# Animating a static SVG infographic in Remotion

> Use case: an SVG infographic already exists on disk (e.g. produced by the `infographic-creator` skill) and you want to bring it into a Remotion video. Reference target: `output/blockscore/infographics/budget-policy-gap-2026-05-05.svg` — a 1080×1350 portrait BlockScore infographic.

## Pick the right pattern

| Want | Pattern | Trade-off |
|------|---------|-----------|
| Just show the infographic, simple fade/scale entrance | **Pattern A — `<Img>` from `staticFile()`** | Cannot animate inner SVG nodes — treats it as one bitmap |
| Pan/zoom over a tall infographic (Ken Burns) | **Pattern B — `<Img>` + transform** | Same limitation, but you control framing per frame |
| Sequentially reveal sections, animate individual stats | **Pattern C — fetch + inline SVG** | More setup, but full per-element control |
| Reveal top→bottom like a scroll | **Pattern D — clip-path mask** | Works on either A or C |

Default for marketing reels: **Pattern B** (pan over the static SVG). For "explainer" videos where each section animates in: **Pattern C**.

---

## Setup (all patterns)

The infographic must live under the Remotion project's `public/` folder so `staticFile()` can resolve it. If the source SVG is elsewhere (the BlockScore output dir is at `c:\dev\obsidian\second-brain-skills\output\blockscore\infographics\`), copy it once into `public/infographics/` of the Remotion project.

```bash
# from the Remotion project root
mkdir -p public/infographics
cp "/c/dev/obsidian/second-brain-skills/output/blockscore/infographics/budget-policy-gap-2026-05-05.svg" public/infographics/
```

Or symlink if you want auto-updates:

```bash
# Windows PowerShell, run as the user (no admin needed for file symlinks on dev mode)
New-Item -ItemType SymbolicLink -Path "public/infographics/budget-policy-gap-2026-05-05.svg" `
  -Target "C:\dev\obsidian\second-brain-skills\output\blockscore\infographics\budget-policy-gap-2026-05-05.svg"
```

---

## Pattern A — `<Img>` with simple fade-and-scale entrance

Best for a quick brand stamp or end card. Treats the SVG as a single image; you cannot animate inner nodes, but the SVG renders crisply at any size because it's still vector.

```tsx
// src/compositions/InfographicShowcase.tsx
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { BlockScoreBackground } from "../brand/blockscore";
import { BLOCKSCORE_EASE } from "../brand/blockscore/easing";

export const InfographicShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, fps * 0.6], [0, 1], {
    extrapolateRight: "clamp",
    easing: BLOCKSCORE_EASE,
  });
  const scale = interpolate(frame, [0, fps * 0.8], [0.96, 1], {
    extrapolateRight: "clamp",
    easing: BLOCKSCORE_EASE,
  });
  const lift = interpolate(frame, [0, fps * 0.8], [16, 0], {
    extrapolateRight: "clamp",
    easing: BLOCKSCORE_EASE,
  });

  return (
    <BlockScoreBackground>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Img
          src={staticFile("infographics/budget-policy-gap-2026-05-05.svg")}
          style={{
            width: 1080,
            height: 1350,
            opacity,
            transform: `translateY(${lift}px) scale(${scale})`,
            // crisp vector rendering
            imageRendering: "auto",
          }}
        />
      </AbsoluteFill>
    </BlockScoreBackground>
  );
};
```

For a 1080×1920 vertical reel canvas the 1080×1350 infographic naturally has 285px of bg padding above + below — that's intentional and matches the BlockScore radial-gradient background.

---

## Pattern B — pan/zoom over a tall infographic (Ken Burns)

The infographic is 1080×1350. On a 1080×1920 reel canvas, animate `translateY` so the top section is in frame at the start and the bottom section by the end. On a 1080×1080 square canvas, you must pan because the SVG is taller than the canvas.

```tsx
// src/compositions/InfographicPan.tsx
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { BlockScoreBackground } from "../brand/blockscore";

const SVG_W = 1080;
const SVG_H = 1350;

export const InfographicPan: React.FC<{
  src?: string;          // staticFile path
  durationFrames?: number;
}> = ({
  src = "infographics/budget-policy-gap-2026-05-05.svg",
  durationFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps, width: cw, height: ch, durationInFrames } = useVideoConfig();
  const total = durationFrames ?? durationInFrames;

  // Fit-width: SVG fills the canvas width, height computed proportionally.
  const renderW = cw;
  const renderH = (cw / SVG_W) * SVG_H; // 1080 -> ch === 1350 if cw===1080

  // How far we need to pan vertically. If SVG fits, no pan needed.
  const overflow = Math.max(0, renderH - ch);

  // Hold first second, pan over middle, hold last second.
  const holdIn = fps;          // 1s
  const holdOut = fps;          // 1s
  const panEnd = total - holdOut;

  const y = interpolate(
    frame,
    [holdIn, panEnd],
    [0, -overflow],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.42, 0, 0.58, 1), // smoother in-out for pan
    }
  );

  // Fade-in at the very start
  const opacity = interpolate(frame, [0, fps * 0.4], [0, 1], { extrapolateRight: "clamp" });

  return (
    <BlockScoreBackground>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile(src)}
          style={{
            width: renderW,
            height: renderH,
            transform: `translateY(${y}px)`,
            opacity,
          }}
        />
      </AbsoluteFill>
    </BlockScoreBackground>
  );
};
```

Composition wiring (square 1080×1080, 12s pan):

```tsx
<Composition
  id="BudgetPolicyGapPan"
  component={InfographicPan}
  durationInFrames={360}
  fps={30}
  width={1080}
  height={1080}
  defaultProps={{
    src: "infographics/budget-policy-gap-2026-05-05.svg",
    durationFrames: 360,
  }}
/>
```

Tip: for a story canvas (1080×1920), set `height = ch * 1.05` instead of fit-width so the SVG slightly overflows and the pan has somewhere to go.

---

## Pattern C — inline the SVG and animate individual elements

Fetch the SVG body, inject inline, then animate any element by id/class. Use this when you want the score number to count up, sections to fade in sequentially, or specific stats to highlight.

### C.1 — Load the SVG asynchronously

```tsx
// src/compositions/useStaticSvg.ts
import { useEffect, useState } from "react";
import { delayRender, continueRender, staticFile } from "remotion";

export function useStaticSvg(srcPath: string): string | null {
  const [svg, setSvg] = useState<string | null>(null);
  const [handle] = useState(() => delayRender(`load:${srcPath}`));

  useEffect(() => {
    fetch(staticFile(srcPath))
      .then((r) => r.text())
      .then((text) => {
        setSvg(text);
        continueRender(handle);
      })
      .catch((err) => {
        console.error("svg load failed", err);
        continueRender(handle);
      });
  }, [srcPath, handle]);

  return svg;
}
```

### C.2 — Inject + animate

```tsx
// src/compositions/InfographicReveal.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { useStaticSvg } from "./useStaticSvg";
import { BlockScoreBackground } from "../brand/blockscore";

export const InfographicReveal: React.FC = () => {
  const svg = useStaticSvg("infographics/budget-policy-gap-2026-05-05.svg");
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!svg) return <BlockScoreBackground />;

  // Vertical reveal-up: shift the whole SVG up 24px and fade in over 0.8s.
  const lift = interpolate(frame, [0, fps * 0.8], [24, 0], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const opacity = interpolate(frame, [0, fps * 0.6], [0, 1], { extrapolateRight: "clamp" });

  return (
    <BlockScoreBackground>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: 1080,
            height: 1350,
            opacity,
            transform: `translateY(${lift}px)`,
          }}
          // Inline injection — preserves <text>, <linearGradient>, etc. so you can target by id/class.
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </AbsoluteFill>
    </BlockScoreBackground>
  );
};
```

### C.3 — Animate a specific element by id/class

If you author the SVG with `id="hero-number"` on a `<text>` node, you can target it after injection:

```tsx
import { useEffect, useRef } from "react";

// inside the component, after `svg` is loaded and the div is rendered:
const ref = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!ref.current) return;
  const node = ref.current.querySelector<SVGTextElement>("#hero-number");
  if (!node) return;
  // Map a frame range to a count-up: 0 -> targetValue
  const t = Math.min(1, Math.max(0, (frame - fps) / (fps * 1.2)));
  const target = 47; // example
  node.textContent = `${Math.round(t * target)}%`;
}, [frame, fps]);

return (
  <div ref={ref} dangerouslySetInnerHTML={{ __html: svg }} />
);
```

Keep DOM mutations idempotent — Remotion may render the same frame multiple times for parallel encoding.

For sectional reveal, scope by `<g id="section-1">`, `<g id="section-2">` etc. and animate `opacity` / `transform` per group:

```tsx
useEffect(() => {
  if (!ref.current) return;
  const sections = ref.current.querySelectorAll<SVGGElement>('[id^="section-"]');
  sections.forEach((s, i) => {
    const start = fps * (0.4 + i * 0.6);   // 0.4s base + 0.6s stagger
    const t = Math.min(1, Math.max(0, (frame - start) / (fps * 0.8)));
    s.style.opacity = String(t);
    s.style.transform = `translateY(${(1 - t) * 24}px)`;
    s.style.transition = "none";  // Remotion forbids CSS transitions
  });
}, [frame, fps]);
```

> **Reminder:** Remotion forbids CSS animations and transitions. Set `transition: "none"` on any element you mutate per-frame so a stale browser default doesn't interfere.

---

## Pattern D — top-to-bottom reveal via clip-path

Cheaper than C — works on the `<Img>` from Pattern A. Useful for "the infographic draws itself" effect.

```tsx
const reveal = interpolate(frame, [0, fps * 2.5], [0, 100], {
  extrapolateRight: "clamp",
  easing: Easing.bezier(0.16, 1, 0.3, 1),
});

<Img
  src={staticFile("infographics/budget-policy-gap-2026-05-05.svg")}
  style={{
    width: 1080,
    height: 1350,
    clipPath: `inset(0 0 ${100 - reveal}% 0)`,  // reveal from top
  }}
/>
```

---

## Recommended composition for `budget-policy-gap-2026-05-05.svg`

The infographic is portrait 1080×1350. Three good targets:

### Reel (1080×1920, 15s)
Pan from 0 to overflow + 1s hold at top + 1s hold at bottom. Use Pattern B with `renderW = 1080`.

### Square (1080×1080, 10s)
Must pan because SVG is taller than canvas. Pattern B as written above.

### Hero (1920×1080, 8s)
SVG is portrait but canvas is landscape — fit-height. Center horizontally with negative margin or `objectFit: contain`. Add a left-side title card alongside.

```tsx
<AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
  <div style={{ flex: 1, padding: 96, display: "flex", flexDirection: "column", justifyContent: "center" }}>
    <h1 style={{ ...BLOCKSCORE_TYPE.h1, fontSize: 84 }}>The budget vs policy gap</h1>
    <p style={{ ...BLOCKSCORE_TYPE.body, fontSize: 28 }}>What strata managers see when the spend doesn't match the plan.</p>
  </div>
  <div style={{ width: 770, height: "100%", display: "flex", alignItems: "center" }}>
    <Img src={staticFile("infographics/budget-policy-gap-2026-05-05.svg")}
         style={{ width: 770, height: (770/1080)*1350 }} />
  </div>
</AbsoluteFill>
```

---

## Verifying it renders

The infographic embeds `Inter Tight`, `Inter`, and `Geist Mono` via `font-family` declarations. Remotion's Chromium frame renderer respects them only if those fonts are installed in the Studio environment OR loaded via `@remotion/google-fonts` (see `rules/blockscore-brand.md` section 2). If you skip the font loaders, the SVG will fall back to `system-ui` and look off-brand.

Sanity check:

```bash
npx remotion still BudgetPolicyGapPan --scale=0.5 --frame=60 -o test.png
```

Open `test.png` — inspect that:
- BlockScore wordmark is in Inter Tight (not Arial fallback)
- Italic emph phrase has the gradient fill
- Pan position at frame 60 is not stuck at the top

---

## Don'ts

- **No `<img>` (lowercase) from `next/image` etc.** — use Remotion's `<Img>` from `remotion`. It calls `delayRender`/`continueRender` so the frame doesn't render until the SVG decodes.
- **No CSS animations / transitions** on the inlined SVG (`transition`, `@keyframes`). Use `interpolate(frame,…)` only.
- **No `staticFile()` outside `public/`** — it resolves relative to that directory.
- **No `dangerouslySetInnerHTML` of untrusted SVG** — fine here because the file is your own brand asset, but never inject user-uploaded SVG without sanitisation (it can contain `<script>`).
- **No font assumption** — if the rendering env lacks Inter Tight, the SVG's CSS fallbacks kick in (`system-ui`). Pre-load via `@remotion/google-fonts` in the same composition tree.
