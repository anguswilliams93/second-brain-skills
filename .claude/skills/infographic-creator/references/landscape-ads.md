# Landscape Ad Infographics — BlockScore

> Reference for paid-ad / display / web banner formats. Landscape = horizontal reading flow (left-to-right hero → proof → CTA). Pair with `brand.md` for tokens and `svg-patterns.md` for primitives.

## When to use landscape

- Google Display, LinkedIn Single Image, Meta Feed (desktop), YouTube end cards
- Web hero banners, blog post cover images
- Twitter / X in-feed cards
- Email header banners
- Programmatic IAB display slots

Do NOT use landscape for: Instagram/TikTok feed posts, IG/FB Stories, mobile reels, LinkedIn document carousels — see `portrait-mobile.md`.

## Canvas presets

| Preset | Dimensions | Where it ships | Filename suffix |
|--------|-----------|----------------|-----------------|
| **OG / Twitter card** | `1200×630` | Open Graph, Twitter, LinkedIn share preview, blog cover | `-og` |
| **LinkedIn / Meta single image** | `1200×627` | Sponsored content (use 1200×630 — they letterbox the 3px) | `-linkedin` |
| **YouTube end card / 16:9 hero** | `1920×1080` | YouTube, web hero, Google Display large | `-16x9` |
| **Display medium rectangle** | `970×250` | IAB billboard / leaderboard | `-billboard` |
| **Display leaderboard** | `728×90` | IAB top-of-page banner | `-leaderboard` |
| **Email header** | `1200×400` | Newsletter / drip email banner | `-email` |

Always set both `viewBox="0 0 W H"` AND `width="W" height="H"` so rasterisation is predictable in ad servers.

## Layout grammar (landscape ads)

Three-column scan: **Hook (40%) → Proof (35%) → CTA (25%)**.

```
+------------------------------------------------------------+
| [logo]                                                     |
|                                                            |
|  HEADLINE (italic emph     [BIG STAT or       [CTA pill]   |
|  one phrase)                gauge or chart]                |
|  sub-line / proof                              "blockscore  |
|                                                 .au"        |
|                                                            |
|                                              [3x3 dots]    |
+------------------------------------------------------------+
```

Rules:
- **One** big idea per ad. No multi-section infographics. Reader gives ≤2 seconds.
- Headline ≤ 8 words. Body ≤ 14 words.
- Hero metric or gauge MUST be visually dominant in the right third.
- CTA is always a teal pill or underlined teal text — never a gradient button (gradients are for emphasis, not actions).
- Logo top-left (snippet 7), footer URL bottom-right.

## Type scale (landscape, scaled per canvas width)

| Role | 1920×1080 | 1200×630 | 970×250 | 728×90 |
|------|-----------|----------|---------|--------|
| H1 headline | 96-120px | 64-72px | 36-44px | 22-26px |
| Sub / body | 28-32px | 22-24px | 16-18px | 13-14px |
| Big metric | 200-240px | 140-160px | 80-96px | 44-54px |
| Eyebrow / mono | 18-22px | 14-16px | 11-12px | 10px |
| CTA pill text | 24-28px | 18-20px | 14-16px | 11-12px |

Below 728×90 the wordmark + headline + CTA cannot all fit — drop the wordmark to mark-only and shorten headline to 4 words.

## Template 1 — 1200×630 OG / share card (hero stat)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <radialGradient id="bgGrad" cx="20%" cy="50%" r="120%">
      <stop offset="0%" stop-color="#113a33"/>
      <stop offset="60%" stop-color="#0d2e28"/>
      <stop offset="100%" stop-color="#0a231e"/>
    </radialGradient>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"  stop-color="#0d8070"/>
      <stop offset="50%" stop-color="#2aa08a"/>
      <stop offset="100%" stop-color="#4dd4c6"/>
    </linearGradient>
    <style>
      .h1   { font-family:'Inter Tight','Inter',system-ui,sans-serif; font-weight:500; letter-spacing:-0.035em; fill:#ffffff; }
      .body { font-family:'Inter',system-ui,sans-serif; font-weight:400; fill:#a1e8d9; }
      .mono { font-family:'Geist Mono',ui-monospace,monospace; font-weight:500; letter-spacing:0.14em; text-transform:uppercase; fill:#a1e8d9; }
      .metric { font-family:'Inter Tight',system-ui,sans-serif; font-weight:500; letter-spacing:-0.04em; fill:#4dd4c6; }
      .emph { font-style:italic; fill:url(#brandGrad); }
      .cta  { font-family:'Inter Tight',sans-serif; font-weight:500; fill:#0d2e28; }
    </style>
  </defs>

  <rect width="1200" height="630" fill="url(#bgGrad)"/>

  <!-- Logo -->
  <g transform="translate(56,48) scale(1.4)">
    <rect x="0"  y="0"  width="7" height="7" rx="1.6" fill="#165046"/>
    <rect x="9.5" y="0"  width="7" height="7" rx="1.6" fill="#165046"/>
    <rect x="19" y="0"  width="7" height="7" rx="1.6" fill="#6ffce0"/>
    <rect x="0"  y="9.5" width="7" height="7" rx="1.6" fill="#165046"/>
    <rect x="9.5" y="9.5" width="7" height="7" rx="1.6" fill="#2dd4aa"/>
    <rect x="19" y="9.5" width="7" height="7" rx="1.6" fill="#1a8a7d"/>
    <rect x="0"  y="19" width="7" height="7" rx="1.6" fill="#2dd4aa"/>
    <rect x="9.5" y="19" width="7" height="7" rx="1.6" fill="#6ffce0"/>
    <rect x="19" y="19" width="7" height="7" rx="1.6" fill="#4df4d4"/>
  </g>
  <text x="104" y="73" font-family="'Inter Tight',sans-serif" font-weight="700" font-size="26" letter-spacing="-0.02em">
    <tspan fill="#ffffff">Block</tspan><tspan fill="#4dd4c6">Score</tspan>
  </text>

  <!-- LEFT 60%: hook -->
  <text x="56" y="220" class="mono" font-size="16">FOR BUILDING MANAGERS</text>
  <text x="56" y="300" class="h1" font-size="68">Anonymous feedback,</text>
  <text x="56" y="372" class="h1" font-size="68"><tspan class="emph">one trusted score.</tspan></text>
  <text x="56" y="440" class="body" font-size="22">See what tenants really think — without retaliation risk.</text>

  <!-- CTA pill bottom-left -->
  <g transform="translate(56,500)">
    <rect width="220" height="56" rx="28" fill="#4dd4c6"/>
    <text x="110" y="36" class="cta" font-size="20" text-anchor="middle">Get your score →</text>
  </g>

  <!-- RIGHT 40%: gauge -->
  <g transform="translate(960,300)">
    <circle r="160" fill="none" stroke="#165046" stroke-width="14"/>
    <circle r="160" fill="none" stroke="url(#brandGrad)" stroke-width="14"
            pathLength="100" stroke-dasharray="82 100" stroke-linecap="round" transform="rotate(-90)"/>
    <text y="20" class="metric" font-size="120" text-anchor="middle">82</text>
    <text y="60" class="body" font-size="18" text-anchor="middle" opacity="0.8">/100</text>
  </g>

  <!-- Footer URL -->
  <text x="1144" y="592" class="body" font-size="14" fill="#a1e8d9" opacity="0.7" text-anchor="end">blockscore.au</text>
</svg>
```

## Template 2 — 1920×1080 hero / YouTube end card (split with 3 proof points)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <radialGradient id="bgGrad" cx="30%" cy="40%" r="120%">
      <stop offset="0%" stop-color="#113a33"/>
      <stop offset="60%" stop-color="#0d2e28"/>
      <stop offset="100%" stop-color="#0a231e"/>
    </radialGradient>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"  stop-color="#0d8070"/>
      <stop offset="50%" stop-color="#2aa08a"/>
      <stop offset="100%" stop-color="#4dd4c6"/>
    </linearGradient>
    <style>
      .h1   { font-family:'Inter Tight',sans-serif; font-weight:500; letter-spacing:-0.035em; fill:#ffffff; }
      .h3   { font-family:'Inter Tight',sans-serif; font-weight:500; letter-spacing:-0.015em; fill:#ffffff; }
      .body { font-family:'Inter',sans-serif; font-weight:400; fill:#a1e8d9; }
      .mono { font-family:'Geist Mono',monospace; font-weight:500; letter-spacing:0.14em; text-transform:uppercase; fill:#a1e8d9; }
      .metric { font-family:'Inter Tight',sans-serif; font-weight:500; fill:#4dd4c6; letter-spacing:-0.04em; }
      .emph { font-style:italic; fill:url(#brandGrad); }
      .cta  { font-family:'Inter Tight',sans-serif; font-weight:500; fill:#0d2e28; }
    </style>
  </defs>

  <rect width="1920" height="1080" fill="url(#bgGrad)"/>

  <!-- Headline left -->
  <text x="120" y="320" class="mono" font-size="22">PROPERTY OPERATIONS</text>
  <text x="120" y="440" class="h1" font-size="112">Stop guessing</text>
  <text x="120" y="560" class="h1" font-size="112"><tspan class="emph">what tenants think.</tspan></text>
  <text x="120" y="640" class="body" font-size="30">A single quarterly score, built from anonymous signals.</text>

  <!-- CTA -->
  <g transform="translate(120,740)">
    <rect width="320" height="80" rx="40" fill="#4dd4c6"/>
    <text x="160" y="52" class="cta" font-size="28" text-anchor="middle">Book a demo →</text>
  </g>

  <!-- 3 proof cards right column -->
  <g transform="translate(1180,260)">
    <rect width="620" height="160" rx="16" fill="#113a33" stroke="#165046"/>
    <text x="40" y="60" class="mono" font-size="16">SIGNALS</text>
    <text x="40" y="120" class="metric" font-size="64">6</text>
    <text x="160" y="120" class="body" font-size="22">weighted dimensions</text>
  </g>
  <g transform="translate(1180,440)">
    <rect width="620" height="160" rx="16" fill="#113a33" stroke="#165046"/>
    <text x="40" y="60" class="mono" font-size="16">RESPONSE RATE</text>
    <text x="40" y="120" class="metric" font-size="64">87%</text>
    <text x="200" y="120" class="body" font-size="22">avg participation</text>
  </g>
  <g transform="translate(1180,620)">
    <rect width="620" height="160" rx="16" fill="#15473e" stroke="url(#brandGrad)" stroke-width="2"/>
    <text x="40" y="60" class="mono" font-size="16">TIME TO INSIGHT</text>
    <text x="40" y="120" class="metric" font-size="64">&lt;5 min</text>
    <text x="220" y="120" class="body" font-size="22">setup to first signal</text>
  </g>

  <text x="1800" y="1020" class="body" font-size="18" opacity="0.7" text-anchor="end">blockscore.au</text>
</svg>
```

## Template 3 — 970×250 IAB billboard (compact horizontal)

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 970 250" width="970" height="250">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0d2e28"/>
      <stop offset="100%" stop-color="#113a33"/>
    </linearGradient>
    <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d8070"/>
      <stop offset="50%" stop-color="#2aa08a"/>
      <stop offset="100%" stop-color="#4dd4c6"/>
    </linearGradient>
    <style>
      .h  { font-family:'Inter Tight',sans-serif; font-weight:500; letter-spacing:-0.03em; fill:#ffffff; }
      .b  { font-family:'Inter',sans-serif; font-weight:400; fill:#a1e8d9; }
      .m  { font-family:'Inter Tight',sans-serif; font-weight:500; fill:#4dd4c6; letter-spacing:-0.03em; }
      .emph { font-style:italic; fill:url(#brandGrad); }
      .cta  { font-family:'Inter Tight',sans-serif; font-weight:500; fill:#0d2e28; }
    </style>
  </defs>
  <rect width="970" height="250" fill="url(#bg)"/>

  <!-- Wordmark left -->
  <text x="32" y="44" font-family="'Inter Tight',sans-serif" font-weight="700" font-size="22">
    <tspan fill="#ffffff">Block</tspan><tspan fill="#4dd4c6">Score</tspan>
  </text>

  <!-- Headline -->
  <text x="32" y="120" class="h" font-size="40">Anonymous feedback,</text>
  <text x="32" y="170" class="h" font-size="40"><tspan class="emph">one trusted score.</tspan></text>

  <!-- Right: gauge mini -->
  <g transform="translate(720,125)">
    <circle r="68" fill="none" stroke="#165046" stroke-width="8"/>
    <circle r="68" fill="none" stroke="url(#brandGrad)" stroke-width="8"
            pathLength="100" stroke-dasharray="82 100" stroke-linecap="round" transform="rotate(-90)"/>
    <text y="14" class="m" font-size="48" text-anchor="middle">82</text>
  </g>

  <!-- CTA -->
  <g transform="translate(820,200)">
    <rect width="120" height="34" rx="17" fill="#4dd4c6"/>
    <text x="60" y="23" class="cta" font-size="14" text-anchor="middle">Get yours →</text>
  </g>
</svg>
```

## Template 4 — 728×90 leaderboard (single line)

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 728 90" width="728" height="90">
  <defs>
    <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0d8070"/><stop offset="100%" stop-color="#4dd4c6"/>
    </linearGradient>
    <style>
      .h { font-family:'Inter Tight',sans-serif; font-weight:500; letter-spacing:-0.025em; fill:#ffffff; }
      .emph { font-style:italic; fill:url(#brandGrad); }
      .cta { font-family:'Inter Tight',sans-serif; font-weight:500; fill:#0d2e28; }
    </style>
  </defs>
  <rect width="728" height="90" fill="#0d2e28"/>
  <text x="20" y="40" font-family="'Inter Tight',sans-serif" font-weight="700" font-size="18">
    <tspan fill="#ffffff">Block</tspan><tspan fill="#4dd4c6">Score</tspan>
  </text>
  <text x="20" y="74" class="h" font-size="22">Anonymous feedback, <tspan class="emph">one trusted score.</tspan></text>
  <g transform="translate(580,28)">
    <rect width="128" height="34" rx="17" fill="#4dd4c6"/>
    <text x="64" y="23" class="cta" font-size="14" text-anchor="middle">Get yours →</text>
  </g>
</svg>
```

## Composition checklist (landscape ads)

- [ ] Single big idea — kill anything that splits attention
- [ ] Headline ≤ 8 words, italic-emph one phrase
- [ ] Hero element (gauge / metric / chart) anchors the right third
- [ ] CTA pill = solid `#4dd4c6` fill with `#0d2e28` text — never gradient
- [ ] Wordmark top-left, URL bottom-right
- [ ] On 970×250 and below: drop body copy, keep only headline + CTA
- [ ] Padding ≥ 32px on every edge (≥ 56px on 1200+)
- [ ] No more than 2 accent tones — primary teal + maybe bright mint
- [ ] Verify in slot at actual size — landscape ads usually display 50-70% of native res
