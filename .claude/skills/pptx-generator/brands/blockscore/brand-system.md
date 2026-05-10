# BlockScore — Brand System (PPTX-Specific Summary)

> **Canonical source:** `.claude/skills/_shared/blockscore/tokens.md` and `tokens.json`. Read those first.
> This file extracts the bits that matter for python-pptx generation — slide ratios, RGB values, and PPTX-friendly font names. When the canonical changes, sync this file.

> Tagline: **Anonymous tenant feedback. Actionable building insights.**

## Brand Philosophy

1. **Data-Forward** — lead with metrics, scores, and visual data.
2. **Trust Through Clarity** — clean layouts, generous whitespace, no clutter.
3. **Privacy by Design** — every visual choice reinforces tenant anonymity and Australian data residency.
4. **Professional but Approachable** — B2B credibility, warmth that makes tenants comfortable.

---

## Color (dark theme — default for slides)

| Role | Hex (no #) | Use in slides |
|------|------------|---------------|
| Background | `0d2e28` | Slide bg |
| Background alt | `0a231e` | Section transitions, hero gradient lower stop |
| Card bg | `113a33` | Default card surfaces |
| Card bg alt | `15473e` | Layered depth |
| Code bg | `081c18` | Code/data blocks |
| Border | `165046` | 1px hairlines |
| Text primary | `ffffff` | Headings |
| Text secondary | `a1e8d9` | Body, subtitles |
| **Primary teal** | `4dd4c6` | Hero accent, key metric numerals, CTAs |
| Secondary mint | `2dd4aa` | Second chart series, secondary CTAs |
| Bright mint | `6ffce0` | Emphasis, third chart series |

**Rule:** Use `4dd4c6` sparingly — it's the hero accent. Never as a body fill or large background.

### Light theme (rarely used in slides; available for print/admin)
Background `ffffff`, primary `0d8070`, secondary `2aa08a`, muted `f1f8f6`, border `b2e0d6`. Full palette in `tokens.md`.

### Diagram semantic palette (white-bg diagrams inside cards)
| Purpose | Fill | Stroke |
|---------|------|--------|
| Primary/Data | `#4dd4c6` | `#0d8070` |
| Secondary | `#2dd4aa` | `#0d8070` |
| Start/Trigger | `#FED7AA` | `#C2410C` |
| End/Success | `#A7F3D0` | `#047857` |
| Warning | `#FEF3C7` | `#B45309` |
| Error | `#FECACA` | `#B91C1C` |

---

## Typography (PPTX)

| Role | Font | Weight | Size on 13.333"×7.5" slide |
|------|------|--------|----------------------------|
| Slide title (H1) | **Inter Tight** | 500 | 44-60pt |
| Section title (H2) | Inter Tight | 500 | 32-40pt |
| Card title (H3) | Inter Tight | 500 | 18-24pt |
| Body | **Inter** | 400 | 14-18pt |
| Caption / eyebrow | Inter or Geist Mono | 500 | 10-12pt, uppercase, letter-spacing 0.1-0.16em |
| Big metric numeral | Inter Tight | 500 | 60-120pt |
| Code / data values | **Geist Mono** *(fallback: JetBrains Mono)* | 400 | 12-16pt |

> **Important font note:** Per the canonical handoff, headings are weight **500** (not 600/700). The display effect comes from Inter Tight's tight letter-spacing (-0.035em on H1, -0.03em on H2, -0.015em on H3), not from heavier weight. If python-pptx renders 500 too thin in a target environment, fall back to 600 — but 500 is the design intent.

---

## Spacing & radii

- Base unit: 4px. Prefer multiples of 8.
- Card radius: 12-16px. Hero card: 16-20px. Pills: full.
- Default card padding: 28px. Compact: 18-22px.

---

## Logo

3×3 grid mark + "Block**Score**" wordmark. Wordmark is Inter Tight 700 with "Score" in primary teal. See `_shared/blockscore/tokens.md` and `infographic-creator/references/svg-patterns.md` for the SVG path.

---

## PPTX-specific notes

- All slides MUST set `slide.background.fill.solid()` + `fore_color.rgb = hex_to_rgb('0d2e28')` explicitly. PowerPoint defaults to white otherwise.
- Geist Mono availability: not bundled with Office. Either embed the font in the PPTX or fall back to JetBrains Mono / Consolas. python-pptx font assignment doesn't validate availability.
- Italic emphasis pattern from the landing (e.g., "How the _score_ is built") — in PPTX, emulate with italic + a teal gradient fill on the text run if supported, otherwise italic + solid teal.

---

*Canonical: `.claude/skills/_shared/blockscore/tokens.md` — last sync: design handoff dated 2026-04-18.*
