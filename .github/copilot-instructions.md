# Copilot Instructions

## Project Overview

Single-page personal portfolio website (digital business card) built with React 19, TypeScript, Vite, and Tailwind CSS 4. Static site with component-based architecture and Framer Motion animations.

## Architecture

**Single-page app structure:**
- [src/App.tsx](../src/App.tsx): Root component that imports and renders all sections vertically (Hero → Impact → Strengths → Tech → Footer)
- [src/components/](../src/components/): Self-contained section components with embedded motion variants
- No routing, no state management - pure presentational components

**Key files:**
- [src/lib/motion.ts](../src/lib/motion.ts): Reusable Framer Motion animation presets
- [src/index.css](../src/index.css): Tailwind 4 CSS with custom `@theme` token definitions

## Design System

**Color tokens** (defined in [index.css](../src/index.css#L24-L36)):
```css
background, surface-1, surface-2, surface-3, border
text-primary, text-secondary, text-muted
accent, accent-hover
```

Always use semantic tokens (e.g., `bg-surface-1`, `text-text-secondary`) - never hardcoded hex values in JSX.

**Spacing:** 8px grid system (Tailwind defaults: `p-4` = 16px, `p-6` = 24px, etc.)

**Mobile-first:** All sections start with mobile layout, use `sm:` prefix for desktop breakpoints

## Animation Patterns

**Every component follows this pattern:**
```tsx
const prefersReducedMotion = useReducedMotion()

const variants = {
  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.5 } }
}
```

**Scroll-triggered sections use:**
```tsx
initial="hidden"
whileInView="visible"
viewport={{ once: true, margin: '-50px' }}
```

See [Hero.tsx](../src/components/Hero.tsx#L12-L27) and [Impact.tsx](../src/components/Impact.tsx#L25-L45) for canonical examples.

## Development Commands

```bash
npm run dev      # Start Vite dev server (default: http://localhost:5173)
npm run build    # TypeScript check + production build → dist/
npm run preview  # Preview production build locally
npm run lint     # ESLint with React + TypeScript rules
```

## Deployment

**Primary:** Manual GitHub Actions workflow [.github/workflows/deploy.yml](../.github/workflows/deploy.yml)
- Trigger: GitHub Actions → "Deploy to S3" → Run workflow
- Requires AWS secrets configured in PROD environment (see [README.md](../README.md#L29-L36))
- Workflow: builds → syncs to S3 → invalidates CloudFront → tags release

**Build output:** `dist/` directory (not committed, generated on deploy)

## Content Updates

**Key sections to customize:**
- Hero: [src/components/Hero.tsx](../src/components/Hero.tsx) (name, title, LinkedIn URL)
- Tech stack: [src/components/Tech.tsx](../src/components/Tech.tsx) (`techGroups` array)
- Footer: [src/components/Footer.tsx](../src/components/Footer.tsx) (CV link, social links)

## Conventions

- **No default exports** except [App.tsx](../src/App.tsx) - all components use named exports
- **Inline variants:** Define motion variants inside components, not imported from [motion.ts](../src/lib/motion.ts), to keep accessibility logic co-located
- **Icon imports:** Use lucide-react icons, imported per-component (e.g., `import { Mail, ArrowUpRight } from 'lucide-react'`)
- **Accessibility:** All interactive elements have 48px min-height for touch targets
