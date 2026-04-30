# cempura.it

Personal portfolio. Next.js 15 App Router, static-export compatible. Deployed on Vercel.

## Quick Start

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build → .next/
pnpm start    # preview production build
pnpm lint     # ESLint (React + TypeScript)
```

No test suite.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (`@import 'tailwindcss'` + `@source` in `app/globals.css`, `@tailwindcss/postcss`)
- **next-themes** — `html.dark` class, `attribute="class"`
- **@next/mdx** — MDX support (case studies are inline TSX, not MDX files)
- **@vercel/analytics** + **@vercel/speed-insights**
- Fonts via `next/font/google`: Fraunces (`--font-display`), Inter (`--font-body`), JetBrains Mono (`--font-mono`)
- Animations: CSS transitions + `IntersectionObserver` (no Framer Motion)

## Deploy

Auto-deploys on push to `main` via Vercel. Preview deploys on PRs.

## Releases

Versioned with [release-it](https://github.com/release-it/release-it) + conventional commits. Config: `.release-it.json`.

```bash
pnpm release:dry   # preview next release
pnpm release       # cut release: bump version, tag, GitHub release, update CHANGELOG.md
```

Commit prefixes used by changelog: `feat:`, `fix:`, `perf:`, `refactor:`. `chore:`/`docs:`/`style:`/`test:` hidden.

## Routing

App Router.

- `/` — landing page (`app/page.tsx`)
- `/case/[slug]` — case studies, static (`app/case/[slug]/page.tsx`)

## Design System

Color tokens in `app/globals.css` as CSS custom properties. Always use tokens — never hardcoded hex.

| Token            | Usage              |
| ---------------- | ------------------ |
| `var(--bg)`      | page background    |
| `var(--surface)` | card background    |
| `var(--ink)`     | primary text       |
| `var(--muted)`   | secondary text     |
| `var(--border)`  | borders            |
| `var(--accent)`  | gold accent #B8945C|
| `var(--signal)`  | signal red #FF3B2F |

## Conventions

- Named exports everywhere (no default exports except `app/layout.tsx`)
- Mobile-first: `md:` prefix for desktop breakpoints
- Touch targets: 48px min-height for interactive elements
- `font-display` = Fraunces (headlines)
- `font-mono` = JetBrains Mono (terminal, labels, meta)
- Scroll-reveal: wrap with `<Reveal>` (`components/Reveal.tsx`); countup numbers via `<CountUp>`
- Respects `prefers-reduced-motion`

## Project Structure

```
app/
├── layout.tsx          # root layout, fonts, theme provider
├── page.tsx            # landing
├── globals.css         # design tokens, Tailwind config
└── case/[slug]/page.tsx
components/
├── Reveal.tsx          # IntersectionObserver fade+lift
├── CountUp.tsx
├── Footer.tsx
└── landing/            # landing-page sections
.legacy/                # archived Vite/React app
```

## Browser Support

Chrome, Firefox, Safari, Edge (latest 2). iOS Safari, Chrome Mobile. Reduced-motion graceful degradation.
