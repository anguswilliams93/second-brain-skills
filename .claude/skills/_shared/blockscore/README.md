# `_shared/blockscore` — Single Source of Truth

Canonical BlockScore brand assets consumed by:

- `pptx-generator` (via `pptx-generator/brands/blockscore/brand.json` which mirrors `tokens.json`)
- `infographic-creator` (via `infographic-creator/references/brand.md`)
- `design` (via `design/SKILL.md` + `globals.css`)
- `brand-voice-generator` (referenced for the BlockScore brand specifically)

## Files

| File | Use |
|------|-----|
| `tokens.md` | AI-readable canonical reference. Read this first. |
| `tokens.json` | Machine-readable for python-pptx + scripts. |
| `globals.css` | Verbatim Tailwind v4 / shadcn token block from the design handoff. Drop into any web project unchanged. |
| `README.md` | This index. |

## Sync source

Mirrors `design_handoff_blockscore_landing/globals.css` + `README.md`. When the handoff updates, regenerate this directory rather than letting individual skills drift.

## Update protocol

1. Edit `tokens.md` (rationale + AI guidance) and `tokens.json` (machine values) together.
2. Replace `globals.css` from the latest handoff if it changed.
3. Sync `pptx-generator/brands/blockscore/brand.json` from `tokens.json` (script: see brand.json header note).
4. Each consuming skill links here — do not duplicate hex values in skill READMEs.
