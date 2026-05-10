# Design System Tokens & Patterns

Extracted from `references/*.tsx`. Use as the source of truth for tokens, sizes, and animation curves.

## Color tokens (CSS custom properties)

Surfaces (darkest → lightest in dark mode; inverse in light):
- `--bg` — page background
- `--bg-2` — panel / card background
- `--bg-3` — inner tile / track / hover background

Text:
- `--fg` — primary text
- `--fg-2` — secondary text (bar row labels, select values)
- `--fg-3` — muted / meta / uppercase labels
- `--fg-4` — faintest (crumb separators)

Lines:
- `--border` — panel/card borders
- `--line-2` — inner dividers, track backgrounds, subtler borders

Brand:
- `--primary` — accent color
- `--primary-2`, `--primary-3` — gradient stops (used in donut gradient)
- `--gradient` — pre-baked brand gradient (used for bar fills, initials pill, hover underline)

Semantic:
- `--ok` — success / up
- `--warn` — warning
- `--bad` — error / down

Charts / shadows:
- `--chart-1` — sparkline stroke
- `--shadow-sm`, `--shadow-md` — elevation

## Typography

- **`inter-tight`** (utility class): large numerals. `fontWeight: 500`, `letter-spacing: -0.02em` to `-0.03em`. Common sizes: 48 (scoreboard hero), 36 (KPI), 32 (topbar title), 30 (donut), 28 (mini-card / insight value), 18 (donut stat value).
- **`mono`** (utility class): uppercase labels, delta pills, mini-foot, crumb. Sizes 10–13px, tracking 0.03–0.1em.
- Body: no class, default sans, 12.5–14px, `tracking-[-0.003em]`.

## Radii

| Use | Value |
|---|---|
| Panel / card / scoreboard | 16 |
| Insight card | 14 |
| Context bar wrapper | 14 |
| Mini-card / context target | 12 |
| Callout / rangeTabs wrapper / themePill wrapper | 10–11 |
| Button / select | 9–10 |
| Chip icon tile | 8 |
| TinyBtn / rangeTabs inner / themePill seg | 7 |
| Mini-card icon tile | 6 |
| Bar row track | 6 |
| Square dot | 2–4 |
| Pill / delta badge | `full` |

## Spacing conventions

- Panel padding: 22px (Panel), 18–20px (KPI / insight), 16px horizontal + 14px vertical (MiniCard).
- Gap between cards in a rail/grid: 12px.
- Section bottom margin: 22–28px (scoreboard, context bar, topbar).
- Filter row bottom margin: 18px.

## Animations

Cubic-bezier: `cubic-bezier(.2,.7,.2,1)` for all bar/donut transitions.

Keyframes the host app must define:

```css
@keyframes barFill {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes vbar {
  from { transform: scaleY(0); }
  to   { transform: scaleY(1); }
}
```

(Note: `bar-list.tsx` sets `transformOrigin: left` + `animationName: barFill`; `vbars.tsx` sets `transformOrigin: bottom` + `animationName: vbar`.)

Motion patterns:
- Card hover: `whileHover={{ y: -2 }}`, duration 0.2, border swaps to `color-mix(in oklab, var(--primary) 30%, var(--border))`, shadow becomes `var(--shadow-md)`.
- Donut: IntersectionObserver triggers single 1.8s stroke-dashoffset tween + number count-up.
- Scoreboard bar: `setTimeout(delay)` → `transform: scaleX(0 → 1)`, 1.2s.

## Tone pill recipe

```ts
const toneBg = (tone) => `color-mix(in oklab, var(--${tone}) 18%, transparent)`;
const toneFg = (tone) => `var(--${tone})`;
// flat/info tone:
// { background: 'var(--bg-3)', color: 'var(--fg-3)', border: '1px solid var(--line-2)' }
```

Glyphs: `▲` up, `▼` down, `≈` flat, `!` warn.

## Sample CSS (host app — for reference only)

```css
:root {
  --bg: #fafaf9;
  --bg-2: #ffffff;
  --bg-3: #f3f3f1;
  --fg: #141414;
  --fg-2: #2a2a2a;
  --fg-3: #6b6b6b;
  --fg-4: #a8a8a8;
  --border: #e7e7e4;
  --line-2: #ececea;
  --primary: #3b5bdb;
  --primary-2: #4c6ef5;
  --primary-3: #7c3aed;
  --gradient: linear-gradient(90deg, var(--primary-2), var(--primary-3));
  --ok: #15803d;
  --warn: #b45309;
  --bad: #b91c1c;
  --chart-1: var(--primary);
  --shadow-sm: 0 1px 2px rgba(0,0,0,.04);
  --shadow-md: 0 6px 20px rgba(0,0,0,.08);
}
.dark {
  --bg: #0b0b0c;
  --bg-2: #131315;
  --bg-3: #1b1b1e;
  --fg: #f5f5f4;
  --fg-2: #d4d4d2;
  --fg-3: #8a8a88;
  --fg-4: #4a4a48;
  --border: #26262a;
  --line-2: #2e2e33;
  --primary: #8b5cf6;
  --primary-2: #a78bfa;
  --primary-3: #c084fc;
  --shadow-sm: 0 1px 2px rgba(0,0,0,.4);
  --shadow-md: 0 10px 30px rgba(0,0,0,.5);
}
```

## Required fonts / classes

Host app must provide utility classes:
- `.inter-tight` — `font-family: 'Inter Tight', system-ui, sans-serif;`
- `.mono` — `font-family: 'JetBrains Mono', ui-monospace, monospace;`

## Dependencies used by references

- `react` (with hooks)
- `motion/react` (framer-motion v11+ package name)
- `@phosphor-icons/react` (icons, `weight='bold'` default)
- Tailwind CSS (arbitrary value syntax `text-[11.5px]`, `rounded-[16px]`, etc.)
