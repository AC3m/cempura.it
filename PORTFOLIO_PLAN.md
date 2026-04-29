# Portfolio Plan — cempura.it

Pivot: **digital card → portfolio** for senior AI Enablement / Engineering Leadership role.

Current state: digital card (links only). Removed from CV header until portfolio is live. Re-add to CV once at least 1–2 case studies are published.

## Goal

Show *visible thinking* — what LinkedIn and GitHub don't show. Senior AI-enablement roles hire on demonstrated judgment, not just metrics. A portfolio with case studies shows how you reason about adoption, tooling, and team impact.

## Sections (build order)

### 1. Landing
- 2-line bio
- Photo optional
- One-liner: "Engineering leader. AI enablement, internal tooling, team scaling."
- Direct links to: SYNEK · case studies · contact

### 2. SYNEK (live project)
- Live link
- 1 paragraph: what it is, who it's for, why it exists
- Stack: Next.js, Supabase, Vercel, AI-first workflow
- Status: live, [N] users / [N] coaches / [N] athletes
- "Built solo end-to-end with Claude Code + Codex" — names the AI angle

### 3. AI Enablement Case Studies (2–3 cards)
Each card: problem → approach → outcome → what I'd do differently.

**Case 1 — "0 to ~85% AI adoption in [N] months"**
- Problem: Jira/GitLab couldn't show AI usage; team had no shared baseline
- Approach: built internal dashboard, added DORA + AI-usage metrics, surfaced gaps weekly
- Outcome: adoption 0 → ~85%, team-wide visibility
- Lesson: measurement made the cultural shift possible

**Case 2 — "120 stale flags deleted in days, not weeks"**
- Problem: legacy feature-flag platform sunset, hard deadline, 8 projects
- Approach: AI agents to audit, propose deletions, generate PRs; manual review at the end
- Outcome: 120+ flags removed; replaced vendor with internal TS/React SDK
- Lesson: AI-leveraged refactors work when the rules are encodable

**Case 3 — "Shared Codex workflows for a 9-person team"**
- Problem: AI output varied wildly per engineer; quality depended on individual prompt skill
- Approach: shared repos with context, standards, and prompts wired into IDE + PR flow
- Outcome: consistent AI output across team, less time spent on prompt re-discovery
- Lesson: codify the prompt, not the prompter

### 4. Now (what I'm working on)
- 3–5 lines, dated, updated monthly
- Pattern: "Currently: [project]. Reading: [book]. Thinking about: [topic]."
- Signals you're alive and curious. Hiring managers read this.

### 5. Contact
- Email + LinkedIn
- Skip phone (already on CV)

## Tech / build approach

- **Stack:** Vite + React (current setup) OR migrate to Next.js + Vercel for SSG + better SEO
- **Content:** markdown-driven (MDX). Each case study = one `.mdx` file in `content/case-studies/`
- **Hosting:** Vercel (already in toolset)
- **Effort:** weekend MVP. Landing + SYNEK card + 1 case study. Add others incrementally.

Recommendation: stay on Vite for now (already working), add `@mdx-js/rollup` for case study rendering. Don't rewrite to Next.js unless SEO becomes a priority.

## Visual / design rules

- Dark mode optional, light mode default for skim-ability
- Mono font for code, sans for body (Inter / Geist)
- One accent colour, used sparingly
- Case study cards: title, 1-line summary, "Read →" link
- No animations on hover beyond subtle colour shift
- Mobile-first — recruiters open links on phones

## When to re-add to CV

Re-add `cempura.it` to CV header once:
- Landing page exists with bio + photo + clear positioning
- SYNEK card is live
- At least **1 full case study** is published

Don't link to a half-built portfolio. Empty/placeholder pages hurt more than no link.

## Maintenance cadence

- Update "Now" section monthly
- Add 1 case study per quarter minimum
- Refresh bio + positioning when role/title changes

---

*Created 2026-04-28 from CV review session. Source: `/Users/acempura/Code/Side/CV/CV_Review_2026-04-28.md`.*
