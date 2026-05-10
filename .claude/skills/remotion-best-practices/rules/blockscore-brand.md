---
name: blockscore-brand
description: BlockScore brand bindings for Remotion compositions — colors, fonts, gradient, logo mark, motion conventions
metadata:
  tags: brand, blockscore, design-tokens, remotion
---

# BlockScore Brand in Remotion

> **Single source of truth:** `.claude/skills/_shared/blockscore/tokens.md` and `tokens.json`.
> This file is the Remotion-flavoured binding — same tokens, expressed as TS constants, components, and motion patterns.
> If anything here conflicts with the canonical files, the canonical wins. Re-sync rather than diverge.

## When to use

Whenever you are building a Remotion video for the BlockScore brand. Triggers:
- User asks for "BlockScore video", "BlockScore reel", "BlockScore explainer", "BlockScore intro/outro"
- Project is `remotion-videos/blockscore-*` or props/composition id includes `blockscore`
- User pastes BlockScore content (gauge, score, anonymous tenant feedback) and asks for a video

For brand definitions outside Remotion (web, slides, infographics) consult the canonical tokens file directly.

---

## 1. Color tokens (TS module)

Create `src/brand/blockscore/tokens.ts` and import everywhere — never hardcode hex in components.

```ts
// src/brand/blockscore/tokens.ts
// Source of truth: .claude/skills/_shared/blockscore/tokens.json
// Re-sync rather than edit here.

export const BLOCKSCORE_DARK = {
  bg:           "#0d2e28",
  bgAlt:        "#0a231e",
  surface:      "#113a33",
  surfaceAlt:   "#15473e",
  muted:        "#15473e",
  border:       "#165046",
  textPrimary:  "#ffffff",
  textBody:     "#a1e8d9",
  textBright:   "#6ffce0",
  primary:      "#4dd4c6", // BlockScore Teal
  secondary:    "#2dd4aa", // Mint
  chart3:       "#1a8a7d",
  chart4:       "#6ffce0",
  chart5:       "#4df4d4",
  ring:         "#4dd4c6",
  destructive:  "#ef4444",
} as const;

export const BLOCKSCORE_LIGHT = {
  bg:           "#ffffff",
  foreground:   "#0f172a",
  surface:      "#ffffff",
  primary:      "#0d8070",
  secondary:    "#2aa08a",
  muted:        "#f1f8f6",
  mutedFg:      "#086b5e",
  accent:       "#e4f4f0",
  accentFg:     "#053d36",
  border:       "#b2e0d6",
  ring:         "#0d8070",
} as const;

// 135deg gradient — hex fallback (Remotion canvas does not support oklch in all renderers)
export const BLOCKSCORE_GRADIENT_STOPS = [
  "#0d8070",
  "#2aa08a",
  "#4dd4c6",
] as const;

export const BLOCKSCORE_GRADIENT_CSS =
  `linear-gradient(135deg, ${BLOCKSCORE_GRADIENT_STOPS.join(", ")})`;

// Soft shadows mirroring --shadow-md / --shadow-lg
export const BLOCKSCORE_SHADOWS = {
  md:   "0 2px 4px rgba(8,27,24,.04), 0 8px 24px rgba(8,27,24,.06)",
  lg:   "0 1px 2px rgba(8,27,24,.04), 0 24px 48px -12px rgba(8,27,24,.12), 0 8px 16px -8px rgba(8,27,24,.08)",
  glow: "0 0 0 1px rgba(13,128,112,.08), 0 20px 60px -20px rgba(13,128,112,.35)",
} as const;
```

---

## 2. Fonts (Inter Tight + Geist Mono via `@remotion/google-fonts`)

The brand uses three families. All available on Google Fonts. Load each with only the weights actually used to keep render fast.

```ts
// src/brand/blockscore/fonts.ts
import { loadFont as loadInterTight } from "@remotion/google-fonts/InterTight";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadGeistMono } from "@remotion/google-fonts/GeistMono";

const interTight = loadInterTight("normal", {
  weights: ["500", "700"],
  subsets: ["latin"],
});
const inter = loadInter("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});
const geistMono = loadGeistMono("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

export const BLOCKSCORE_FONTS = {
  display: interTight.fontFamily,   // H1/H2/H3, big metrics, italic emph
  body:    inter.fontFamily,        // body copy
  mono:    geistMono.fontFamily,    // eyebrows, numerics, code
} as const;
```

Install once:

```bash
npx remotion add @remotion/google-fonts
```

If `@remotion/google-fonts/InterTight` or `GeistMono` is missing in the installed version, fall back to `Inter` + `JetBrainsMono` and document the substitution in the composition. Never silently swap to a non-brand font (Roboto, Montserrat, etc.).

---

## 3. Gradient + italic emphasis (`<Emph>` component)

Brand signature: italic word inside a headline, filled with the 135° gradient. In CSS this is `background-clip: text`. In Remotion this works because output is a browser/Chromium-rendered frame.

```tsx
// src/brand/blockscore/Emph.tsx
import React from "react";
import { BLOCKSCORE_GRADIENT_CSS } from "./tokens";

export const Emph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <em
    style={{
      fontStyle: "italic",
      backgroundImage: BLOCKSCORE_GRADIENT_CSS,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      // keep italic offset minimal so it doesn't clip glyphs
      paddingInline: "0.05em",
    }}
  >
    {children}
  </em>
);
```

Use sparingly — one phrase per scene, max two per composition.

---

## 4. 3×3 logo mark + wordmark

Brand stamp. Drop into intro/outro. The mark scales — pass a `size` prop.

```tsx
// src/brand/blockscore/Logo.tsx
import React from "react";
import { BLOCKSCORE_DARK, BLOCKSCORE_FONTS } from "./tokens";

export const BlockScoreMark: React.FC<{ size?: number }> = ({ size = 26 }) => {
  const C = BLOCKSCORE_DARK;
  return (
    <svg width={size} height={size} viewBox="0 0 26 26">
      <rect x="0"   y="0"   width="7" height="7" rx="1.6" fill={C.border}/>
      <rect x="9.5" y="0"   width="7" height="7" rx="1.6" fill={C.border}/>
      <rect x="19"  y="0"   width="7" height="7" rx="1.6" fill={C.textBright}/>
      <rect x="0"   y="9.5" width="7" height="7" rx="1.6" fill={C.border}/>
      <rect x="9.5" y="9.5" width="7" height="7" rx="1.6" fill={C.secondary}/>
      <rect x="19"  y="9.5" width="7" height="7" rx="1.6" fill={C.chart3}/>
      <rect x="0"   y="19"  width="7" height="7" rx="1.6" fill={C.secondary}/>
      <rect x="9.5" y="19"  width="7" height="7" rx="1.6" fill={C.textBright}/>
      <rect x="19"  y="19"  width="7" height="7" rx="1.6" fill={C.chart5}/>
    </svg>
  );
};

export const BlockScoreWordmark: React.FC<{ size?: number }> = ({ size = 26 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: size * 0.4 }}>
    <BlockScoreMark size={size * 1.3} />
    <span
      style={{
        fontFamily: BLOCKSCORE_FONTS.display,
        fontWeight: 700,
        fontSize: size,
        letterSpacing: "-0.02em",
        color: BLOCKSCORE_DARK.textPrimary,
      }}
    >
      Block<span style={{ color: BLOCKSCORE_DARK.primary }}>Score</span>
    </span>
  </div>
);
```

---

## 5. Score gauge (animated)

The brand's hero element. Animate stroke-dashoffset over a window, holding at the target value. `pathLength={100}` keeps math trivial.

```tsx
// src/brand/blockscore/ScoreGauge.tsx
import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { BLOCKSCORE_DARK, BLOCKSCORE_FONTS, BLOCKSCORE_GRADIENT_STOPS } from "./tokens";

export const ScoreGauge: React.FC<{
  score: number;          // 0-100 target
  size?: number;
  inFrame?: number;       // frame to start animation
  durationFrames?: number;
}> = ({ score, size = 260, inFrame = 0, durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = durationFrames ?? Math.round(1.4 * fps);
  const C = BLOCKSCORE_DARK;
  const r = size / 2 - 10;

  const progress = interpolate(frame, [inFrame, inFrame + dur], [0, score], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      <svg width={size} height={size} viewBox={`-${size/2} -${size/2} ${size} ${size}`}>
        <defs>
          <linearGradient id="bsGauge" x1="0" y1="0" x2="1" y2="1">
            {BLOCKSCORE_GRADIENT_STOPS.map((s, i) => (
              <stop key={s} offset={`${(i / (BLOCKSCORE_GRADIENT_STOPS.length - 1)) * 100}%`} stopColor={s}/>
            ))}
          </linearGradient>
        </defs>
        <circle r={r} fill="none" stroke={C.border} strokeWidth={10}/>
        <circle
          r={r}
          fill="none"
          stroke="url(#bsGauge)"
          strokeWidth={10}
          pathLength={100}
          strokeDasharray={`${progress} 100`}
          strokeLinecap="round"
          transform="rotate(-90)"
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center",
        fontFamily: BLOCKSCORE_FONTS.display, color: C.primary,
        fontWeight: 500, letterSpacing: "-0.04em",
      }}>
        <div style={{ fontSize: size * 0.32 }}>{Math.round(progress)}</div>
        <div style={{
          fontSize: size * 0.06, color: C.textBody, opacity: 0.8,
          fontFamily: BLOCKSCORE_FONTS.body, fontWeight: 400,
        }}>/100</div>
      </div>
    </div>
  );
};
```

---

## 6. Brand background (`<BlockScoreBackground>`)

Default canvas — radial teal glow + dark base. Drop into root of any scene.

```tsx
// src/brand/blockscore/BlockScoreBackground.tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import { BLOCKSCORE_DARK } from "./tokens";

export const BlockScoreBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{
    background: `
      radial-gradient(120% 80% at 50% 0%, ${BLOCKSCORE_DARK.surface} 0%, ${BLOCKSCORE_DARK.bg} 55%, ${BLOCKSCORE_DARK.bgAlt} 100%)
    `,
  }}>
    {children}
  </AbsoluteFill>
);
```

---

## 7. Composition presets

Brand-aligned canvas + duration starter values. Pick by use case.

| Use | Composition id | width × height | fps | default frames |
|-----|----------------|----------------|-----|----------------|
| Vertical reel / story | `BlockScoreReel` | 1080 × 1920 | 30 | 450 (15s) |
| Square feed | `BlockScoreSquare` | 1080 × 1080 | 30 | 360 (12s) |
| Hero / YouTube | `BlockScoreHero` | 1920 × 1080 | 30 | 600 (20s) |
| OG share | `BlockScoreOG` | 1200 × 630 | 30 | 180 (6s) |

```tsx
// src/Root.tsx
import { Composition } from "remotion";
import { BlockScoreReel } from "./compositions/BlockScoreReel";
import { BlockScoreHero } from "./compositions/BlockScoreHero";

export const RemotionRoot = () => (
  <>
    <Composition id="BlockScoreReel" component={BlockScoreReel}
      durationInFrames={450} fps={30} width={1080} height={1920}/>
    <Composition id="BlockScoreHero" component={BlockScoreHero}
      durationInFrames={600} fps={30} width={1920} height={1080}/>
  </>
);
```

---

## 8. Motion conventions

Match the landing-page motion language so video and web feel like one product.

- **Easing:** `Easing.bezier(0.16, 1, 0.3, 1)` (matches the landing site's `cubic-bezier(.2,.7,.2,1)` family). Use this for fades, slides, gauge fills.
- **Reveal-up pattern:** translateY 16-24px → 0, opacity 0 → 1, over `0.8s` (~24 frames at 30fps).
- **Stagger:** 4-6 frame offsets between sibling reveals — never simultaneous.
- **Italic emph reveal:** delay the emphasized phrase 6-8 frames after the rest of the headline so the gradient word "lands" last.
- **Loop pulse (the Loop visual):** 14s sine-wave opacity 0.4 → 1 → 0.4 on orbital arcs.
- **Hold time:** any text on screen ≥ 1.5s at 30fps (45 frames). Big metrics ≥ 2.5s.

```ts
// shared easing
import { Easing } from "remotion";
export const BLOCKSCORE_EASE = Easing.bezier(0.16, 1, 0.3, 1);
```

---

## 9. Type styles in Remotion (matches tokens.md hierarchy)

Wrap into a `BLOCKSCORE_TYPE` style map — apply via `style={{ ...BLOCKSCORE_TYPE.h1 }}`.

```ts
// src/brand/blockscore/typography.ts
import { BLOCKSCORE_FONTS, BLOCKSCORE_DARK } from "./tokens";

export const BLOCKSCORE_TYPE = {
  h1: {
    fontFamily: BLOCKSCORE_FONTS.display,
    fontWeight: 500,
    letterSpacing: "-0.035em",
    lineHeight: 0.98,
    color: BLOCKSCORE_DARK.textPrimary,
    fontSize: 96,
  },
  h2: {
    fontFamily: BLOCKSCORE_FONTS.display,
    fontWeight: 500,
    letterSpacing: "-0.03em",
    lineHeight: 1.02,
    color: BLOCKSCORE_DARK.textPrimary,
    fontSize: 56,
  },
  h3: {
    fontFamily: BLOCKSCORE_FONTS.display,
    fontWeight: 500,
    letterSpacing: "-0.015em",
    color: BLOCKSCORE_DARK.textPrimary,
    fontSize: 28,
  },
  body: {
    fontFamily: BLOCKSCORE_FONTS.body,
    fontWeight: 400,
    letterSpacing: "-0.003em",
    color: BLOCKSCORE_DARK.textBody,
    fontSize: 24,
    lineHeight: 1.55,
  },
  mono: {
    fontFamily: BLOCKSCORE_FONTS.mono,
    fontWeight: 500,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: BLOCKSCORE_DARK.textBody,
    fontSize: 16,
  },
  metric: {
    fontFamily: BLOCKSCORE_FONTS.display,
    fontWeight: 500,
    letterSpacing: "-0.04em",
    color: BLOCKSCORE_DARK.primary,
    fontSize: 160,
    lineHeight: 1,
  },
} as const;
```

---

## 10. Don'ts (Remotion-specific)

- **No CSS animations or Tailwind animation classes** — Remotion forbids them (will not render). Use `interpolate` + `useCurrentFrame` only. (Same rule as the rest of this skill — but easy to forget when porting brand CSS.)
- **No `oklch()` colors** in style props for video output — convert to hex via `BLOCKSCORE_GRADIENT_STOPS`. The Chromium frame renderer supports oklch in modern versions, but raster output via FFmpeg pipelines downstream may not. Hex is safe.
- **No CSS variables** (`var(--primary)`) inside Remotion components — use the imported TS constants. Custom-property cascade is brittle across composition isolation.
- **No `font-style: italic` without the `<Emph>` gradient wrapper** — the brand convention is italic + gradient together. Plain italics look like an accident.
- **No `var(--gradient)`** strings — use `BLOCKSCORE_GRADIENT_CSS` or `BLOCKSCORE_GRADIENT_STOPS`.
- **No mixing dark- and light-mode tokens in one composition** — pick one and stick with it. Default is dark.

---

## 11. Files to create on first BlockScore video project

```
src/brand/blockscore/
  tokens.ts            # section 1
  fonts.ts             # section 2
  typography.ts        # section 9
  Emph.tsx             # section 3
  Logo.tsx             # section 4
  ScoreGauge.tsx       # section 5
  BlockScoreBackground.tsx   # section 6
  index.ts             # re-export all of the above
```

Then in any composition:

```tsx
import {
  BlockScoreBackground, BlockScoreWordmark, ScoreGauge, Emph,
  BLOCKSCORE_TYPE, BLOCKSCORE_DARK, BLOCKSCORE_EASE,
} from "../brand/blockscore";
```

Single import surface keeps compositions tidy and makes brand re-syncs to canonical tokens a one-file edit.

---

## 12. Sync protocol

When `_shared/blockscore/tokens.json` changes:
1. Regenerate `src/brand/blockscore/tokens.ts` from `tokens.json` (manual copy or a small build script).
2. If new fonts appear in `tokens.md`, update `fonts.ts`.
3. Bump `BLOCKSCORE_TYPE` sizes only when the canonical hierarchy table changes — do not skin per-video.
