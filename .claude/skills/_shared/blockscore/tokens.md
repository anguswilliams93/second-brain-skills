# BlockScore Design Tokens — Single Source of Truth

> **This file is the canonical brand spec for ALL BlockScore content.** Sourced from `design_handoff_blockscore_landing/` (Tailwind v4 + shadcn handoff). Skills consuming this: `pptx-generator`, `infographic-creator`, `design`, `brand-voice-generator`.
>
> **Do not branch.** If a skill needs a tweak, update this file first, then propagate.

Companion files in this directory:
- `globals.css` — verbatim CSS custom properties for web/design outputs
- `tokens.json` — machine-readable colors/fonts for python-pptx and other scripts

---

## Color tokens

### Light mode (default)

| Token | Hex | Role |
|-------|-----|------|
| `--background` | `#ffffff` | Page bg |
| `--foreground` | `#0f172a` | Primary text |
| `--card` | `#ffffff` | Surface |
| `--card-foreground` | `#0f172a` | Surface text |
| `--popover` | `#ffffff` | Popover surface |
| `--popover-foreground` | `#0f172a` | Popover text |
| `--primary` | `#0d8070` | Hero accent (CTAs, links, hero gauge) |
| `--primary-foreground` | `#ffffff` | Text on primary |
| `--secondary` | `#2aa08a` | Secondary accent |
| `--secondary-foreground` | `#ffffff` | Text on secondary |
| `--muted` | `#f1f8f6` | Subtle bg, methodology section, stats strip |
| `--muted-foreground` | `#086b5e` | Subtle text, eyebrows |
| `--accent` | `#e4f4f0` | Tonal highlights |
| `--accent-foreground` | `#053d36` | Text on accent |
| `--border` | `#b2e0d6` | Hairlines, card borders |
| `--input` | `#b2e0d6` | Form input borders |
| `--ring` | `#0d8070` | Focus rings |
| `--chart-1` | `#0d8070` | Chart primary |
| `--chart-2` | `#2aa08a` | Chart secondary |
| `--chart-3` | `#086b5e` | Chart tertiary |
| `--chart-4` | `#064e45` | Chart quaternary |
| `--chart-5` | `#053d36` | Chart deepest |
| `--destructive` | `oklch(0.58 0.22 27)` | Errors |

### Dark mode

| Token | Hex | Role |
|-------|-----|------|
| `--background` | `#0d2e28` | Page bg |
| `--foreground` | `#ffffff` | Primary text |
| `--card` | `#113a33` | Surface |
| `--card-foreground` | `#ffffff` | Surface text |
| `--popover` | `#113a33` | Popover surface |
| `--popover-foreground` | `#ffffff` | Popover text |
| `--primary` | `#4dd4c6` | Hero accent — BlockScore Teal |
| `--primary-foreground` | `#0d2e28` | Text on primary |
| `--secondary` | `#2dd4aa` | Secondary accent — Mint |
| `--secondary-foreground` | `#0d2e28` | Text on secondary |
| `--muted` | `#15473e` | Subtle bg |
| `--muted-foreground` | `#a1e8d9` | Body text on dark |
| `--accent` | `#165046` | Tonal highlights, borders |
| `--accent-foreground` | `#6ffce0` | Bright text on accent |
| `--border` | `#165046` | Hairlines |
| `--input` | `#165046` | Form input borders |
| `--ring` | `#4dd4c6` | Focus rings |
| `--chart-1` | `#4dd4c6` | Chart primary |
| `--chart-2` | `#2dd4aa` | Chart secondary |
| `--chart-3` | `#1a8a7d` | Chart tertiary |
| `--chart-4` | `#6ffce0` | Chart quaternary |
| `--chart-5` | `#4df4d4` | Chart fifth |
| `--destructive` | `oklch(0.704 0.191 22.216)` | Errors |

### Gradients

```
--gradient: linear-gradient(135deg,
  oklch(0.55 0.13 170),
  oklch(0.62 0.14 160),
  oklch(0.70 0.12 150));

--gradient-soft: linear-gradient(135deg,
  oklch(0.96 0.02 170),
  oklch(0.94 0.03 150));
```

Hex approximation for tools that don't accept oklch:
```
--gradient: linear-gradient(135deg, #0d8070, #2aa08a, #4dd4c6);
```

The hue (170) is configurable; shift to 195 for cyan or 150 for green to skin variants.

### Shadows

```
--shadow-sm:   0 1px 2px rgba(8,27,24,.04), 0 1px 3px rgba(8,27,24,.03);
--shadow-md:   0 2px 4px rgba(8,27,24,.04), 0 8px 24px rgba(8,27,24,.06);
--shadow-lg:   0 1px 2px rgba(8,27,24,.04),
                0 24px 48px -12px rgba(8,27,24,.12),
                0 8px 16px -8px rgba(8,27,24,.08);
--shadow-glow: 0 0 0 1px rgba(13,128,112,.08),
                0 20px 60px -20px rgba(13,128,112,.35);
```

### Radius

`--radius: 0.45rem` (≈7.2px). Derived: `--radius-sm` (≈3.2px), `--radius-md` (≈5.2px), `--radius-lg` (`--radius`), `--radius-xl` (≈11.2px), `--radius-2xl` (≈15.2px).

Practical scale used in components:
- Pills: full radius
- Tiny chips: 7-8px
- Buttons / chips: 10-11px
- Mini cards: 12px
- Cards: 14-16px
- Panels / hero card: 16-20px

---

## Typography

| Family | Weight | Use |
|--------|--------|-----|
| **Inter Tight** | 500 | Display, H1, H2, H3, big numbers, italic emphasis |
| **Inter** | 400 | Body, descriptions, labels |
| **Geist Mono** | 400-500 | Numerics in cards, eyebrow labels, URLs, step numbers, code |

Always declare with fallback:
- `font-family: 'Inter Tight', 'Inter', system-ui, sans-serif;`
- `font-family: 'Inter', system-ui, sans-serif;`
- `font-family: 'Geist Mono', 'JetBrains Mono', ui-monospace, monospace;` *(JetBrains Mono is acceptable fallback if Geist Mono unavailable in the rendering env, e.g., Office/python-pptx)*

### Hierarchy (fluid clamps)

| Role | Spec |
|------|------|
| H1 / Hero | `clamp(40px, 6.2vw, 82px)` / 500 / letter-spacing -0.035em / line-height 0.98 |
| H2 / Section | `clamp(32px, 4vw, 52px)` / 500 / -0.03em / 1.02 |
| H3 / Card title | 20px / 500 / -0.015em / 1.2 |
| Body | 14.5-17px / 400 / -0.003em / 1.55 |
| Eyebrow / Label (mono) | 11-12px / 500 / 0.1-0.16em / **uppercase** |
| Big metric numeral | Inter Tight 500, large (40-160px depending on canvas) |

### Italic emphasis pattern

Headlines often emphasize a phrase with italic + the `--gradient` fill (e.g., "Australia's independent _performance score_ for strata buildings"). Pattern:

```css
.headline em {
  font-style: italic;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

---

## Logo

### Wordmark

`Block` regular weight + `Score` in `var(--primary)` weight 700, font Inter Tight, 17px in nav. Sits to the right of the 26px grid mark with 8-12px gap.

### 3×3 grid mark (26px nav size, scales)

A 3×3 grid of rounded squares, light → dark diagonal in primary/accent tones. Reference SVG (paste into outputs):

```xml
<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
  <rect x="0"  y="0"  width="7" height="7" rx="1.6" fill="var(--border)"/>
  <rect x="9.5" y="0" width="7" height="7" rx="1.6" fill="var(--border)"/>
  <rect x="19" y="0" width="7" height="7" rx="1.6" fill="var(--chart-4)"/>
  <rect x="0"  y="9.5" width="7" height="7" rx="1.6" fill="var(--border)"/>
  <rect x="9.5" y="9.5" width="7" height="7" rx="1.6" fill="var(--secondary)"/>
  <rect x="19" y="9.5" width="7" height="7" rx="1.6" fill="var(--chart-3)"/>
  <rect x="0"  y="19" width="7" height="7" rx="1.6" fill="var(--secondary)"/>
  <rect x="9.5" y="19" width="7" height="7" rx="1.6" fill="var(--chart-4)"/>
  <rect x="19" y="19" width="7" height="7" rx="1.6" fill="var(--chart-5)"/>
</svg>
```

For environments without CSS vars (PPTX, raw SVG export), substitute the dark-mode hex values directly.

---

## Signature elements

1. **Layered radial glows** — teal glow at top of hero sections, masked 64px grid pattern beneath.
2. **Score gauge** — 260×260 SVG, 10px stroke track in `--border`, animated stroke-dashoffset progress in `--gradient`, rounded cap. Gauge centre: 78px Inter Tight 500 numeral + "/100" subtext + uppercase mono caption + solid teal "A- · Top 12%" badge.
3. **Press/logo marquee** — `bg-muted` band, 32s linear scroll, edge fade mask, paused on hover.
4. **The Loop** — central 160×160 hub with pulsing outer ring, dashed orbital track, 4 staggered gradient pulse arcs (14s loop).
5. **Stats strip** — 4-cell `bg-muted` grid with hover gradient underline.
6. **Final CTA card** — 24px radius, gradient glow, grid-pattern mask from bottom.
7. **Reveal-on-scroll** — IntersectionObserver toggles `.in` for 16px translateY fade-up, 0.8s `cubic-bezier(.2,.7,.2,1)`.

---

## Voice cues (used by brand-voice-generator)

- **Data-forward** — lead with metrics, scores, comparisons. Numbers in mono. Quantify wherever possible.
- **Trust through clarity** — short sentences. Generous whitespace. No corporate fluff.
- **Privacy by design** — every claim about data emphasises anonymity and Australian data residency.
- **Professional, approachable** — confident but not cold. Targets strata/body-corporate managers + tenants.
- **Tagline pattern** — "Anonymous tenant feedback. Actionable building insights." Two clauses, period stop.
- **Italic emphasis** — H1/H2 headlines emphasize the key phrase in italic + gradient fill (e.g., "How the _score_ is built").

Avoid: hype language ("revolutionize", "game-changer"), decorative adjectives, exclamation marks, emojis in formal copy.

---

## Don'ts

- **No hardcoded hex** in component code outside this file. Always reference tokens.
- **No JetBrains Mono** in new outputs — use Geist Mono. (Fallback only when monospace rendering depends on font availability, e.g., Office.)
- **No serifs, no script, no comic** fonts.
- **No mixing >3 accent tones** per surface (primary + secondary + chart-4 max).
- **No solid white canvas** for hero / dark-themed outputs. Diagrams inside cards may use white interiors.
- **No drop shadows heavier than `--shadow-lg`**. Subtle depth, never heavy.
- **No emojis** in formal brand copy (acceptable in casual social content if explicitly requested).

---

## Source of truth & change protocol

This file mirrors `design_handoff_blockscore_landing/globals.css` + `README.md`. When the design handoff changes:

1. Re-run a diff against `globals.css` and `README.md`.
2. Update this file plus `tokens.json`.
3. No skill should embed its own divergent palette — they should re-read this file.
