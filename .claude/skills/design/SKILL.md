---
name: design
description: Build dashboard UI components matching the "Second Brain" dashboard design system — dark/light themed panels, KPI cards, scoreboards, donut gauges, bar lists, vertical bar charts, insight cards, callouts, filter rows, topbars, context bars, theme toggles. Use when the user asks to create, modify, or extend dashboard screens, admin panels, analytics widgets, data-viz cards, or any UI component that should match the visual language of the reference library in `references/`. Triggers: "design a dashboard", "build a KPI card", "make an admin panel", "match our design system", "scoreboard", "insights rail", "donut gauge", references to CSS vars like `--bg-2`, `--primary`, `--gradient`, or Tailwind-in-style patterns with `var(--…)`.
---

# Design Skill — Dashboard Component System

React + Tailwind + Motion (`motion/react`) + Phosphor icons. CSS custom-property theming (light/dark via `.dark` on `<html>`). See `references/design-system.md` for tokens/patterns. Component source lives in `references/*.tsx` — read the specific file before modifying or mimicking a component.

**BlockScore brand outputs:** The canonical token block is `.claude/skills/_shared/blockscore/globals.css` (verbatim from the design handoff — Tailwind v4 + shadcn variables for `--background`, `--foreground`, `--primary`, `--card`, `--muted`, `--border`, `--ring`, `--chart-1..5`, `--radius`). For BlockScore work, use those token names. The full rationale + type scale + gradient/shadow definitions live in `_shared/blockscore/tokens.md`. The `--bg-2`, `--fg-2`, `--primary-2` token names below are the legacy Second-Brain dashboard naming — for new BlockScore work prefer the canonical shadcn names from `globals.css`.

## Core rules

1. **Never hardcode colors.** Use CSS vars: `var(--bg)`, `var(--bg-2)`, `var(--bg-3)`, `var(--border)`, `var(--line-2)`, `var(--fg)`, `var(--fg-2)`, `var(--fg-3)`, `var(--fg-4)`, `var(--primary)`, `var(--primary-2)`, `var(--primary-3)`, `var(--gradient)`, `var(--ok)`, `var(--warn)`, `var(--bad)`, `var(--chart-1)`, `var(--shadow-sm)`, `var(--shadow-md)`.
2. **Tone mixing**: semantic backgrounds always `color-mix(in oklab, var(--<tone>) 18%, transparent)` with `color: var(--<tone>)`. `18%` for pills, `16%` for callout icon tiles.
3. **Typography classes**: `inter-tight` for display numerals (fontWeight 500, negative letter-spacing -0.02 to -0.03em). `mono` for uppercase labels, meta, values in tables (tracking 0.03–0.1em). Default sans otherwise.
4. **Radii scale**: panel 16px, card 14px, mini-card 12px, chip/button 10–11px, tiny 7–8px, pill `full`.
5. **Panel shell**: `bg-2` + `border` color + `rounded-[16px]` + `p-[22px]` (or `p-[18px_20px]` for KPI cards).
6. **Icon tile**: `inline-grid place-items-center` square, `bg-3` + `border-line-2` + `color: var(--primary)` (or tone color for insights/callouts). Sizes: 20/22/24/28/36px.
7. **Delta/chip glyphs**: `▲` up, `▼` down, `≈` flat, `!` warn. Always mono font, rounded-full, `text-[10–11px]`.
8. **Animations**: hover lift `whileHover={{ y: -2 }}` duration 0.2 on cards. Bar fills use `cubic-bezier(.2,.7,.2,1)`, 1–1.8s. Donut uses `IntersectionObserver` to trigger once on scroll-in.
9. **Client components**: add `'use client';` when the file uses hooks/motion/event handlers (all charts, interactive cards).
10. **Do not invent new tokens.** If a color/size is not in the reference, reuse the nearest existing one.

## Component map

| Need | Use | File |
|---|---|---|
| Page header + breadcrumb + actions | `Topbar` | `topbar.tsx` |
| Entity selector (who/what this page is about) | `ContextBar` + `ContextTarget` | `context-bar.tsx` |
| Filter bar (selects + range tabs) | `FilterRow`, `Select`, `RangeTabs` | `filter-row.tsx` |
| Theme toggle | `ThemePill` | `theme-pill.tsx` |
| Hero metrics strip (4 cells, gradient hero) | `Scoreboard` + `ScoreCell` | `scoreboard.tsx` |
| Single KPI w/ sparkline + delta | `KpiCard` | `kpi-card.tsx` |
| Small stat tile (grid of 3) | `MiniCard` + `MiniGrid` + `MiniFoot` + `MiniChip` | `mini-card.tsx` |
| Generic framed section | `Panel` + `PanelHead` + `PanelTag` + `TinyBtn` | `panel.tsx` |
| Horizontal ranked bars | `BarList` + `BarRow` | `bar-list.tsx` |
| Vertical bar chart (timeseries) | `VBars` | `vbars.tsx` |
| Circular progress | `DonutGauge` + `DonutStats` | `donut-gauge.tsx` |
| Insight card row (3 tone-striped cards) | `InsightsRail` + `Ins` | `insights-rail.tsx` |
| Inline tone callouts list | `CalloutList` + `Callout` | `callout.tsx` |

## Workflow

1. Identify which primitives above cover the request. Compose — don't re-implement.
2. Read the exact reference file(s) before writing code; copy prop signatures verbatim.
3. If extending a primitive, mirror its existing prop/style shape (CSS vars, class naming, radii).
4. For new primitives, match tokens in `references/design-system.md` and follow the 10 core rules.
5. Verify: no hex/rgb colors in output, no tailwind color utilities (`bg-slate-…`, `text-gray-…`), no inline pixel colors — only `var(--…)` and `color-mix`.

## Required CSS vars (host app must define)

The host app's global CSS must define light and dark values for every var listed in rule 1 plus keyframes `barFill` and `vbar` (used by `bar-list` and `vbars`). See `references/design-system.md` for the reference keyframes and a sample `:root` / `.dark` block.
