# cempura.it v2 — Next.js Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate cempura.it from Vite/React to Next.js 15 App Router, implementing the Claude Design handoff pixel-perfectly with Fraunces + Inter + JetBrains Mono, light/dark theme, terminal hero, and MDX-driven case studies.

**Architecture:** Single Next.js app, App Router, static export compatible. Landing page at `/`, case study dynamic route at `/case/[slug]` generated from `.mdx` files in `content/case-studies/`. Global theme via `next-themes`. No client-side routing hacks — proper file-system routing replaces hash routing.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 4, Framer Motion, next-themes, @next/mdx, gray-matter, @vercel/analytics, @vercel/speed-insights, shadcn/ui (Button only)

---

## File Map

### New files to create
```
app/
  layout.tsx                  # Root layout: fonts, ThemeProvider, Analytics
  page.tsx                    # Landing page (server component shell)
  globals.css                 # Design tokens, keyframes, utility classes
  icon.tsx                    # Favicon from bracket SVG
  opengraph-image.tsx         # OG image via next/og
  sitemap.ts                  # Sitemap
  robots.ts                   # Robots.txt
  case/
    [slug]/
      page.tsx                # Case study dynamic route
      loading.tsx             # Optional loading state

components/
  LogoMark.tsx                # Bracket SVG mark + wordmark
  ThemeToggle.tsx             # [ light ] / [ dark ] monospace toggle
  TopBar.tsx                  # Fixed header
  ScrollProgress.tsx          # 1px signal-red progress line
  Crosshair.tsx               # Mouse crosshair + coordinates
  Reveal.tsx                  # IntersectionObserver fade+lift
  CountUp.tsx                 # Animated number count-up
  TerminalBoot.tsx            # Typewriter terminal sequence
  SectionHead.tsx             # Swiss ordinal header
  Footer.tsx                  # Three-column footer
  landing/
    Hero.tsx                  # Terminal + headline + CTAs
    SynekSection.tsx          # Featured project Swiss split
    CaseCards.tsx             # 3 case study cards
    PositioningStrip.tsx      # Editorial pull paragraph
  case/
    Crumb.tsx                 # Sticky breadcrumb
    Pull.tsx                  # Large pull-quote component
    OutcomeGrid.tsx           # 3-column stat callouts
    Stat.tsx                  # Single count-up stat
    Lessons.tsx               # Lessons list with dash prefix
    ApproachStep.tsx          # Numbered approach row
    PrevNext.tsx              # Prev/next nav

content/
  case-studies/
    ai-adoption.mdx           # Case study 01 content

mdx-components.tsx            # MDX component map

next.config.mjs               # MDX + image domain config
tailwind.config.ts            # (if needed for v4 compat)
```

### Files to archive (move to .legacy/)
```
src/           → .legacy/src/
public/logo*.png → .legacy/ (keep favicon-32x32.png, favicon.png)
vite.config.ts → .legacy/
index.html     → .legacy/
```

### Files to delete
```
.handoff-tmp/   (temp extraction directory)
```

---

## Task 0: Create worktree + branch

**Files:** none (git ops)

- [ ] **Step 1: Create branch + worktree**

```bash
git checkout -b redesign/v2
```

- [ ] **Step 2: Archive legacy source**

```bash
mkdir -p .legacy
mv src .legacy/src
mv vite.config.ts .legacy/vite.config.ts 2>/dev/null || true
mv index.html .legacy/index.html 2>/dev/null || true
```

- [ ] **Step 3: Clean up temp extraction dir**

```bash
rm -rf .handoff-tmp
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: archive legacy vite source to .legacy/"
```

---

## Task 1: Bootstrap Next.js

**Files:**
- Create: `next.config.mjs`
- Create: `mdx-components.tsx`
- Modify: `package.json`
- Modify: `tsconfig.json`

- [ ] **Step 1: Install Next.js + deps**

```bash
npm install next@15 react@19 react-dom@19
npm install @next/mdx @mdx-js/react @types/mdx
npm install gray-matter
npm install next-themes
npm install framer-motion
npm install @vercel/analytics @vercel/speed-insights
npm install -D @types/node
```

- [ ] **Step 2: Install shadcn (Button only)**

```bash
npx shadcn@latest init --defaults
npx shadcn@latest add button
```

When prompted: TypeScript yes, Tailwind yes, App Router yes, `@/` alias.

- [ ] **Step 3: Write next.config.mjs**

```js
import createMDX from '@next/mdx'

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

export default withMDX(nextConfig)
```

- [ ] **Step 4: Write mdx-components.tsx**

```tsx
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components }
}
```

- [ ] **Step 5: Update tsconfig.json paths**

Ensure `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

- [ ] **Step 6: Update package.json scripts**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

Remove vite-related scripts (`preview`, etc).

- [ ] **Step 7: Verify dev server starts**

```bash
npm run dev
```

Expected: `▲ Next.js 15.x.x` on `http://localhost:3000`. Default Next.js page renders. No errors.

- [ ] **Step 8: Commit**

```bash
git add next.config.mjs mdx-components.tsx package.json tsconfig.json package-lock.json
git commit -m "feat: bootstrap Next.js 15 with MDX, next-themes, framer-motion"
```

---

## Task 2: Global styles + design tokens

**Files:**
- Create: `app/globals.css`
- Modify: `app/layout.tsx` (created in Task 3, but CSS referenced here)

- [ ] **Step 1: Write app/globals.css**

```css
@import 'tailwindcss';

/* ===== DESIGN TOKENS ===== */
:root {
  --bg: #F5F2EC;
  --surface: #FFFFFF;
  --ink: #1A1816;
  --muted: #6B6660;
  --border: #E2DDD3;
  --accent: #B8945C;
  --signal: #FF3B2F;
  --grid-line: rgba(26, 24, 22, 0.05);
}

html.dark {
  --bg: #151413;
  --surface: #1c1b19;
  --ink: #f7f5f2;
  --muted: #b5b0a8;
  --border: #2d2b28;
  --accent: #c9a87c;
  --signal: #FF6B5C;
  --grid-line: rgba(247, 245, 242, 0.04);
}

html,
body {
  background: var(--bg);
  color: var(--ink);
}

body {
  font-feature-settings: 'ss01', 'cv11';
  letter-spacing: -0.005em;
  transition: background-color 220ms ease, color 220ms ease;
}

/* ===== SELECTION ===== */
::selection {
  background: var(--signal);
  color: #fff;
}

/* ===== FOCUS ===== */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* ===== SCROLLBAR ===== */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--muted); }

/* ===== CURSOR BLINK ===== */
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.cursor-blink::after {
  content: '▌';
  display: inline-block;
  margin-left: 2px;
  animation: blink 1.06s steps(1, end) infinite;
  color: var(--ink);
  font-weight: 400;
  transform: translateY(-0.05em);
}

.cursor-blink-signal::after {
  content: '▌';
  display: inline-block;
  margin-left: 2px;
  animation: blink 1.06s steps(1, end) infinite;
  color: var(--signal);
}

/* ===== SCROLL PROGRESS ===== */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 1px;
  background: var(--signal);
  width: 0%;
  z-index: 100;
  transition: width 80ms linear;
}

/* ===== REVEAL ANIMATION ===== */
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 700ms ease, transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1);
}
.reveal.in {
  opacity: 1;
  transform: none;
}

/* ===== BUTTONS ===== */
.btn-bracket {
  display: inline-flex;
  align-items: center;
  min-height: 48px;
  padding: 0 18px;
  border: 1px solid var(--border);
  color: var(--ink);
  background: transparent;
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.02em;
  transition: color 180ms ease, border-color 180ms ease, background 180ms ease;
  text-decoration: none;
}
.btn-bracket:hover {
  color: var(--signal);
  border-color: var(--signal);
}
.btn-bracket .arrow {
  transition: transform 220ms ease;
  display: inline-block;
  margin-left: 6px;
}
.btn-bracket:hover .arrow {
  transform: translateX(3px);
}

/* ===== INLINE LINK ===== */
.ilink {
  color: var(--signal);
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 1px;
  background-repeat: no-repeat;
  background-position: 0 100%;
  transition: background-size 240ms ease;
}
.ilink:hover {
  background-size: 100% 1px;
}

/* ===== CASE CARD ===== */
.case-card {
  transition: transform 320ms cubic-bezier(0.2, 0.7, 0.2, 1), border-color 320ms ease;
  will-change: transform;
}
.case-card.active:hover {
  transform: translateY(-4px);
  border-color: var(--ink);
}
.case-card.active:hover .read-underline {
  width: 100%;
}
.read-underline {
  width: 0;
  height: 1px;
  background: var(--signal);
  transition: width 360ms cubic-bezier(0.2, 0.7, 0.2, 1);
}

/* ===== CROSSHAIR ===== */
.crosshair-h,
.crosshair-v {
  position: fixed;
  pointer-events: none;
  z-index: 60;
  background: var(--ink);
  opacity: 0.06;
}
.crosshair-h { left: 0; right: 0; height: 1px; }
.crosshair-v { top: 0; bottom: 0; width: 1px; }

/* ===== LOGO MARK ===== */
.mark {
  filter: invert(0.07) brightness(0.5) contrast(1.2);
}
html.dark .mark {
  filter: invert(0.95) brightness(1.1) contrast(0.9);
}

/* ===== IMAGE PLACEHOLDER ===== */
.ph-rect {
  background-color: transparent;
  background-image: repeating-linear-gradient(
    45deg,
    var(--border) 0 1px,
    transparent 1px 14px
  );
  border: 1px solid var(--accent);
}

/* ===== NUMBER CALLOUT ===== */
.num-callout {
  color: var(--accent);
  letter-spacing: -0.045em;
  line-height: 0.92;
}

/* ===== SECTION ORDINAL ===== */
.ord {
  font-family: var(--font-mono);
  color: var(--muted);
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: lowercase;
}

/* ===== PULL QUOTE ===== */
.pull {
  font-weight: 300;
  line-height: 1.06;
  letter-spacing: -0.025em;
}

/* ===== STICKY BREADCRUMB BACKDROP ===== */
.crumb-blur {
  background: color-mix(in srgb, var(--bg) 84%, transparent);
  backdrop-filter: saturate(140%) blur(8px);
  -webkit-backdrop-filter: saturate(140%) blur(8px);
}

/* ===== STACK CHIP ===== */
.chip {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--muted);
  border: 1px solid var(--border);
  padding: 5px 9px;
  border-radius: 999px;
  transition: color 180ms ease, border-color 180ms ease;
}
.chip:hover {
  color: var(--ink);
  border-color: var(--ink);
}

/* ===== REDUCED MOTION ===== */
@media (prefers-reduced-motion: reduce) {
  .reveal {
    transition: opacity 220ms ease;
    transform: none;
  }
  .cursor-blink::after,
  .cursor-blink-signal::after {
    animation: none;
    opacity: 1;
  }
}

/* ===== COARSE POINTER (touch) — hide crosshair ===== */
@media (pointer: coarse) {
  .crosshair-h,
  .crosshair-v {
    display: none;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat: add design tokens and utility classes to globals.css"
```

---

## Task 3: Root layout + theme provider

**Files:**
- Create: `app/layout.tsx`
- Create: `components/Providers.tsx`

- [ ] **Step 1: Write components/Providers.tsx**

```tsx
'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="cempura.theme"
    >
      {children}
    </ThemeProvider>
  )
}
```

- [ ] **Step 2: Write app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Providers } from '@/components/Providers'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  weight: ['300', '400', '500'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Artur Cempura — Engineering Lead, AI Enablement',
  description:
    'AI-assisted delivery, internal tooling, and team scaling — for organizations that want results, not roadmaps.',
  metadataBase: new URL('https://cempura.it'),
  openGraph: {
    title: 'Artur Cempura — Engineering Lead, AI Enablement',
    description:
      'AI-assisted delivery, internal tooling, and team scaling — for organizations that want results, not roadmaps.',
    url: 'https://cempura.it',
    siteName: 'cempura.it',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artur Cempura — Engineering Lead, AI Enablement',
    description:
      'AI-assisted delivery, internal tooling, and team scaling — for organizations that want results, not roadmaps.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body
        style={{
          fontFamily: 'var(--font-body), -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        <Providers>
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Add font CSS vars to globals.css** (append to `:root`)

```css
:root {
  /* ... existing vars ... */
  --font-display: 'Fraunces', 'Times New Roman', serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Berkeley Mono', ui-monospace, monospace;
}
```

Also add utility classes in globals.css:
```css
.font-display { font-family: var(--font-display); font-variation-settings: 'opsz' 144; letter-spacing: -0.04em; }
.font-mono    { font-family: var(--font-mono); font-feature-settings: 'calt' 0; }
.font-body    { font-family: var(--font-body); }
```

- [ ] **Step 4: Verify no hydration errors**

```bash
npm run dev
```

Open `http://localhost:3000`. Check browser console: no `Extra attributes from the server` warnings. Theme class applies on `<html>`. Fonts load (check Network tab: Fraunces, Inter, JetBrains Mono).

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx components/Providers.tsx app/globals.css
git commit -m "feat: add root layout with next-themes, next/font, Vercel analytics"
```

---

## Task 4: Foundation components

**Files:**
- Create: `components/LogoMark.tsx`
- Create: `components/ThemeToggle.tsx`
- Create: `components/TopBar.tsx`
- Create: `components/ScrollProgress.tsx`
- Create: `components/Crosshair.tsx`
- Create: `components/Reveal.tsx`
- Create: `components/CountUp.tsx`
- Create: `components/TerminalBoot.tsx`
- Create: `components/SectionHead.tsx`
- Create: `components/Footer.tsx`

- [ ] **Step 1: Write components/LogoMark.tsx**

```tsx
import Link from 'next/link'

export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 group ${className}`} style={{ color: 'var(--ink)' }}>
      <svg viewBox="0 0 28 28" className="w-7 h-7" aria-hidden="true">
        <path
          d="M5 6 L2 14 L5 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M23 6 L26 14 L23 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <text
          x="14"
          y="18"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="11"
          fontWeight="500"
          fill="currentColor"
          letterSpacing="0"
        >
          ac
        </text>
      </svg>
      <span className="font-mono text-[12px] tracking-[0.06em]" style={{ color: 'var(--ink)' }}>
        cempura<span style={{ color: 'var(--muted)' }}>.it</span>
      </span>
    </Link>
  )
}
```

- [ ] **Step 2: Write components/ThemeToggle.tsx**

```tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-28 h-8" /> // placeholder to prevent layout shift

  return (
    <div
      className="font-mono text-[12px] tracking-[0.04em] flex items-center gap-1 select-none"
      style={{ color: 'var(--muted)' }}
    >
      <button
        onClick={() => setTheme('light')}
        className="px-1.5 py-1 transition-colors"
        style={{ color: theme === 'light' ? 'var(--ink)' : 'var(--muted)' }}
        aria-pressed={theme === 'light'}
      >
        <span className={theme === 'light' ? 'cursor-blink' : ''}>[ light ]</span>
      </button>
      <span style={{ color: 'var(--border)' }}>/</span>
      <button
        onClick={() => setTheme('dark')}
        className="px-1.5 py-1 transition-colors"
        style={{ color: theme === 'dark' ? 'var(--ink)' : 'var(--muted)' }}
        aria-pressed={theme === 'dark'}
      >
        <span className={theme === 'dark' ? 'cursor-blink' : ''}>[ dark ]</span>
      </button>
    </div>
  )
}
```

- [ ] **Step 3: Write components/TopBar.tsx**

```tsx
import Link from 'next/link'
import { LogoMark } from './LogoMark'
import { ThemeToggle } from './ThemeToggle'

interface TopBarProps {
  showBack?: boolean
}

export function TopBar({ showBack }: TopBarProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 crumb-blur"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
        <LogoMark />
        <nav className="flex items-center gap-6">
          {showBack && (
            <Link href="/" className="font-mono text-[12px]" style={{ color: 'var(--muted)' }}>
              <span className="ilink">← back to index</span>
            </Link>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
```

- [ ] **Step 4: Write components/ScrollProgress.tsx**

```tsx
'use client'

import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const total = h.scrollHeight - h.clientHeight
      const pct = total > 0 ? (h.scrollTop / total) * 100 : 0
      if (ref.current) ref.current.style.width = pct + '%'
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <div ref={ref} className="scroll-progress" />
}
```

- [ ] **Step 5: Write components/Crosshair.tsx**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'

export function Crosshair() {
  const hRef = useRef<HTMLDivElement>(null)
  const vRef = useRef<HTMLDivElement>(null)
  const [coord, setCoord] = useState({ x: 0, y: 0, visible: false })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (hRef.current) hRef.current.style.top = e.clientY + 'px'
      if (vRef.current) vRef.current.style.left = e.clientX + 'px'
      setCoord({ x: e.clientX, y: e.clientY, visible: true })
    }
    const onLeave = () => setCoord((c) => ({ ...c, visible: false }))
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <div ref={hRef} className="crosshair-h" />
      <div ref={vRef} className="crosshair-v" />
      <div
        className="fixed bottom-3 right-3 z-50 font-mono text-[11px] pointer-events-none"
        style={{
          color: 'var(--muted)',
          opacity: coord.visible ? 1 : 0,
          transition: 'opacity 200ms ease',
        }}
      >
        x:{String(coord.x).padStart(4, '0')}{'  '}y:{String(coord.y).padStart(4, '0')}
      </div>
    </>
  )
}
```

- [ ] **Step 6: Write components/Reveal.tsx**

```tsx
'use client'

import { useEffect, useRef } from 'react'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: keyof JSX.IntrinsicElements
}

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      el.classList.add('in')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => el.classList.add('in'), delay)
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  )
}
```

- [ ] **Step 7: Write components/CountUp.tsx**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  to: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
}

export function CountUp({ to, suffix = '', prefix = '', duration = 1400, decimals = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setVal(to); return }

    let raf: number
    let start: number

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const animate = (ts: number) => {
              if (!start) start = ts
              const t = Math.min((ts - start) / duration, 1)
              const eased = 1 - Math.pow(1 - t, 3)
              setVal(to * eased)
              if (t < 1) raf = requestAnimationFrame(animate)
            }
            raf = requestAnimationFrame(animate)
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [to, duration])

  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val)
  return <span ref={ref}>{prefix}{display}{suffix}</span>
}
```

- [ ] **Step 8: Write components/TerminalBoot.tsx**

```tsx
'use client'

import { useEffect, useState } from 'react'

const LINES = [
  { kind: 'cmd', text: '$ whoami' },
  { kind: 'out', text: 'artur cempura' },
  { kind: 'out', text: 'engineering lead · ai enablement' },
  { kind: 'out', text: 'krakow / poland · hybrid · remote' },
] as const

interface TerminalBootProps {
  onSettle?: () => void
}

export function TerminalBoot({ onSettle }: TerminalBootProps) {
  const [shown, setShown] = useState([{ kind: 'cmd' as const, text: '' }])
  const [phase, setPhase] = useState<'typing' | 'printing' | 'done'>('typing')

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setShown([...LINES])
      setPhase('done')
      onSettle?.()
      return
    }

    let cancelled = false

    const run = async () => {
      const cmd = LINES[0].text
      for (let i = 1; i <= cmd.length; i++) {
        if (cancelled) return
        setShown([{ kind: 'cmd', text: cmd.slice(0, i) }])
        await new Promise((r) => setTimeout(r, 55))
      }
      await new Promise((r) => setTimeout(r, 520))
      setPhase('printing')

      const next: typeof shown = [{ kind: 'cmd', text: cmd }]
      for (let i = 1; i < LINES.length; i++) {
        if (cancelled) return
        next.push(LINES[i])
        setShown([...next])
        await new Promise((r) => setTimeout(r, 220))
      }
      await new Promise((r) => setTimeout(r, 280))
      if (cancelled) return
      setPhase('done')
      onSettle?.()
    }

    run()
    return () => { cancelled = true }
  }, [onSettle])

  return (
    <div className="font-mono text-[12px] leading-[1.65]" style={{ color: 'var(--muted)' }}>
      {shown.map((l, i) => (
        <div key={i}>
          <span style={{ color: l.kind === 'cmd' ? 'var(--ink)' : 'var(--muted)' }}>
            {l.text}
          </span>
          {i === shown.length - 1 && phase !== 'done' && (
            <span className="cursor-blink" />
          )}
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 9: Write components/SectionHead.tsx**

```tsx
interface SectionHeadProps {
  ord: string
  label: string
  className?: string
}

export function SectionHead({ ord, label, className = '' }: SectionHeadProps) {
  return (
    <div className={`flex items-baseline gap-3 ${className}`}>
      <span className="ord">{ord}</span>
      <span className="font-mono text-[12px] tracking-[0.06em]" style={{ color: 'var(--muted)' }}>
        — {label}
      </span>
    </div>
  )
}
```

- [ ] **Step 10: Write components/Footer.tsx**

```tsx
export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <div className="ord mb-4">contact</div>
            <ul className="space-y-2 text-[15px]" style={{ color: 'var(--ink)' }}>
              <li>
                <a className="ilink" href="mailto:artur@cempura.it">
                  artur@cempura.it
                </a>
              </li>
              <li>
                <a
                  className="ilink"
                  href="https://linkedin.com/in/arturcempura"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/arturcempura
                </a>
              </li>
              <li>
                <a
                  className="ilink"
                  href="https://github.com/AC3m"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/AC3m
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-4">
            <div className="ord mb-4">meta</div>
            <ul className="space-y-2 font-mono text-[12px]" style={{ color: 'var(--muted)' }}>
              <li>last updated: 2026-04-28</li>
              <li>version: v2.0</li>
              <li>uptime: 100%</li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-4">
            <div className="ord mb-4">colophon</div>
            <p className="font-mono text-[12px] leading-[1.7]" style={{ color: 'var(--muted)' }}>
              set in fraunces, inter, jetbrains mono · built with next.js, tailwind, framer motion
            </p>
          </div>
        </div>

        <div
          className="mt-20 pt-6 flex items-center justify-between font-mono text-[12px]"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}
        >
          <span>
            <span style={{ color: 'var(--ink)' }} className="cursor-blink-signal">
              $ end_of_line
            </span>
          </span>
          <span>© 2026 — krakow / pl</span>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 11: Commit**

```bash
git add components/
git commit -m "feat: add foundation components (LogoMark, ThemeToggle, TopBar, Reveal, CountUp, TerminalBoot, Footer)"
```

---

## Task 5: Landing page

**Files:**
- Create: `app/page.tsx`
- Create: `components/landing/Hero.tsx`
- Create: `components/landing/SynekSection.tsx`
- Create: `components/landing/CaseCards.tsx`
- Create: `components/landing/PositioningStrip.tsx`

- [ ] **Step 1: Write components/landing/Hero.tsx**

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TerminalBoot } from '../TerminalBoot'

export function Hero() {
  const [settled, setSettled] = useState(false)

  return (
    <section className="relative pt-24 md:pt-32 min-h-[100vh] flex flex-col">
      <div className="max-w-[1280px] w-full mx-auto px-6 md:px-8 flex-1 flex flex-col">

        {/* Terminal layer */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <TerminalBoot onSettle={() => setSettled(true)} />
          </div>
          <div className="hidden md:block col-span-7">
            <div
              className="font-mono text-[11px] flex justify-end gap-6"
              style={{ color: 'var(--muted)' }}
            >
              <span>lat 50.0647° n</span>
              <span>lon 19.9450° e</span>
              <span>tz utc+2</span>
            </div>
          </div>
        </div>

        {/* Display headline */}
        <div
          className={`mt-16 md:mt-24 transition-opacity duration-700 ${settled ? 'opacity-100' : 'opacity-0'}`}
        >
          <h1
            className="font-display font-light leading-[0.95]"
            style={{ fontSize: 'clamp(44px, 8vw, 132px)', color: 'var(--ink)' }}
          >
            {['Building the systems', 'that make engineering', 'teams faster.'].map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
        </div>

        {/* Subhead + CTAs */}
        <div
          className={`mt-10 md:mt-14 grid grid-cols-12 gap-6 transition-opacity duration-700 delay-200 ${
            settled ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p
            className="col-span-12 md:col-span-7 text-[17px] md:text-[19px] leading-[1.5]"
            style={{ color: 'var(--muted)' }}
          >
            <span style={{ color: 'var(--ink)' }}>
              AI-assisted delivery, internal tooling, and team scaling
            </span>{' '}
            — for organizations that want results, not roadmaps.
          </p>
          <div className="col-span-12 md:col-span-5 flex md:justify-end items-end gap-3 flex-wrap">
            <Link href="/case/ai-adoption" className="btn-bracket">
              [ view case study <span className="arrow">→</span> ]
            </Link>
            <a href="#synek" className="btn-bracket">
              [ see SYNEK <span className="arrow">↗</span> ]
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="mt-auto pt-16 pb-8 flex items-end justify-between font-mono text-[11px]"
          style={{ color: 'var(--muted)' }}
        >
          <span>↓ scroll · 04 sections</span>
          <span>{new Date().toISOString().slice(0, 10)} · session.live</span>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write components/landing/SynekSection.tsx**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { Reveal } from '../Reveal'
import { SectionHead } from '../SectionHead'

export function SynekSection() {
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = visualRef.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const mid = window.innerHeight / 2
      const delta = (rect.top + rect.height / 2 - mid) / window.innerHeight
      el.style.transform = `translateY(${(-delta * 16).toFixed(2)}px)`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="synek"
      className="py-[96px] md:py-[160px] border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <Reveal>
          <SectionHead ord="01" label="featured / live project" className="mb-12 md:mb-16" />
        </Reveal>

        <div className="grid grid-cols-12 gap-6 md:gap-8 items-start">
          <Reveal className="col-span-12 md:col-span-5">
            <div className="font-mono text-[11px] mb-6" style={{ color: 'var(--accent)' }}>
              ● live · synek.app
            </div>
            <h2
              className="font-display font-light text-[64px] md:text-[88px] leading-[0.95] mb-6"
              style={{ color: 'var(--ink)' }}
            >
              SYNEK
            </h2>
            <p
              className="text-[17px] leading-[1.55] mb-8 max-w-[44ch]"
              style={{ color: 'var(--muted)' }}
            >
              <span style={{ color: 'var(--ink)' }}>A side project for coaches and athletes</span>{' '}
              — replacing spreadsheets and manual Strava copy-paste with a single, opinionated
              workspace.
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {['Next.js', 'Supabase', 'Vercel', 'Claude Code'].map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>

            <div
              className="flex flex-col gap-3 font-mono text-[12px] mb-8"
              style={{ color: 'var(--muted)' }}
            >
              <div className="flex justify-between">
                <span>founded</span>
                <span style={{ color: 'var(--ink)' }}>2024</span>
              </div>
              <div className="flex justify-between">
                <span>role</span>
                <span style={{ color: 'var(--ink)' }}>solo · design + build</span>
              </div>
              <div className="flex justify-between">
                <span>stage</span>
                <span style={{ color: 'var(--ink)' }}>private beta</span>
              </div>
            </div>

            <a href="https://synek.app" className="btn-bracket" target="_blank" rel="noreferrer">
              [ visit <span className="arrow">↗</span> ]
            </a>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-7" delay={120}>
            <div
              ref={visualRef}
              className="ph-rect aspect-[16/10] w-full relative will-change-transform"
            >
              <div
                className="absolute top-3 left-3 font-mono text-[10px]"
                style={{ color: 'var(--muted)' }}
              >
                synek_preview.png · 1600×1000
              </div>
              <div
                className="absolute bottom-3 right-3 font-mono text-[10px]"
                style={{ color: 'var(--accent)' }}
              >
                ⌘ + k · search
              </div>
              {/* Faux UI hint */}
              <div className="absolute inset-x-10 top-16 bottom-12 grid grid-cols-12 gap-3 opacity-40">
                <div className="col-span-3 border" style={{ borderColor: 'var(--border)' }} />
                <div className="col-span-9 grid grid-rows-6 gap-3">
                  <div className="row-span-2 border" style={{ borderColor: 'var(--border)' }} />
                  <div className="row-span-4 border" style={{ borderColor: 'var(--border)' }} />
                </div>
              </div>
            </div>
            <div
              className="mt-3 flex justify-between font-mono text-[11px]"
              style={{ color: 'var(--muted)' }}
            >
              <span>fig.01 — workspace shell</span>
              <span>parallax · 8px</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Write components/landing/CaseCards.tsx**

```tsx
import Link from 'next/link'
import { Reveal } from '../Reveal'
import { SectionHead } from '../SectionHead'

const CARDS = [
  {
    num: '01',
    title: '0 to ~85% AI-assisted\ndelivery adoption',
    meta: '2025 · betting · eng lead',
    summary:
      'Took a 9-person engineering team from zero baseline to ~85% measured AI adoption in two quarters.',
    active: true,
    href: '/case/ai-adoption',
  },
  {
    num: '02',
    title: '120+ stale flags deleted\nin days, not weeks',
    meta: '2024 · platform · eng lead',
    summary:
      'Built a feature-flag audit pipeline. Cleared a 4-year backlog of dead toggles in under a week.',
    active: false,
    href: '#',
  },
  {
    num: '03',
    title: 'Shared Codex workflows\nfor a 9-person team',
    meta: '2025 · tooling · eng lead',
    summary:
      "Codified prompts, review patterns, and CLI scaffolds so every engineer started Monday from the same baseline.",
    active: false,
    href: '#',
  },
]

export function CaseCards() {
  return (
    <section
      id="case-studies"
      className="py-[96px] md:py-[160px] border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <Reveal>
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <SectionHead ord="02" label="case studies" />
            <span className="font-mono text-[11px]" style={{ color: 'var(--muted)' }}>
              03 entries · 1 published
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-12 gap-6">
          {CARDS.map((c, i) => (
            <Reveal key={c.num} className="col-span-12 md:col-span-4" delay={i * 80}>
              {c.active ? (
                <Link
                  href={c.href}
                  className="case-card active block h-full p-6 md:p-7"
                  style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
                >
                  <CardInner card={c} />
                </Link>
              ) : (
                <div
                  className="case-card block h-full p-6 md:p-7 cursor-not-allowed"
                  style={{
                    border: '1px solid var(--border)',
                    background: 'var(--surface)',
                    opacity: 0.55,
                  }}
                  aria-disabled
                >
                  <CardInner card={c} />
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CardInner({ card }: { card: (typeof CARDS)[number] }) {
  return (
    <>
      <div className="flex items-start justify-between mb-10">
        <div
          className="font-display font-light text-[64px] leading-none"
          style={{ color: 'var(--accent)' }}
        >
          {card.num}
        </div>
        <div className="font-mono text-[10px] mt-2" style={{ color: 'var(--muted)' }}>
          {card.active ? '● published' : '○ coming soon'}
        </div>
      </div>
      <h3
        className="font-display font-light text-[26px] leading-[1.08] mb-4 whitespace-pre-line"
        style={{ color: 'var(--ink)' }}
      >
        {card.title}
      </h3>
      <p className="text-[14px] leading-[1.55] mb-8" style={{ color: 'var(--muted)' }}>
        {card.summary}
      </p>
      <div
        className="font-mono text-[11px] mb-8 pt-4"
        style={{ color: 'var(--muted)', borderTop: '1px solid var(--border)' }}
      >
        {card.meta}
      </div>
      <div
        className="font-mono text-[12px] inline-flex flex-col gap-1"
        style={{ color: card.active ? 'var(--ink)' : 'var(--muted)' }}
      >
        <span>{card.active ? '[ read → ]' : '[ coming soon ]'}</span>
        <span className="read-underline" />
      </div>
    </>
  )
}
```

- [ ] **Step 4: Write components/landing/PositioningStrip.tsx**

```tsx
import { Reveal } from '../Reveal'
import { SectionHead } from '../SectionHead'

export function PositioningStrip() {
  return (
    <section
      className="py-[96px] md:py-[160px] border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <Reveal>
          <SectionHead ord="03" label="positioning" className="mb-12 md:mb-16" />
        </Reveal>
        <div className="grid grid-cols-12 gap-6">
          <Reveal className="col-span-12 md:col-span-8 md:col-start-3">
            <p
              className="font-display font-light pull leading-[1.08] tracking-[-0.025em]"
              style={{ fontSize: 'clamp(28px, 4.4vw, 56px)', color: 'var(--ink)' }}
            >
              Ten-plus years across software, product, and operations in{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
                regulated, high-traffic betting
              </em>
              . Hands-on with AI-assisted delivery, internal tooling, automation, and workflow
              design.
            </p>
            <p className="mt-10 font-mono text-[13px]" style={{ color: 'var(--muted)' }}>
              ↳ building over advising · prototypes over decks
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Write app/page.tsx**

```tsx
import { TopBar } from '@/components/TopBar'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Crosshair } from '@/components/Crosshair'
import { Hero } from '@/components/landing/Hero'
import { SynekSection } from '@/components/landing/SynekSection'
import { CaseCards } from '@/components/landing/CaseCards'
import { PositioningStrip } from '@/components/landing/PositioningStrip'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Crosshair />
      <TopBar />
      <main>
        <Hero />
        <SynekSection />
        <CaseCards />
        <PositioningStrip />
        <Footer />
      </main>
    </>
  )
}
```

- [ ] **Step 6: Visual check — landing page**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:
- [ ] Terminal typewriter fires on load, settles, headline fades in
- [ ] Theme toggle works, `html.dark` class toggled, colors switch
- [ ] Scroll progress line tracks correctly
- [ ] Crosshair follows mouse on desktop
- [ ] Reveal animations trigger as sections scroll into view
- [ ] SYNEK section parallax works
- [ ] 3 case cards render; card 01 is clickable, 02+03 faded + disabled
- [ ] Footer cursor blink works

- [ ] **Step 7: Commit**

```bash
git add app/page.tsx components/landing/
git commit -m "feat: implement landing page (Hero, SYNEK, CaseCards, PositioningStrip)"
```

---

## Task 6: Mobile QA — landing page

**Files:** None (QA + CSS fixes only)

- [ ] **Step 1: Test 375px (iPhone SE)**

Open DevTools → Device toolbar → iPhone SE (375×667).

Check:
- [ ] Terminal readable, no horizontal overflow
- [ ] Headline `clamp(44px, 8vw, 132px)` looks right at 375px (~44px)
- [ ] CTAs stack cleanly, min-height 48px
- [ ] SYNEK section: metadata col stacks above visual
- [ ] SYNEK visual placeholder renders full-width
- [ ] Case cards: 1 per row, full-width
- [ ] Footer: columns stack, text readable
- [ ] Theme toggle: 48px+ touch target, both buttons reachable thumb zone
- [ ] Crosshair hidden (coarse pointer CSS)

- [ ] **Step 2: Test 414px (iPhone 14 Pro Max)**

Same checks. Confirm no regression vs 375.

- [ ] **Step 3: Test 768px (iPad)**

Verify grid transitions to `md:` breakpoints. SYNEK split visible. Case cards in 2 or 3 col.

- [ ] **Step 4: Test 1280px+ (desktop)**

Full layout, crosshair visible.

- [ ] **Step 5: Fix any issues found**

Common fixes:
- Horizontal overflow: add `overflow-x: hidden` to `body` if needed
- Touch target too small: increase `min-height` or `padding`
- Font too large on mobile: tighten `clamp()` min value

- [ ] **Step 6: Commit fixes**

```bash
git add -A
git commit -m "fix: mobile responsive adjustments from QA pass"
```

---

## Task 7: MDX pipeline + case study route

**Files:**
- Create: `content/case-studies/ai-adoption.mdx`
- Create: `app/case/[slug]/page.tsx`
- Create: `components/case/Crumb.tsx`
- Create: `components/case/Pull.tsx`
- Create: `components/case/OutcomeGrid.tsx`
- Create: `components/case/Stat.tsx`
- Create: `components/case/ApproachStep.tsx`
- Create: `components/case/Lessons.tsx`
- Create: `components/case/PrevNext.tsx`
- Modify: `mdx-components.tsx`

- [ ] **Step 1: Create content directory**

```bash
mkdir -p content/case-studies
```

- [ ] **Step 2: Write components/case/Crumb.tsx**

```tsx
interface CrumbProps {
  slug: string
  meta: string
}

export function Crumb({ slug, meta }: CrumbProps) {
  return (
    <div
      className="sticky top-14 z-30 crumb-blur"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div
        className="max-w-[1280px] mx-auto px-6 md:px-8 h-10 flex items-center justify-between font-mono text-[12px]"
        style={{ color: 'var(--muted)' }}
      >
        <span>
          <span style={{ color: 'var(--ink)' }}>$</span> cd ~/case-studies/{slug}
        </span>
        <span className="hidden md:inline">{meta}</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Write components/case/Pull.tsx**

```tsx
export function Pull({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="pull max-w-[22ch]"
      style={{ fontSize: 'clamp(36px, 5.6vw, 84px)', color: 'var(--ink)' }}
    >
      {children}
    </p>
  )
}
```

- [ ] **Step 4: Write components/case/Stat.tsx**

```tsx
import { CountUp } from '../CountUp'

interface StatProps {
  from?: number
  to: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
}

export function Stat({ from, to, suffix = '', prefix = '', label, duration = 1400 }: StatProps) {
  return (
    <div className="col-span-12 md:col-span-4">
      <div className="num-callout" style={{ fontSize: 'clamp(72px, 10vw, 144px)' }}>
        {from !== undefined && (
          <>
            <CountUp to={from} duration={400} />
            {' → ~'}
          </>
        )}
        <CountUp to={to} suffix={suffix} prefix={prefix} duration={duration} />
      </div>
      <div className="mt-6 font-mono text-[12px]" style={{ color: 'var(--muted)' }}>
        {label}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Write components/case/OutcomeGrid.tsx**

```tsx
export function OutcomeGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 gap-8 md:gap-6">
      {children}
    </div>
  )
}
```

- [ ] **Step 6: Write components/case/ApproachStep.tsx**

```tsx
interface ApproachStepProps {
  n: string
  title: string
  description: string
}

export function ApproachStep({ n, title, description }: ApproachStepProps) {
  return (
    <div className="grid grid-cols-12 gap-4 py-6" style={{ borderTop: '1px solid var(--border)' }}>
      <div
        className="col-span-2 md:col-span-1 font-mono text-[12px] pt-1"
        style={{ color: 'var(--accent)' }}
      >
        {n}
      </div>
      <div className="col-span-10 md:col-span-11">
        <h3
          className="font-display font-light text-[24px] md:text-[28px] leading-[1.15] mb-2"
          style={{ color: 'var(--ink)' }}
        >
          {title}
        </h3>
        <p className="text-[15px] leading-[1.6]" style={{ color: 'var(--muted)' }}>
          {description}
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Write components/case/Lessons.tsx**

```tsx
interface Lesson {
  bold: string
  text: string
}

export function Lessons({ items }: { items: Lesson[] }) {
  return (
    <ul className="space-y-5 text-[15px] leading-[1.65]" style={{ color: 'var(--muted)' }}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-4">
          <span className="font-mono text-[11px] pt-1.5" style={{ color: 'var(--accent)' }}>
            —
          </span>
          <span>
            <span style={{ color: 'var(--ink)' }}>{item.bold}</span> {item.text}
          </span>
        </li>
      ))}
    </ul>
  )
}
```

- [ ] **Step 8: Write components/case/PrevNext.tsx**

```tsx
import Link from 'next/link'

interface PrevNextItem {
  num: string
  title: string
  href?: string
}

interface PrevNextProps {
  prev?: PrevNextItem
  next?: PrevNextItem
}

export function PrevNext({ prev, next }: PrevNextProps) {
  return (
    <section className="py-16 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-12 gap-6">
          <div className={`col-span-12 md:col-span-4 ${prev ? 'opacity-40' : 'invisible'}`}>
            {prev && (
              <>
                <div className="ord mb-2">prev · {prev.num}</div>
                <div
                  className="font-display text-[22px] leading-[1.15]"
                  style={{ color: 'var(--ink)' }}
                >
                  {prev.title}
                </div>
                <div className="font-mono text-[11px] mt-2" style={{ color: 'var(--muted)' }}>
                  [ coming soon ]
                </div>
              </>
            )}
          </div>

          <div className="col-span-12 md:col-span-4 flex items-center justify-center">
            <Link href="/" className="btn-bracket">
              [ ← return to index ]
            </Link>
          </div>

          <div className={`col-span-12 md:col-span-4 md:text-right ${next ? 'opacity-40' : 'invisible'}`}>
            {next && (
              <>
                <div className="ord mb-2">next · {next.num}</div>
                <div
                  className="font-display text-[22px] leading-[1.15]"
                  style={{ color: 'var(--ink)' }}
                >
                  {next.title}
                </div>
                <div className="font-mono text-[11px] mt-2" style={{ color: 'var(--muted)' }}>
                  [ coming soon ]
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 9: Write app/case/[slug]/page.tsx**

```tsx
import { notFound } from 'next/navigation'
import { TopBar } from '@/components/TopBar'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Crosshair } from '@/components/Crosshair'
import { Reveal } from '@/components/Reveal'
import { SectionHead } from '@/components/SectionHead'
import { Footer } from '@/components/Footer'
import { Crumb } from '@/components/case/Crumb'
import { Pull } from '@/components/case/Pull'
import { OutcomeGrid } from '@/components/case/OutcomeGrid'
import { Stat } from '@/components/case/Stat'
import { ApproachStep } from '@/components/case/ApproachStep'
import { Lessons } from '@/components/case/Lessons'
import { PrevNext } from '@/components/case/PrevNext'

const CASES: Record<string, React.ComponentType> = {
  'ai-adoption': () => <AiAdoptionCase />,
}

export async function generateStaticParams() {
  return Object.keys(CASES).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const titles: Record<string, string> = {
    'ai-adoption': '0 to ~85% AI-assisted delivery adoption — Artur Cempura',
  }
  return {
    title: titles[slug] ?? 'Case Study — Artur Cempura',
  }
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const CaseComponent = CASES[slug]
  if (!CaseComponent) notFound()

  return (
    <>
      <ScrollProgress />
      <Crosshair />
      <TopBar showBack />
      <Crumb slug={slug} meta="case 01 · 2025 · evoke plc" />
      <main>
        <CaseComponent />
      </main>
    </>
  )
}

function AiAdoptionCase() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 md:pt-24 pb-[96px] md:pb-[160px]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-2">
              <div
                className="font-display font-light text-[80px] leading-none"
                style={{ color: 'var(--accent)' }}
              >
                01
              </div>
            </div>
            <div className="col-span-12 md:col-span-10">
              <div
                className="font-mono text-[12px] mb-6 flex flex-wrap gap-x-4 gap-y-1"
                style={{ color: 'var(--muted)' }}
              >
                <span>2025</span><span>·</span>
                <span>evoke plc</span><span>·</span>
                <span>engineering lead</span><span>·</span>
                <span>9-person team</span><span>·</span>
                <span>typescript / react</span>
              </div>
              <h1
                className="font-display font-light leading-[0.95] tracking-[-0.035em]"
                style={{ fontSize: 'clamp(44px, 7vw, 112px)', color: 'var(--ink)' }}
              >
                0 to ~85%<br />AI-assisted<br />delivery adoption.
              </h1>
              <p
                className="mt-10 max-w-[60ch] text-[17px] md:text-[19px] leading-[1.55]"
                style={{ color: 'var(--muted)' }}
              >
                Two quarters. Nine engineers. One internal dashboard that turned a vibe into a baseline — and a baseline into a habit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-[96px] md:py-[160px] border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <Reveal><SectionHead ord="01" label="problem" className="mb-12" /></Reveal>
          <Reveal>
            <Pull>
              Jira and GitLab couldn't show <span style={{ color: 'var(--accent)' }}>AI usage.</span> The team had no shared baseline.
            </Pull>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-16 grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-6 md:col-start-7">
                <p className="text-[16px] leading-[1.7]" style={{ color: 'var(--muted)' }}>
                  Anecdotes everywhere.{' '}
                  <span style={{ color: 'var(--ink)' }}>
                    Some engineers had Copilot pinned, others wouldn't touch it.
                  </span>{' '}
                  Leadership wanted a number. The team wanted to be left alone. Neither group had what they needed: a shared, honest picture of where AI was actually moving the work.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Approach */}
      <section className="py-[96px] md:py-[160px] border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <Reveal><SectionHead ord="02" label="approach" className="mb-12" /></Reveal>
          <div className="grid grid-cols-12 gap-6">
            <Reveal className="col-span-12 md:col-span-4">
              <h2
                className="font-display font-light leading-[1] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(32px, 4.2vw, 56px)', color: 'var(--ink)' }}
              >
                Build the dashboard nobody asked for.
              </h2>
            </Reveal>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              {[
                { n: '01', t: 'Internal dashboard, two weeks.', d: 'Stitched GitLab, Jira, and IDE telemetry into a single team view. Owned the schema; owned the read path.' },
                { n: '02', t: 'DORA + AI-usage metrics, side-by-side.', d: "Lead time, deploy frequency, and AI-assist rate on the same chart — so quality and speed couldn't be argued in isolation." },
                { n: '03', t: 'Surfaced gaps weekly, not quarterly.', d: 'A 10-minute Friday review. Names off, patterns on. Trends visible before they became culture.' },
                { n: '04', t: 'Shared prompts, not policies.', d: 'A small library of prompts and review checklists, versioned in the repo. Suggestions, not mandates.' },
              ].map((s) => (
                <Reveal key={s.n}>
                  <ApproachStep n={s.n} title={s.t} description={s.d} />
                </Reveal>
              ))}
              <div className="py-6" style={{ borderTop: '1px solid var(--border)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="py-[96px] md:py-[160px] border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <Reveal><SectionHead ord="03" label="outcome" className="mb-12 md:mb-16" /></Reveal>
          <OutcomeGrid>
            <Reveal className="col-span-12 md:col-span-4" delay={0}>
              <Stat from={0} to={85} suffix="%" label="measured AI-assisted delivery" duration={1600} />
            </Reveal>
            <Reveal className="col-span-12 md:col-span-4" delay={120}>
              <Stat to={9} label="engineers, fully aligned" duration={1000} />
            </Reveal>
            <Reveal className="col-span-12 md:col-span-4" delay={240}>
              <Stat to={0} suffix="%" label="attrition during rollout" duration={1000} />
            </Reveal>
          </OutcomeGrid>
          <Reveal delay={300}>
            <p className="mt-20 max-w-[58ch] text-[17px] leading-[1.6]" style={{ color: 'var(--muted)' }}>
              <span style={{ color: 'var(--ink)' }}>
                The dashboard didn't change the team — the conversation it forced did.
              </span>{' '}
              Once the number was visible, debate moved from "should we" to "where next." Adoption stopped being a top-down ask and became a peer signal.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What I'd do differently */}
      <section className="py-[96px] md:py-[160px] border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <Reveal><SectionHead ord="04" label="what i'd do differently" className="mb-10" /></Reveal>
          <div className="grid grid-cols-12 gap-6">
            <Reveal className="col-span-12 md:col-span-7">
              <Lessons items={[
                { bold: "Ship the metric before the dashboard.", text: "A spreadsheet for two weeks would've validated the signal faster than a polished UI." },
                { bold: "Define \"AI-assisted\" earlier.", text: "The first month was spent re-litigating what counted. A loose, public definition would've moved faster than a perfect one." },
                { bold: "Bring product in from week one.", text: "Engineering moved first. By the time PM noticed the velocity shift, scope had already absorbed the gain." },
              ]} />
            </Reveal>
          </div>
        </div>
      </section>

      <PrevNext
        prev={{ num: '02', title: 'Stale flag cleanup' }}
        next={{ num: '03', title: 'Shared Codex workflows' }}
      />
      <Footer />
    </>
  )
}
```

- [ ] **Step 10: Visual check — case study page**

```bash
npm run dev
```

Open `http://localhost:3000/case/ai-adoption`. Verify:
- [ ] Sticky crumb visible below TopBar
- [ ] Massive headline renders in Fraunces
- [ ] Problem pull-quote large and gold-accented
- [ ] Approach steps reveal on scroll
- [ ] Outcome numbers count up on scroll-enter
- [ ] Lessons list with gold dash prefix
- [ ] PrevNext footer shows 02 + 03 as disabled
- [ ] Back link in TopBar navigates home
- [ ] Mobile: all sections stack cleanly at 375px

- [ ] **Step 11: Commit**

```bash
git add app/case/ components/case/ content/
git commit -m "feat: add case study route and AI adoption case (Task 01)"
```

---

## Task 8: Favicon + OG image

**Files:**
- Create: `app/icon.tsx`
- Create: `app/apple-icon.tsx`
- Create: `app/opengraph-image.tsx`

- [ ] **Step 1: Write app/icon.tsx**

```tsx
import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#151413',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28">
          <path d="M5 6 L2 14 L5 22" stroke="#f7f5f2" strokeWidth="1.5" fill="none" strokeLinecap="square" />
          <path d="M23 6 L26 14 L23 22" stroke="#f7f5f2" strokeWidth="1.5" fill="none" strokeLinecap="square" />
          <text x="14" y="18" textAnchor="middle" fontSize="11" fontWeight="500" fill="#f7f5f2">ac</text>
        </svg>
      </div>
    ),
    { ...size }
  )
}
```

- [ ] **Step 2: Write app/apple-icon.tsx**

```tsx
import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#151413',
          borderRadius: 36,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 28 28">
          <path d="M5 6 L2 14 L5 22" stroke="#f7f5f2" strokeWidth="1.5" fill="none" strokeLinecap="square" />
          <path d="M23 6 L26 14 L23 22" stroke="#f7f5f2" strokeWidth="1.5" fill="none" strokeLinecap="square" />
          <text x="14" y="18" textAnchor="middle" fontSize="11" fontWeight="500" fill="#f7f5f2">ac</text>
        </svg>
      </div>
    ),
    { ...size }
  )
}
```

- [ ] **Step 3: Write app/opengraph-image.tsx**

```tsx
import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#151413',
          padding: '80px',
          fontFamily: 'serif',
        }}
      >
        <div style={{ color: '#7a756d', fontSize: 16, fontFamily: 'monospace' }}>cempura.it</div>
        <div>
          <div style={{ color: '#c9a87c', fontSize: 18, fontFamily: 'monospace', marginBottom: 32 }}>
            engineering lead · ai enablement
          </div>
          <div
            style={{
              color: '#f7f5f2',
              fontSize: 72,
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
            }}
          >
            Building the systems that make engineering teams faster.
          </div>
        </div>
        <div style={{ color: '#7a756d', fontSize: 14, fontFamily: 'monospace' }}>
          krakow / poland · artur cempura
        </div>
      </div>
    ),
    { ...size }
  )
}
```

- [ ] **Step 4: Write app/sitemap.ts**

```ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://cempura.it',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://cempura.it/case/ai-adoption',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
```

- [ ] **Step 5: Write app/robots.ts**

```ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://cempura.it/sitemap.xml',
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add app/icon.tsx app/apple-icon.tsx app/opengraph-image.tsx app/sitemap.ts app/robots.ts
git commit -m "feat: favicon, apple-icon, OG image, sitemap, robots"
```

---

## Task 9: Type-check + build verification

**Files:** None (verification only)

- [ ] **Step 1: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: zero errors. Fix any type errors before continuing.

- [ ] **Step 2: Lint**

```bash
npm run lint
```

Expected: zero errors/warnings. Fix any ESLint issues.

- [ ] **Step 3: Production build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`. All routes statically generated. No build errors.

- [ ] **Step 4: Preview production build**

```bash
npm run start
```

Open `http://localhost:3000`. Verify:
- [ ] Landing page loads correctly
- [ ] `/case/ai-adoption` loads correctly
- [ ] Theme toggle works
- [ ] No flash of incorrect theme on load (next-themes handles this via `suppressHydrationWarning`)
- [ ] Both pages mobile-responsive at 375px

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: all types pass, build verified"
```

---

## Task 10: Cleanup

**Files:**
- Delete: `.handoff-tmp/`
- Update: `CLAUDE.md`
- Update: `PORTFOLIO_PLAN.md`

- [ ] **Step 1: Remove handoff temp dir**

```bash
rm -rf .handoff-tmp
```

- [ ] **Step 2: Update CLAUDE.md**

Replace stack section with:
```markdown
**Stack:** React 19, TypeScript, Next.js 15, Tailwind CSS 4, Framer Motion, next-themes, @next/mdx

**Routing:** App Router. `/` landing, `/case/[slug]` dynamic (statically generated).

**Content:** Case studies in `content/case-studies/*.mdx`.

**Deployment:** Vercel. Automatic deploys on push to `main`.
```

- [ ] **Step 3: Update PORTFOLIO_PLAN.md stack section**

Change:
```markdown
- **Stack:** Vite + React (current setup) OR migrate to Next.js + Vercel for SSG + better SEO
```
To:
```markdown
- **Stack:** Next.js 15 + App Router + Vercel (migrated 2026-04-28)
```

- [ ] **Step 4: Commit cleanup**

```bash
git add CLAUDE.md PORTFOLIO_PLAN.md
git commit -m "chore: update CLAUDE.md and PORTFOLIO_PLAN.md to reflect Next.js migration"
```

---

## Task 11: Deploy to Vercel

**Files:** None (Vercel CLI + DNS)

- [ ] **Step 1: Link to Vercel**

```bash
npx vercel link
```

Select or create project `cempura-it`. Follow prompts.

- [ ] **Step 2: Deploy to preview**

```bash
npx vercel
```

Expected: preview URL like `https://cempura-it-xxx.vercel.app`. Open and verify full site works on real device.

- [ ] **Step 3: Deploy to production**

```bash
npx vercel --prod
```

Expected: `cempura.it` updated. Verify at `https://cempura.it`:
- [ ] Landing page loads
- [ ] Case study loads at `/case/ai-adoption`
- [ ] Theme toggle persists across pages
- [ ] Mobile QA on real phone

- [ ] **Step 4: Verify analytics**

Open Vercel dashboard → Analytics tab. Confirm Web Analytics collecting. Confirm Speed Insights collecting. No cookie banner needed (cookie-less by default).

- [ ] **Step 5: Merge to main**

```bash
git checkout main
git merge redesign/v2 --no-ff -m "feat: Next.js 15 redesign — v2.0 launch"
git push origin main
```

---

## Self-Review

**Spec coverage:**
- [x] Next.js 15 App Router migration
- [x] Fraunces + Inter + JetBrains Mono via next/font
- [x] Light/dark theme with next-themes, no flash
- [x] Terminal hero with typewriter + settled headline
- [x] Crosshair tracker (desktop only, coarse pointer hidden)
- [x] Scroll progress line
- [x] Bracket SVG logo mark
- [x] SYNEK section with parallax placeholder
- [x] 3 case cards (1 active, 2 disabled)
- [x] Positioning strip
- [x] Footer with cursor blink
- [x] Case study 01 — full content
- [x] CountUp animated stats
- [x] Reveal scroll animations
- [x] Reduced-motion support throughout
- [x] Mobile QA pass (375, 414, 768, 1280)
- [x] GA removed
- [x] Vercel Analytics + Speed Insights
- [x] OG image, favicon, sitemap, robots
- [x] TypeScript strict, build verified
- [x] Vercel deploy

**No gaps found.**
