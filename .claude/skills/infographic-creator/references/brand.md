# BlockScore Brand — SVG Quick Spec

> **Canonical source:** `.claude/skills/_shared/blockscore/tokens.md` (and `tokens.json`). This file is a condensed lookup for SVG infographic generation. When colors/fonts conflict, the canonical file wins.

## Colors (use exact hex; no `var(--…)` — SVG renderers don't always support custom properties)

### Dark canvas (default)

| Role | Hex |
|------|-----|
| Background | `#0d2e28` |
| Background alt | `#0a231e` |
| Card / surface | `#113a33` |
| Card alt | `#15473e` |
| Muted (subtle bg) | `#15473e` |
| Code BG | `#081c18` |
| Border | `#165046` |
| Accent (border deeper) | `#165046` |
| Text primary | `#ffffff` |
| Text secondary / body | `#a1e8d9` |

### Accent — BlockScore Teal

| Role | Hex | Use |
|------|-----|-----|
| Primary teal | `#4dd4c6` | Hero accent, key metric numbers, CTAs, ring |
| Secondary mint | `#2dd4aa` | Second chart series, secondary fills |
| Bright mint | `#6ffce0` | Emphasis, third series, highlights |
| Chart-3 deep | `#1a8a7d` | Fourth fill, hover-darker variant |
| Chart-5 brightest | `#4df4d4` | Sparingly — peak/extreme values |
| Teal dark (light-mode primary) | `#0d8070` | Strokes against light-mode bg, gradient stop 1 |

### Gradient (matches canonical `--gradient`)

oklch source (use as-is in modern browsers):
```
linear-gradient(135deg, oklch(0.55 0.13 170), oklch(0.62 0.14 160), oklch(0.70 0.12 150))
```

Hex fallback for SVG `<linearGradient>` (used in patterns):
```
stop 0%   #0d8070
stop 50%  #2aa08a
stop 100% #4dd4c6
```

### Diagram semantic palette (light cards on dark canvas)
| Purpose | Fill | Stroke |
|---------|------|--------|
| Primary / Data | `#4dd4c6` | `#0d8070` |
| Secondary | `#2dd4aa` | `#0d8070` |
| Start / Trigger | `#FED7AA` | `#C2410C` |
| End / Success | `#A7F3D0` | `#047857` |
| Warning | `#FEF3C7` | `#B45309` |
| Error | `#FECACA` | `#B91C1C` |

---

## Typography

| Role | Family | Weight | px on 1080-wide canvas |
|------|--------|--------|------------------------|
| Hero/Display H1 | Inter Tight | **500** | 72-96 |
| Section H2 | Inter Tight | **500** | 40-56 |
| Card title H3 | Inter Tight | **500** | 24-28 |
| Body | Inter | 400 | 22-26 |
| Caption | Inter | 400 | 16-18 |
| Eyebrow / label (mono uppercase, letter-spacing 0.12-0.16em) | Geist Mono | 500 | 14-18 |
| Big metric numeral | Inter Tight | 500 | 96-160 |
| Code / data | Geist Mono | 400 | 18-22 |

> **Weight note (canonical):** Display weight is 500, not 700. The visual heft comes from Inter Tight's tight letter-spacing (-0.035em H1, -0.03em H2, -0.015em H3). Avoid bumping to 600+ unless rendering environment makes 500 illegible.

> **Font fallbacks** (declare these in every `<style>` block):
> - Display/Body: `'Inter Tight', 'Inter', system-ui, sans-serif`
> - Mono: `'Geist Mono', 'JetBrains Mono', ui-monospace, monospace`

---

## Spacing (4px base, prefer multiples of 8)

`xs=4, sm=8, base=16, lg=24, xl=32, 2xl=48, 3xl=64`. Outer canvas padding: ≥64px on a 1080-wide canvas.

## Card styling

- Fill `#113a33` (default) or `#15473e` (alt for layered depth)
- Corner radius: cards 14-16px, hero 16-20px, mini 12px, chip 10-11px
- Optional 1px border `#165046`
- Inner padding 28-32px
- Drop shadow (optional, subtle): `filter: drop-shadow(0 4px 12px rgba(8,27,24,0.4))`

## Italic emphasis pattern

Headlines emphasize a phrase with italic + the brand gradient fill (e.g., "How the _score_ is built"). In SVG:

```xml
<defs>
  <linearGradient id="emphGrad" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%"  stop-color="#0d8070"/>
    <stop offset="50%" stop-color="#2aa08a"/>
    <stop offset="100%" stop-color="#4dd4c6"/>
  </linearGradient>
</defs>
<text class="h1" fill="#ffffff">How the <tspan font-style="italic" fill="url(#emphGrad)">score</tspan> is built</text>
```

---

## Signature visual elements

1. **Layered radial gradient bg** — `#0d2e28 → #0a231e` (canvas) or `#113a33 → #15473e` (hero card).
2. **3×3 grid logo mark** — see `svg-patterns.md` snippet 7 (matches landing-page nav).
3. **Decorative grid dots** — small rounded squares in corners, fill `#165046` opacity 0.4.
4. **Score gauge** — circular gauge with gradient stroke, see snippet 6.
5. **Generous whitespace** — privacy-by-design = clean, never cluttered.

---

## Don'ts

- No pure white canvas (white is reserved for diagram interiors).
- No teal `#4dd4c6` for body text or large fills — it loses impact.
- No more than 3 accent tones per infographic (primary + secondary + chart-4 max).
- No drop shadows heavier than `rgba(8,27,24,0.4)`.
- No serifs, scripts, or comic fonts.
- No JetBrains Mono in new outputs unless Geist Mono unavailable in the rendering env (fallback only).
