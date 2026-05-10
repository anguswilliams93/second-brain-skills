# SVG Snippets — BlockScore Infographics

> Drop-in patterns aligned with the canonical brand spec (`_shared/blockscore/tokens.md`). Copy, adapt, compose. All assume a dark BlockScore canvas.

## 1. Document skeleton (1080×1350 portrait)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350" width="1080" height="1350">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="0%" r="100%">
      <stop offset="0%" stop-color="#113a33"/>
      <stop offset="60%" stop-color="#0d2e28"/>
      <stop offset="100%" stop-color="#0a231e"/>
    </radialGradient>

    <!-- Brand --gradient (135deg) — matches canonical token, hex fallback for SVG -->
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"  stop-color="#0d8070"/>
      <stop offset="50%" stop-color="#2aa08a"/>
      <stop offset="100%" stop-color="#4dd4c6"/>
    </linearGradient>

    <!-- Soft surface gradient for hero cards -->
    <linearGradient id="surfaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#15473e"/>
      <stop offset="100%" stop-color="#113a33"/>
    </linearGradient>

    <style>
      .h1   { font-family: 'Inter Tight','Inter',system-ui,sans-serif; font-weight:500; letter-spacing:-0.035em; fill:#ffffff; }
      .h2   { font-family: 'Inter Tight','Inter',system-ui,sans-serif; font-weight:500; letter-spacing:-0.03em;  fill:#ffffff; }
      .h3   { font-family: 'Inter Tight','Inter',system-ui,sans-serif; font-weight:500; letter-spacing:-0.015em; fill:#ffffff; }
      .body { font-family: 'Inter','Inter Tight',system-ui,sans-serif; font-weight:400; letter-spacing:-0.003em; fill:#a1e8d9; }
      .accent { fill:#4dd4c6; }
      .metric { font-family: 'Inter Tight',system-ui,sans-serif; font-weight:500; letter-spacing:-0.03em; fill:#4dd4c6; }
      .mono  { font-family: 'Geist Mono','JetBrains Mono',ui-monospace,monospace; font-weight:500; letter-spacing:0.12em; text-transform:uppercase; fill:#a1e8d9; }
      .emph { font-style:italic; fill:url(#brandGrad); }
    </style>
  </defs>
  <rect width="1080" height="1350" fill="url(#bgGrad)"/>
  <!-- content -->
</svg>
```

## 2. Card

```xml
<g transform="translate(64,200)">
  <rect width="952" height="220" rx="16" fill="#113a33" stroke="#165046" stroke-width="1"/>
  <text x="32" y="60" class="h3" font-size="28">Card title</text>
  <text x="32" y="110" class="body" font-size="22">Supporting body copy on two lines</text>
  <text x="32" y="140" class="body" font-size="22">stays clean and readable.</text>
</g>
```

## 3. Stat cards — layout rules (read before placing any metric)

**Golden rule:** A big metric (font-size ≥ 56) and any caption text **must occupy different rows, not the same row.** Inter Tight digits are wide — at 500 weight, plan on roughly `font-size × char-count × 0.55` of horizontal space, plus extra for `%`, `−`, `+`, `pp`, `K`, `M` glyphs.

Quick width budget (font-size × characters):

| Metric example | Font-size | Approx width |
|---|---|---|
| `87%` | 80 | ~175px |
| `4.6%` | 80 | ~190px |
| `−10.5%` | 80 | ~280px |
| `+6.3%` | 80 | ~210px |
| `368K+` | 80 | ~245px |
| `$4.2M` | 80 | ~225px |
| `100%` | 96 | ~240px |

If `metric_width + 24px gutter + caption_min_width > card_inner_width`, you MUST stack vertically.

### 3a. Vertical-stack stat card (default, overlap-safe)

Use this any time you have an eyebrow + metric + 1-2 caption lines on a card narrower than ~520px.

```xml
<g transform="translate(64,460)">
  <rect width="464" height="200" rx="16" fill="#113a33" stroke="#165046"/>
  <!-- eyebrow row -->
  <text x="28" y="44" class="mono" font-size="13">HEADLINE INFLATION</text>
  <!-- metric row (own line, no overlap risk) -->
  <text x="28" y="118" class="metric" font-size="76" fill="#6ffce0">4.6%</text>
  <!-- caption row(s) below metric baseline -->
  <text x="28" y="156" class="body" font-size="17">Highest since 2023 — fuel + housing drove it.</text>
  <text x="28" y="180" class="caption" font-size="13" opacity="0.75">annual, March 2026</text>
</g>
```

Vertical y-rhythm reference (card height 200):
- y 44  → eyebrow (mono 13)
- y 118 → metric baseline (76px metric → top edge ~y 56, ascender to ~y 50)
- y 156 → caption line 1 (17px)
- y 180 → caption line 2 / source (13px)

For 170-tall cards, drop one caption line; for 220-tall, add an arrow row at y 92.

### 3b. Centered hero-stat card (square or wider, single big number)

Use only when the card is ≥ 280px wide AND there's no caption beside the metric.

```xml
<g transform="translate(64,460)">
  <rect width="296" height="220" rx="16" fill="#113a33"/>
  <text x="148" y="44" class="mono" font-size="14" text-anchor="middle">RESPONSE RATE</text>
  <text x="148" y="140" class="metric" font-size="96" fill="#4dd4c6" text-anchor="middle">87%</text>
  <text x="148" y="180" class="body" font-size="16" text-anchor="middle">↑ 18 vs Q4</text>
</g>
```

### 3c. Two-column stat card (only when card_width ≥ 520px)

Metric on the left (anchored left), supporting block right of it. Compute metric width first; gutter ≥ 24px.

```xml
<g transform="translate(64,460)">
  <rect width="560" height="180" rx="16" fill="#113a33"/>
  <text x="28" y="44" class="mono" font-size="13">RESPONSE RATE</text>

  <!-- metric column: ~240px wide left of x=300 -->
  <text x="28" y="124" class="metric" font-size="76" fill="#4dd4c6">87%</text>
  <text x="28" y="156" class="caption" font-size="13" opacity="0.75">avg, Q1 2026</text>

  <!-- caption column starts at x=300 (metric_width 240 + 32 gutter) -->
  <text x="300" y="92"  class="body" font-size="17">Up 18 points</text>
  <text x="300" y="120" class="body" font-size="17">from Q4 2025.</text>
  <text x="300" y="148" class="caption" font-size="13" opacity="0.75">200+ buildings</text>
</g>
```

### 3d. Don'ts (this is where the budget infographic broke)

- ❌ Placing a side-caption block at `x=220` next to a metric at `x=28, font-size=80` in a 464-wide card. The metric runs through the captions.
- ❌ Using `text-anchor="middle"` on the metric in a two-column card — the metric drifts into the caption column.
- ❌ Stacking `text-anchor="end"` metric on the right while a caption sits at the left — you can't see where the metric actually ends without measuring; pick one anchor strategy per card and prefer `start` (left) for left-aligned reading flow.

### 3e. Quick check before exporting

For every stat card, mentally bound the metric: `metric_x + metric_width`. Confirm it's less than the next column's `x` minus 24px gutter. If it's not, switch to pattern 3a (vertical stack).

## 4. Timeline / process step (horizontal, 4 steps)

```xml
<g transform="translate(64,800)">
  <line x1="40" y1="40" x2="912" y2="40" stroke="#165046" stroke-width="2" stroke-dasharray="6 6"/>

  <circle cx="40" cy="40" r="32" fill="#4dd4c6"/>
  <text x="40" y="48" class="h3" font-size="22" fill="#0d2e28" text-anchor="middle">1</text>
  <text x="40" y="110" class="body" font-size="18" text-anchor="middle">Submit</text>

  <circle cx="312" cy="40" r="32" fill="#2dd4aa"/>
  <text x="312" y="48" class="h3" font-size="22" fill="#0d2e28" text-anchor="middle">2</text>
  <text x="312" y="110" class="body" font-size="18" text-anchor="middle">Anonymise</text>

  <circle cx="584" cy="40" r="32" fill="#6ffce0"/>
  <text x="584" y="48" class="h3" font-size="22" fill="#0d2e28" text-anchor="middle">3</text>
  <text x="584" y="110" class="body" font-size="18" text-anchor="middle">Score</text>

  <circle cx="912" cy="40" r="32" fill="#4df4d4"/>
  <text x="912" y="48" class="h3" font-size="22" fill="#0d2e28" text-anchor="middle">4</text>
  <text x="912" y="110" class="body" font-size="18" text-anchor="middle">Report</text>
</g>
```

## 5. Horizontal bar (data viz, full-gradient fill)

```xml
<g transform="translate(64,600)">
  <text x="0" y="0" class="body" font-size="18">Heating</text>
  <rect x="0" y="12" width="800" height="14" rx="7" fill="#15473e"/>
  <rect x="0" y="12" width="640" height="14" rx="7" fill="url(#brandGrad)"/>
  <text x="820" y="24" class="mono" font-size="16">80%</text>
</g>
```

## 6. Score gauge (matches landing-page hero gauge)

```xml
<g transform="translate(540,500)">
  <circle r="120" fill="none" stroke="#165046" stroke-width="10"/>
  <!-- 75% arc; pathLength=100 keeps the math trivial -->
  <circle r="120" fill="none" stroke="url(#brandGrad)" stroke-width="10"
          pathLength="100" stroke-dasharray="75 100"
          stroke-linecap="round" transform="rotate(-90)"/>
  <text y="14" class="metric" font-size="78" text-anchor="middle">75</text>
  <text y="44" class="body" font-size="14" text-anchor="middle" fill="#a1e8d9" opacity="0.8">/100</text>
  <text y="80" class="mono" font-size="12" text-anchor="middle">BLOCKSCORE</text>
</g>
```

## 7. BlockScore wordmark + 3×3 grid mark (compact, ~120px wide)

Matches the landing-page nav: 26px grid mark + Inter Tight 700 wordmark with "Score" in primary teal.

```xml
<g transform="translate(64,64)">
  <!-- 3x3 mark, 26px square, scaled up to 32px here -->
  <g transform="scale(1.23)">
    <rect x="0"   y="0"   width="7" height="7" rx="1.6" fill="#165046"/>
    <rect x="9.5" y="0"   width="7" height="7" rx="1.6" fill="#165046"/>
    <rect x="19"  y="0"   width="7" height="7" rx="1.6" fill="#6ffce0"/>
    <rect x="0"   y="9.5" width="7" height="7" rx="1.6" fill="#165046"/>
    <rect x="9.5" y="9.5" width="7" height="7" rx="1.6" fill="#2dd4aa"/>
    <rect x="19"  y="9.5" width="7" height="7" rx="1.6" fill="#1a8a7d"/>
    <rect x="0"   y="19"  width="7" height="7" rx="1.6" fill="#2dd4aa"/>
    <rect x="9.5" y="19"  width="7" height="7" rx="1.6" fill="#6ffce0"/>
    <rect x="19"  y="19"  width="7" height="7" rx="1.6" fill="#4df4d4"/>
  </g>
  <!-- Wordmark: Block in white, Score in primary teal, both Inter Tight 700, 26px -->
  <text x="48" y="28" font-family="'Inter Tight',sans-serif" font-weight="700" font-size="26" letter-spacing="-0.02em">
    <tspan fill="#ffffff">Block</tspan><tspan fill="#4dd4c6">Score</tspan>
  </text>
</g>
```

## 8. Decorative corner grid pattern

```xml
<g transform="translate(960,1240)" opacity="0.4">
  <rect x="0"  y="0"  width="12" height="12" rx="3" fill="#165046"/>
  <rect x="20" y="0"  width="12" height="12" rx="3" fill="#165046"/>
  <rect x="40" y="0"  width="12" height="12" rx="3" fill="#165046"/>
  <rect x="0"  y="20" width="12" height="12" rx="3" fill="#165046"/>
  <rect x="20" y="20" width="12" height="12" rx="3" fill="#165046"/>
  <rect x="40" y="20" width="12" height="12" rx="3" fill="#165046"/>
  <rect x="0"  y="40" width="12" height="12" rx="3" fill="#165046"/>
  <rect x="20" y="40" width="12" height="12" rx="3" fill="#165046"/>
  <rect x="40" y="40" width="12" height="12" rx="3" fill="#165046"/>
</g>
```

## 9. Comparison columns (with active-side gradient border)

```xml
<g transform="translate(64,500)">
  <rect x="0" y="0" width="464" height="380" rx="16" fill="#113a33"/>
  <text x="32" y="56" class="h3" font-size="26">Without BlockScore</text>
  <text x="32" y="120" class="body" font-size="20">Anonymous concerns lost</text>
  <text x="32" y="160" class="body" font-size="20">No baseline metrics</text>
  <text x="32" y="200" class="body" font-size="20">Reactive only</text>

  <rect x="488" y="0" width="464" height="380" rx="16" fill="#15473e" stroke="url(#brandGrad)" stroke-width="2"/>
  <text x="520" y="56" class="h3" font-size="26" fill="#4dd4c6">With BlockScore</text>
  <text x="520" y="120" class="body" font-size="20">Structured anonymous feedback</text>
  <text x="520" y="160" class="body" font-size="20">Quarterly score trends</text>
  <text x="520" y="200" class="body" font-size="20">Proactive insights</text>
</g>
```

## 10. Eyebrow + section header pattern (matches landing typography)

```xml
<g transform="translate(64,260)">
  <rect x="0" y="0" width="120" height="32" rx="16" fill="#15473e"/>
  <text x="60" y="20" class="mono" font-size="12" text-anchor="middle">FEATURES</text>
  <text x="0" y="84" class="h2" font-size="48">Six signals.</text>
  <text x="0" y="138" class="h2" font-size="48"><tspan class="emph">One trusted score.</tspan></text>
</g>
```

## 11. Footer / source line

```xml
<text x="540" y="1300" class="body" font-size="14" fill="#a1e8d9" opacity="0.6" text-anchor="middle">
  blockscore.au · anonymous tenant feedback · 2026
</text>
```

---

## Composition tips

- Canvas padding ≥64px on a 1080-wide canvas.
- Hero metric anchors visually — largest number sits in the top third.
- Primary teal `#4dd4c6` on max 1-2 elements per visual section. Dilution kills brand pop.
- 3-step processes: teal → mint → bright-mint progression. 4-step: add deeper `#1a8a7d` or `#4df4d4`.
- Always include the wordmark+mark (snippet 7) and a footer line (snippet 11).
- Italic emphasis (`<tspan class="emph">`) is a brand signature — use once per infographic in the title.
- Eyebrow labels: Geist Mono, uppercase, letter-spacing 0.12em, color `#a1e8d9`.
