# Portrait Mobile Infographics — BlockScore

> Reference for vertical mobile-first marketing assets. Portrait = top-to-bottom thumb-scroll. Pair with `brand.md` for tokens and `svg-patterns.md` for primitives.

## When to use portrait

- Instagram / Facebook feed posts (4:5)
- IG / FB / TikTok / LinkedIn Stories & Reels covers (9:16)
- Pinterest pins (2:3)
- LinkedIn document carousels (square per page, but the deck is consumed on mobile in portrait — see `pptx-generator` for multi-slide)
- App screenshots / Play Store / App Store featured graphics
- SMS / Push thumbnail previews

Do NOT use portrait for: web heroes, OG share cards, YouTube end cards, IAB display — see `landscape-ads.md`.

## Canvas presets

| Preset | Dimensions | Aspect | Where it ships | Filename suffix |
|--------|-----------|--------|----------------|-----------------|
| **IG / FB feed (default)** | `1080×1350` | 4:5 | Instagram & Facebook feed posts (current default in `SKILL.md`) | (none / default) |
| **Stories / Reels cover** | `1080×1920` | 9:16 | IG/FB Stories, TikTok, LinkedIn Stories, Snapchat | `-story` |
| **Pinterest pin** | `1000×1500` | 2:3 | Pinterest standard pin | `-pin` |
| **Pinterest tall pin** | `1000×2100` | ~1:2.1 | Pinterest "long" pin | `-pin-tall` |
| **App Store screenshot (6.7")** | `1290×2796` | iPhone 15 Pro Max | App Store screenshots | `-appstore` |
| **Play Store feature graphic** | `1024×500` (LANDSCAPE — see other ref) | — | — |
| **WhatsApp / SMS preview** | `1080×1080` | 1:1 | Messaging share preview | `-square` |

`1080×1350` is the BlockScore default — already covered in `SKILL.md` and `svg-patterns.md` snippet 1. This file focuses on the formats above plus mobile-specific layout rules.

## Mobile reading pattern (the F is dead — it's a Z, then a worm)

Mobile users scroll thumb-up. Visual scan is:
1. **First glance (top 25%)** — must communicate the topic. Hero metric, headline, or wordmark+eyebrow.
2. **Hold or scroll** — if they hold, they read in zigzag down the spine.
3. **End-frame (bottom 15%)** — CTA + URL. Many users only see top + bottom in a fast scroll.

Implication: put the **single most important thing in the top 25%** AND a clear CTA in the bottom 15%. Middle is for proof.

## Type scale (portrait, mobile reading distance ~30cm)

Mobile users read closer than desktop, so type can run smaller proportionally — but social platforms downscale aggressively in feed previews, so DON'T go too small.

| Role | 1080×1350 (4:5) | 1080×1920 (9:16 story) | 1000×1500 (pin) |
|------|-----------------|------------------------|-----------------|
| H1 hero | 72-96px | 88-120px | 64-84px |
| Big metric | 140-200px | 180-260px | 120-180px |
| H2 section | 40-56px | 48-64px | 36-48px |
| H3 card title | 26-32px | 30-36px | 24-30px |
| Body | 22-26px | 26-32px | 20-24px |
| Mono / eyebrow | 14-18px | 16-20px | 13-16px |
| Caption / footer | 14-16px | 16-18px | 13-14px |

**Story safe area (9:16):** keep all text at least **220px from top** (UI overlay) and **300px from bottom** (reply bar, swipe-up CTA). Effective work area: 1080×1400.

## Layout grammar (portrait)

Vertical 5-zone stack — adapt to content:

```
+------------------+
|  zone 1: brand   |  ~10%   wordmark + mark, optional eyebrow
+------------------+
|  zone 2: hook    |  ~25%   headline + italic emph phrase
+------------------+
|  zone 3: proof   |  ~40%   metric / gauge / chart / 3 cards
+------------------+
|  zone 4: detail  |  ~15%   short body copy or 1-line caption
+------------------+
|  zone 5: CTA     |  ~10%   pill / link / URL footer
+------------------+
```

For Stories (9:16) zone 3 grows to ~50% — readers expect a visual anchor that fills the vertical mid-band.

## Template 1 — 1080×1920 Story / Reel cover (single hero metric)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="30%" r="100%">
      <stop offset="0%" stop-color="#113a33"/>
      <stop offset="55%" stop-color="#0d2e28"/>
      <stop offset="100%" stop-color="#0a231e"/>
    </radialGradient>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"  stop-color="#0d8070"/>
      <stop offset="50%" stop-color="#2aa08a"/>
      <stop offset="100%" stop-color="#4dd4c6"/>
    </linearGradient>
    <style>
      .h1   { font-family:'Inter Tight',sans-serif; font-weight:500; letter-spacing:-0.035em; fill:#ffffff; }
      .body { font-family:'Inter',sans-serif; font-weight:400; fill:#a1e8d9; }
      .mono { font-family:'Geist Mono',monospace; font-weight:500; letter-spacing:0.14em; text-transform:uppercase; fill:#a1e8d9; }
      .metric { font-family:'Inter Tight',sans-serif; font-weight:500; fill:#4dd4c6; letter-spacing:-0.04em; }
      .emph { font-style:italic; fill:url(#brandGrad); }
      .cta  { font-family:'Inter Tight',sans-serif; font-weight:500; fill:#0d2e28; }
    </style>
  </defs>
  <rect width="1080" height="1920" fill="url(#bgGrad)"/>

  <!-- Story safe area indicator (DELETE before export, kept here as reminder) -->
  <!-- safe top y=220, safe bottom y=1620 -->

  <!-- Zone 1: brand (y 240) -->
  <g transform="translate(72,260) scale(1.5)">
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
  <text x="128" y="296" font-family="'Inter Tight',sans-serif" font-weight="700" font-size="28" letter-spacing="-0.02em">
    <tspan fill="#ffffff">Block</tspan><tspan fill="#4dd4c6">Score</tspan>
  </text>

  <!-- Zone 2: hook (y 420-660) -->
  <text x="72" y="440" class="mono" font-size="20">QUARTERLY REPORT</text>
  <text x="72" y="540" class="h1" font-size="96">What tenants</text>
  <text x="72" y="640" class="h1" font-size="96"><tspan class="emph">really think.</tspan></text>

  <!-- Zone 3: proof — big gauge (y 760-1280) -->
  <g transform="translate(540,1020)">
    <circle r="280" fill="none" stroke="#165046" stroke-width="22"/>
    <circle r="280" fill="none" stroke="url(#brandGrad)" stroke-width="22"
            pathLength="100" stroke-dasharray="82 100" stroke-linecap="round" transform="rotate(-90)"/>
    <text y="40" class="metric" font-size="220" text-anchor="middle">82</text>
    <text y="100" class="body" font-size="28" text-anchor="middle" opacity="0.8">/100 BlockScore</text>
  </g>

  <!-- Zone 4: detail (y 1380) -->
  <text x="540" y="1420" class="body" font-size="28" text-anchor="middle">Avg score across 200+ buildings, Q1 2026.</text>

  <!-- Zone 5: CTA (y 1500, inside safe area) -->
  <g transform="translate(340,1500)">
    <rect width="400" height="84" rx="42" fill="#4dd4c6"/>
    <text x="200" y="56" class="cta" font-size="28" text-anchor="middle">Get your score →</text>
  </g>
  <text x="540" y="1610" class="body" font-size="20" opacity="0.7" text-anchor="middle">blockscore.au</text>
</svg>
```

## Template 2 — 1080×1350 IG feed (3-stat stack, vertical)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350" width="1080" height="1350">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="0%" r="120%">
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
      .h1 { font-family:'Inter Tight',sans-serif; font-weight:500; letter-spacing:-0.035em; fill:#ffffff; }
      .h3 { font-family:'Inter Tight',sans-serif; font-weight:500; letter-spacing:-0.015em; fill:#ffffff; }
      .body { font-family:'Inter',sans-serif; font-weight:400; fill:#a1e8d9; }
      .mono { font-family:'Geist Mono',monospace; font-weight:500; letter-spacing:0.14em; text-transform:uppercase; fill:#a1e8d9; }
      .metric { font-family:'Inter Tight',sans-serif; font-weight:500; fill:#4dd4c6; letter-spacing:-0.04em; }
      .emph { font-style:italic; fill:url(#brandGrad); }
      .cta { font-family:'Inter Tight',sans-serif; font-weight:500; fill:#0d2e28; }
    </style>
  </defs>
  <rect width="1080" height="1350" fill="url(#bgGrad)"/>

  <!-- Brand -->
  <g transform="translate(64,72) scale(1.3)">
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
  <text x="118" y="100" font-family="'Inter Tight',sans-serif" font-weight="700" font-size="26">
    <tspan fill="#ffffff">Block</tspan><tspan fill="#4dd4c6">Score</tspan>
  </text>

  <!-- Hook -->
  <text x="64" y="220" class="mono" font-size="18">Q1 2026 SIGNALS</text>
  <text x="64" y="300" class="h1" font-size="76">Three numbers</text>
  <text x="64" y="380" class="h1" font-size="76">building managers</text>
  <text x="64" y="460" class="h1" font-size="76"><tspan class="emph">need to know.</tspan></text>

  <!-- 3 stacked stat cards (vertical = mobile-friendly) -->
  <g transform="translate(64,560)">
    <rect width="952" height="180" rx="16" fill="#113a33" stroke="#165046"/>
    <text x="36" y="60" class="mono" font-size="16">RESPONSE RATE</text>
    <text x="36" y="140" class="metric" font-size="84">87%</text>
    <text x="380" y="140" class="body" font-size="24">avg participation across pilots</text>
  </g>
  <g transform="translate(64,760)">
    <rect width="952" height="180" rx="16" fill="#113a33" stroke="#165046"/>
    <text x="36" y="60" class="mono" font-size="16">SIGNALS WEIGHTED</text>
    <text x="36" y="140" class="metric" font-size="84">6</text>
    <text x="160" y="140" class="body" font-size="24">dimensions per quarterly score</text>
  </g>
  <g transform="translate(64,960)">
    <rect width="952" height="180" rx="16" fill="#15473e" stroke="url(#brandGrad)" stroke-width="2"/>
    <text x="36" y="60" class="mono" font-size="16">TIME TO INSIGHT</text>
    <text x="36" y="140" class="metric" font-size="84">&lt;5 min</text>
    <text x="380" y="140" class="body" font-size="24">setup → first signal received</text>
  </g>

  <!-- CTA + footer -->
  <g transform="translate(340,1190)">
    <rect width="400" height="72" rx="36" fill="#4dd4c6"/>
    <text x="200" y="48" class="cta" font-size="24" text-anchor="middle">Get your score →</text>
  </g>
  <text x="540" y="1306" class="body" font-size="16" opacity="0.7" text-anchor="middle">blockscore.au · anonymous tenant feedback</text>
</svg>
```

## Template 3 — 1000×1500 Pinterest pin (vertical hero with steps)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1500" width="1000" height="1500">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="0%" r="110%">
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
      .h1 { font-family:'Inter Tight',sans-serif; font-weight:500; letter-spacing:-0.035em; fill:#ffffff; }
      .h3 { font-family:'Inter Tight',sans-serif; font-weight:500; fill:#ffffff; }
      .body { font-family:'Inter',sans-serif; font-weight:400; fill:#a1e8d9; }
      .mono { font-family:'Geist Mono',monospace; font-weight:500; letter-spacing:0.14em; text-transform:uppercase; fill:#a1e8d9; }
      .step { font-family:'Inter Tight',sans-serif; font-weight:500; fill:#0d2e28; letter-spacing:-0.02em; }
      .emph { font-style:italic; fill:url(#brandGrad); }
    </style>
  </defs>
  <rect width="1000" height="1500" fill="url(#bgGrad)"/>

  <text x="60" y="120" class="mono" font-size="16">HOW IT WORKS</text>
  <text x="60" y="220" class="h1" font-size="84">From signal</text>
  <text x="60" y="310" class="h1" font-size="84"><tspan class="emph">to score.</tspan></text>

  <!-- Vertical 4-step process (portrait flips horizontal flow to vertical) -->
  <g transform="translate(120,460)">
    <line x1="40" y1="40" x2="40" y2="800" stroke="#165046" stroke-width="2" stroke-dasharray="6 6"/>

    <circle cx="40" cy="40"  r="34" fill="#4dd4c6"/>
    <text x="40" y="50" class="step" font-size="24" text-anchor="middle">1</text>
    <text x="100" y="36" class="h3" font-size="28">Submit</text>
    <text x="100" y="68" class="body" font-size="20">Tenants leave anonymous signals.</text>

    <circle cx="40" cy="240" r="34" fill="#2dd4aa"/>
    <text x="40" y="250" class="step" font-size="24" text-anchor="middle">2</text>
    <text x="100" y="236" class="h3" font-size="28">Anonymise</text>
    <text x="100" y="268" class="body" font-size="20">Identifying detail stripped before review.</text>

    <circle cx="40" cy="440" r="34" fill="#6ffce0"/>
    <text x="40" y="450" class="step" font-size="24" text-anchor="middle">3</text>
    <text x="100" y="436" class="h3" font-size="28">Score</text>
    <text x="100" y="468" class="body" font-size="20">Six weighted dimensions → one number.</text>

    <circle cx="40" cy="640" r="34" fill="#4df4d4"/>
    <text x="40" y="650" class="step" font-size="24" text-anchor="middle">4</text>
    <text x="100" y="636" class="h3" font-size="28">Report</text>
    <text x="100" y="668" class="body" font-size="20">Quarterly trend delivered to managers.</text>
  </g>

  <text x="500" y="1440" class="body" font-size="18" opacity="0.7" text-anchor="middle">blockscore.au</text>
</svg>
```

## Composition checklist (portrait mobile)

- [ ] **Top 25% communicates the topic** by itself — assume scroll-past
- [ ] **Bottom 15% has a CTA** + URL — assume scroll-past
- [ ] On 9:16 stories: text inside safe area (220px top, 300px bottom)
- [ ] Headline ≤ 10 words; uses italic-emph on one phrase
- [ ] Stack proof vertically, not horizontally — one element per visual row
- [ ] Big metrics LARGER than landscape equivalents (mobile downscales aggressively)
- [ ] CTA pill min 64px tall, min 280px wide for thumb tap
- [ ] No text under 14px at native size — IG/FB compress further
- [ ] One italic-emph phrase, max two accent tones
- [ ] Decorative dots / corner motifs avoid the safe-area edges

## Mobile-specific don'ts

- **No multi-column layouts** at <1080 wide. Mobile = single column.
- **No tiny captions** (<14px) — platform compression murders them.
- **No bottom-anchored hero metric** — first-glance content goes top.
- **No gradients on body text** — emph only, headlines only.
- **No CTA in the dead-zone** of stories (top 220px / bottom 300px overlay region).
