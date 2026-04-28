# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server → http://localhost:5173
npm run build    # TypeScript check + production build → dist/
npm run lint     # ESLint with React + TypeScript rules
npm run preview  # Preview production build locally
```

No test suite.

## Architecture

Single-page personal portfolio (digital business card). No routing, no state management.

**Stack:** React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion

**Layout:** `App.tsx` renders sections vertically: Hero → Impact → Strengths → Tech → Footer

**Deployment:** Manual GitHub Actions workflow → S3 + CloudFront invalidation.

## Design System

Color tokens defined in `src/index.css` via Tailwind 4 `@theme`. Always use semantic tokens — never hardcoded hex values.

```css
bg-background, bg-surface-1/2/3, border
text-text-primary, text-text-secondary, text-text-muted
accent, accent-hover
```

Spacing: 8px grid (Tailwind defaults). Mobile-first — `sm:` prefix for desktop breakpoints.

## Animation Pattern

Every component uses this pattern (accessibility-aware):

```tsx
const prefersReducedMotion = useReducedMotion();

const variants = {
  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.5 } },
};

// Scroll-triggered:
<motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
```

Define motion variants **inside components** (not imported from `lib/motion.ts`) to keep `useReducedMotion` co-located.

## Conventions

- Named exports everywhere except `App.tsx` (default export)
- Lucide React icons imported per-component
- All interactive elements: 48px min-height for touch targets
