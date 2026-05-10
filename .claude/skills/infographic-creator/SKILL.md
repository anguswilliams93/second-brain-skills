---
name: infographic-creator
description: Generate brand-strict SVG infographics for the BlockScore brand. Use when user asks to "create an infographic", "make an infographic", "design an infographic", "visualize as infographic", or any request mentioning infographic generation. Always outputs a single self-contained .svg file in `output/blockscore/infographics/`. Layout is freeform per request (stats, timeline, comparison, hierarchy, process, list, mixed) — pick the structure that fits the content. Source content can be pasted text/data or a file path the user provides. Strict adherence to BlockScore brand colors, typography, and visual signatures.
---

# Infographic Creator

Generate brand-strict, self-contained SVG infographics for the BlockScore brand.

## Output Rules (non-negotiable)

- Format: **SVG only** — single self-contained file, no external dependencies.
- Location: `C:/dev/obsidian/second-brain-skills/output/blockscore/infographics/`
- Naming: `<slug>-<YYYY-MM-DD>.svg` (slug = kebab-case from topic, e.g. `tenant-feedback-flow-2026-05-05.svg`)
- Default canvas: `1080x1350` (4:5 portrait, social-friendly). Override when user requests a different format:
  - **Landscape ad / banner** (`1920x1080`, `1200x630`, `970x250`, `728x90`, etc.) → load `references/landscape-ads.md` for canvas presets, type scale, and drop-in templates.
  - **Portrait mobile marketing** (`1080x1920` story, `1000x1500` pin, `1080x1080` square, app store screenshots) → load `references/portrait-mobile.md` for safe areas, mobile reading pattern, and templates.
  - **Square / other** → use the default 4:5 patterns in `references/svg-patterns.md` and adjust canvas.
- Embed all text directly as `<text>` elements. Do NOT rely on system fonts being installed — declare fonts in `<style>` and use `font-family` fallbacks: `'Inter Tight', 'Inter', system-ui, sans-serif`.
- Background: solid `#0d2e28` or subtle radial gradient `#0d2e28` -> `#0a231e`. Never white background for the canvas itself (diagrams inside cards are exempt — see brand rules).

## Workflow

1. **Gather source content.** User pastes text/data OR provides a file path. If file path, read it. If neither given, ask once: "Paste the content or provide a file path."
2. **Pick layout.** Layout is freeform — choose the structure that best fits the content:
   - **Stats grid** — 3-6 big numbers + labels
   - **Timeline / process flow** — sequential steps with connectors
   - **Comparison** — 2-column "before/after", "us/them", or feature matrix
   - **Hierarchy** — pyramid, tree, org structure
   - **List with icons** — numbered or bulleted with visual anchors
   - **Mixed** — header stats + body sections + footer CTA
3. **Read brand reference.** Always load `references/brand.md` before drawing — it has the exact hex codes, type scale, spacing tokens, and signature elements. The single source of truth lives at `.claude/skills/_shared/blockscore/tokens.md` and `tokens.json`; `references/brand.md` is the SVG-tuned condensed view. If they conflict, the shared canonical wins.
4. **Pick the right format reference.**
   - Default 4:5 portrait social → use `references/svg-patterns.md` (snippet 1 skeleton).
   - Landscape ad / banner / OG card → load `references/landscape-ads.md`.
   - Portrait mobile marketing (Stories/Reels/Pins/9:16) → load `references/portrait-mobile.md`.
5. **Compose SVG.** Build the file directly. Use the snippets in `references/svg-patterns.md` for cards, gradients, the BlockScore logo mark, dividers, and chart primitives. The format-specific files contain full templates you can adapt rather than rebuild from scratch.
6. **Write output.** Use `Write` tool with the absolute path. Confirm the file exists and report path + dimensions to the user.

## Stat-card overlap rule (read before placing any big metric)

Before drawing any card with a font-size ≥ 56 metric and adjacent text, **read snippet 3 in `references/svg-patterns.md`** and apply the width-budget check:

> `metric_width ≈ font_size × char_count × 0.55`. If `metric_x + metric_width + 24px gutter > next_column_x`, stack vertically (snippet 3a). Do NOT place a side-caption next to a left-anchored big metric on a card narrower than ~520px.

Default to the vertical-stack pattern (3a). Only use the two-column pattern (3c) when the card is ≥ 520px wide AND you've measured both columns.

## Brand Strictness — must follow

- Hero color: `#4dd4c6` (BlockScore Teal). Use sparingly for emphasis — key metric numbers, CTAs, primary highlights.
- Heading text: `#ffffff` in `Inter Tight` 600-700.
- Body text: `#a1e8d9` in `Inter` 400.
- Code/data: `JetBrains Mono` in `#4dd4c6` or `#6ffce0`.
- Cards: fill `#113a33` or `#15473e`, optional 1px border `#165046`, corner radius 12-16px.
- Spacing: multiples of 8px.
- Logo: optional 3x3 grid mark in top-left or bottom-right (see `references/svg-patterns.md` for the exact path data).

Full brand spec: see `references/brand.md`.

## SVG Construction Notes

- Use `viewBox="0 0 W H"` so the SVG scales. Set `width` and `height` attributes to the same numbers for predictable rasterization.
- Prefer `<g>` groups with `transform="translate(x,y)"` for layout sections — easier to reposition.
- For data-heavy infographics with bars/donuts, see chart primitives in `references/svg-patterns.md`.
- Do NOT include `<foreignObject>` (poor renderer support outside browsers).
- Do NOT inline raster images unless user provides them. Geometric/SVG-only assets keep the file portable.

## Verification

After writing, confirm:
- File saved under `output/blockscore/infographics/`
- File opens (size > 1KB, valid XML — first bytes should start with `<?xml` or `<svg`)
- All text readable, no overflow off canvas
- Brand hex codes used (spot-check `#4dd4c6` and `#0d2e28` appear in the SVG)

## Iteration

User feedback like "make the title bigger", "swap the colors", "add a fourth stat" -> edit the existing SVG with the `Edit` tool rather than regenerating from scratch. Preserve the slug and date in the filename unless content meaningfully changes.
