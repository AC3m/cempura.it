# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Next.js dev server → http://localhost:3000
npm run build    # TypeScript check + production build → .next/
npm run start    # Preview production build locally
npm run lint     # ESLint with React + TypeScript rules
```

No test suite.

## Architecture

Personal portfolio. Next.js 15 App Router, static export compatible.

**Stack:** React 19, TypeScript, Next.js 15, Tailwind CSS 4, next-themes, @next/mdx, @vercel/analytics

**Routing:** App Router. `/` landing page, `/case/ai-adoption` case study (static).

**Content:** Case studies are inline React components in `app/case/[slug]/page.tsx` (not MDX files).

**Deployment:** Vercel. Automatic deploys on push to `main`.

**Legacy source:** Original Vite/React app archived to `.legacy/`.

## Design System

Color tokens in `app/globals.css` as CSS custom properties. Always use tokens — never hardcoded hex.

```css
var(--bg)        /* page background */
var(--surface)   /* card background */
var(--ink)       /* primary text */
var(--muted)     /* secondary text */
var(--border)    /* borders */
var(--accent)    /* gold accent #B8945C */
var(--signal)    /* signal red #FF3B2F */
```

Dark mode: `html.dark` class set by next-themes (`attribute="class"`).

Tailwind v4 config: `@import 'tailwindcss'` + `@source` directives in `app/globals.css`. PostCSS plugin: `@tailwindcss/postcss` in `postcss.config.mjs`.

Fonts via `next/font/google`: Fraunces (`--font-display`), Inter (`--font-body`), JetBrains Mono (`--font-mono`).

## Animation Pattern

Use the `Reveal` component (`components/Reveal.tsx`) for scroll-triggered fade+lift:

```tsx
<Reveal delay={120}>
  <p>Content revealed on scroll</p>
</Reveal>
```

`Reveal` uses `IntersectionObserver` + CSS `.reveal` / `.reveal.in` classes. Respects `prefers-reduced-motion`.

For countup numbers: `CountUp` component (`components/CountUp.tsx`).

## Conventions

- Named exports everywhere (no default exports except `app/layout.tsx`)
- No Framer Motion — animations via CSS transitions + IntersectionObserver
- All interactive elements: 48px min-height for touch targets
- Mobile-first: `md:` prefix for desktop breakpoints
- `font-display` class = Fraunces serif (headlines)
- `font-mono` class = JetBrains Mono (terminal, labels, meta)
