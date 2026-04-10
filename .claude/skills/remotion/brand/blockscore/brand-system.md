# BlockScore — Brand System

> Anonymous tenant feedback. Actionable building insights.

---

## Brand Philosophy

### Core Principles

1. **Data-Forward**
   Lead with metrics, scores, and visual data. Numbers build credibility and drive decisions for property managers.

2. **Trust Through Clarity**
   Clean layouts, generous whitespace, no clutter. If it doesn't serve the message, remove it. Privacy and transparency are communicated through design simplicity.

3. **Privacy by Design**
   Every visual choice reinforces that tenant data is anonymous and secure. Privacy isn't a disclaimer — it's a design principle.

4. **Professional but Approachable**
   B2B credibility for strata managers and body corporates, combined with enough warmth that tenants feel comfortable giving honest feedback.

---

## Logo

### The BlockScore Mark

A 3x3 grid of rounded squares with a diagonal gradient from light (top-left) to dark (bottom-right), using brand teal tones. The grid represents data blocks and scoring metrics — the core of what BlockScore does.

**Grid colour mapping:**
```
border,     border,     chart-3
border,     secondary,  chart-4
secondary,  chart-3,    chart-5
```

**Logo file**: `.claude/skills/pptx-generator/brands/blockscore/assets/logo.png`

**Usage rules:**
- Maintain aspect ratio
- Minimum clear space: 20% of logo width on all sides
- On dark backgrounds, use the standard teal gradient
- On light backgrounds, use the darker teal variant
- Never rotate or distort the grid

---

## Color System

### Primary Accent — BlockScore Teal

The signature brand colour. Used for primary actions, links, highlights, and data visualisation.

| Name | Hex | Use |
|------|-----|-----|
| Teal | `#4dd4c6` | Primary buttons, links, chart primary, key metrics |
| Teal Dark | `#0d8070` | Light-theme primary, hover states |
| Mint | `#2dd4aa` | Secondary accents, chart secondary |
| Bright Mint | `#6ffce0` | Emphasis, bright accents, chart highlights |

**Rule:** BlockScore Teal is the hero colour. Use for actions, emphasis, and data highlights. Don't dilute by overusing — let it stand out against the dark background.

### Theme Base

**Dark Theme (Default)**
```
Background:     #0d2e28
Background Alt: #0a231e
Surface:        #113a33
Surface Alt:    #15473e
Text Primary:   #ffffff
Text Secondary: #a1e8d9
Code BG:        #081c18
Border:         #165046
```

**Light Theme (Alternative)**
```
Background:     #ffffff
Background Alt: #f1f8f6
Surface:        #e4f4f0
Text Primary:   #0f172a
Text Secondary: #086b5e
Primary:        #0d8070
Secondary:      #2aa08a
Border:         #b2e0d6
```

**Usage:** Default to dark theme for presentations and marketing. Use light theme for admin interfaces, documentation, and print materials.

---

## Typography

### Font Stack

- **Heading:** Inter Tight — tight tracking, modern geometric sans-serif for impact
- **Body:** Inter — highly legible, clean sans-serif for comfortable reading
- **Code:** JetBrains Mono — monospace for data tables, building codes, and technical content

### Typography Rules

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Display/Hero | Inter Tight | 700 | 36px+ |
| H1 | Inter Tight | 700 | 30px |
| H2 | Inter Tight | 600 | 24px |
| Body | Inter | 400 | 16-18px |
| Code/Data | JetBrains Mono | 400 | 14px |

### Text Color Usage

| Context | Color | Notes |
|---------|-------|-------|
| Headings | `#ffffff` | Full contrast on dark |
| Body/Subtitles | `#a1e8d9` | Comfortable reading, teal-tinted |
| Links/Accents | `#4dd4c6` | With hover brightening to `#6ffce0` |
| Data/Metrics | `#4dd4c6` or `#6ffce0` | Big numbers pop in accent colours |

---

## Spacing System

**Base unit:** 4px

| Token | Value | Use |
|-------|-------|-----|
| `xs` | 4px | Tight spacing, icon gaps |
| `sm` | 8px | Related elements |
| `base` | 16px | Standard padding |
| `lg` | 24px | Section padding |
| `xl` | 32px | Card padding |
| `2xl` | 48px | Section margins |

**Rule:** When in doubt, use multiples of 8px.

---

## Buttons

### Button Types

| Type | Background | Text | Use |
|------|------------|------|-----|
| Primary | `#4dd4c6` | `#0d2e28` | Main actions, CTAs |
| Secondary | `#113a33` | `#ffffff` | Secondary actions |
| Ghost | Transparent | `#a1e8d9` | Tertiary actions |

### Button Specs

- **Font:** Inter Tight, 500 weight
- **Border radius:** 8px
- **Padding:** 8px 16px (standard), 12px 24px (large)

---

## Signature Elements

These patterns define the BlockScore visual identity in presentations and marketing.

### Teal Gradient Backgrounds
Subtle gradients from `#0d2e28` to `#0a231e` or `#113a33` add depth without distraction. Use for section transitions and hero slides.

### Data Cards with Depth
Cards use `#113a33` or `#15473e` backgrounds against the main `#0d2e28`, creating layered depth. Pair with the accent teal for key metrics or scores displayed on cards.

### Geometric Grid Patterns
Inspired by the 3x3 logo grid, use small rounded-square patterns as decorative elements anchored to corners or edges. These reinforce the "blocks" in BlockScore.

---

## Diagrams

### Color Palette for Diagrams

| Semantic Purpose | Fill | Stroke |
|------------------|------|--------|
| Primary/Data | `#4dd4c6` | `#0d8070` |
| Secondary | `#2dd4aa` | `#0d8070` |
| Start/Trigger | `#FED7AA` | `#C2410C` |
| End/Success | `#A7F3D0` | `#047857` |
| Warning/Decision | `#FEF3C7` | `#B45309` |
| Error/Stop | `#FECACA` | `#B91C1C` |

### Diagram Rules

- **Background:** `#FFFFFF` for maximum readability in diagrams
- **Text color:** `#0f172a` for dark, legible labels
- **Stroke width:** 2px
- **Rule:** Always pair darker stroke with lighter fill

---

## Quick Reference

### When to Use BlockScore Teal

| Use Teal | Don't Use |
|----------|-----------|
| Primary CTAs and buttons | Large background fills (use dark teal instead) |
| Key metrics and scores | Body text (use white or secondary) |
| Chart highlights | Decorative elements without purpose |
| Links and interactive elements | Every heading (save it for emphasis) |

### Font Usage

| Inter Tight | Inter |
|-------------|-------|
| Slide titles, headings | Body text, descriptions |
| Button labels | Long-form content |
| Metric labels | Bullet points |
| Navigation items | Table content |

---

*Last updated: 2026-04-10*
