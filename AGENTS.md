<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Design System: Material Design 3

This project uses **[Material Design 3](https://m3.material.io/)** as the only design system. Follow it for every UI, layout, motion, and visual decision. Do not use Material 2 or invent a parallel style.

## Source of truth

Before creating or restyling UI, read the matching page on [m3.material.io](https://m3.material.io/) (Foundations, Styles, Components). Use the official M3 component name, variants, and anatomy.

## Implementation

- Stack: Next.js + React + Tailwind v4. Express M3 with CSS tokens (`--md-sys-color-*`, `--md-sys-typescale-*`, `--md-sys-shape-*`) and custom React components.
- Do **not** install `@material/web` unless the user explicitly asks.
- Color, type, shape, and elevation come from tokens — never one-off hex/px in components. Pair every fill with its `on-*` color.
- Elevation is primarily tonal surface (`surface-container-*`), not drop shadows.
- Interactive elements need M3 states: enabled, hovered, focused, pressed, disabled.

## Typefaces (do not replace)

Font families are already defined in `app/globals.css`. Reuse them; never introduce Roboto or other M3 default typefaces.

- **Titles** (display / headline / title): `var(--font-serif)` / `font-serif`
- **Body** (body / label): `var(--font-sans)` / `font-sans`
- **Code**: `var(--font-mono)` / `font-mono`

M3 typescale tokens may set size, weight, line-height, and tracking only. `--md-sys-typescale-*-font` and `--md-ref-typeface-*` must point at those same CSS variables.

## Blog mapping

- Site header → [Top app bar](https://m3.material.io/components/top-app-bar/overview)
- Post list item → [Card](https://m3.material.io/components/cards/overview)
- Tags → [Chips](https://m3.material.io/components/chips/overview)
- Prefer M3 names in code (`TopAppBar`, `FilledCard`, `FilledTonalButton`)
