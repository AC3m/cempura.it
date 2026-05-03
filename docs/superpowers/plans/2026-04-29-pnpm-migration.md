# pnpm Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace npm with pnpm as the package manager, updating lockfile, scripts, husky hooks, and Vercel build config.

**Architecture:** Delete `package-lock.json`, generate `pnpm-lock.yaml`, add `packageManager` field to `package.json` to enforce pnpm, update husky hooks to use `pnpm dlx` instead of `npx`, add `.npmrc` with `shamefully-hoist=false` (pnpm default — explicit is better), pin Vercel to use pnpm via `ENABLE_EXPERIMENTAL_COREPACK=1` env var + `packageManager` field. No dependency changes — pure tooling swap.

**Tech Stack:** pnpm 10.33.0, Node.js 20, Next.js 15, Vercel (auto-deploy on push to main)

---

### Task 1: Switch lockfile

**Files:**
- Delete: `package-lock.json`
- Create: `pnpm-lock.yaml` (generated)
- Modify: `package.json` — add `packageManager` field
- Create: `.npmrc`

- [ ] **Step 1: Delete npm lockfile**

```bash
rm package-lock.json
```

- [ ] **Step 2: Add `packageManager` field to `package.json`**

Open `package.json`. Add after `"version": "1.0.0"`:

```json
"packageManager": "pnpm@10.33.0",
```

Full top of file after change:
```json
{
  "name": "cempura.it",
  "private": true,
  "version": "1.0.0",
  "packageManager": "pnpm@10.33.0",
  "type": "module",
```

- [ ] **Step 3: Create `.npmrc`**

Create file `.npmrc` at project root with:

```ini
shamefully-hoist=false
```

This is pnpm's default but makes it explicit — prevents accidental reliance on hoisted packages.

- [ ] **Step 4: Install with pnpm to generate lockfile**

```bash
pnpm install
```

Expected: creates `pnpm-lock.yaml`, `node_modules/` rebuilt. No errors.

- [ ] **Step 5: Verify dev server starts**

```bash
pnpm dev
```

Expected: Next.js dev server at `http://localhost:3000`. No module resolution errors. Kill with Ctrl+C.

- [ ] **Step 6: Verify lint passes**

```bash
pnpm lint
```

Expected: ESLint exits 0, no errors or warnings.

- [ ] **Step 7: Verify build passes**

```bash
pnpm build
```

Expected: TypeScript check passes, 10 routes generated, no errors.

- [ ] **Step 8: Verify husky was re-initialised by prepare script**

`pnpm install` runs the `prepare` lifecycle script automatically, which calls `husky`. Confirm hooks directory is intact:

```bash
ls -la .husky/
```

Expected: `pre-commit` and `commit-msg` files present (may still contain old `npx` content — that gets fixed in Task 2).

- [ ] **Step 9: Verify release-it works with pnpm**

```bash
pnpm run release:dry
```

Expected: release-it prints a dry-run summary (next version, changelog preview). Exits 0. No "command not found" or npm-specific errors. Press Ctrl+C or answer `n` if prompted.

- [ ] **Step 10: Commit**

```bash
git add package.json pnpm-lock.yaml .npmrc
git rm package-lock.json
git commit -m "chore: migrate from npm to pnpm"
```

(Steps 5–9 are validation only — no files changed, nothing to stage.)

---

### Task 2: Update husky hooks

**Files:**
- Modify: `.husky/pre-commit`
- Modify: `.husky/commit-msg`

Husky hooks currently use `npx`. With pnpm, use `pnpm dlx` (equivalent of `npx` for pnpm) — or just keep `npx` since it still works. However, the `prepare` script runs `husky` — pnpm runs lifecycle scripts the same way, so `prepare` works unchanged. The hooks themselves use `npx --no` which works but it's inconsistent. Update to `pnpm exec` for local binaries (commitlint, tsc) — no network fetch needed since they're in devDependencies.

- [ ] **Step 1: Update `.husky/pre-commit`**

Current content: `npx tsc --noEmit`

Replace with:

```sh
pnpm exec tsc --noEmit
```

Full file:
```sh
pnpm exec tsc --noEmit
```

- [ ] **Step 2: Update `.husky/commit-msg`**

Current content: `npx --no -- commitlint --edit "$1"`

Replace with:

```sh
pnpm exec commitlint --edit "$1"
```

Full file:
```sh
pnpm exec commitlint --edit "$1"
```

- [ ] **Step 3: Verify hooks work — test pre-commit**

```bash
git stash
git stash pop
pnpm exec tsc --noEmit
```

Expected: exits 0, no TypeScript errors.

- [ ] **Step 4: Verify hooks work — test commitlint**

```bash
echo "bad commit message" | pnpm exec commitlint
```

Expected: exits non-zero, prints error about conventional commits format.

```bash
echo "fix: test commitlint" | pnpm exec commitlint
```

Expected: exits 0.

- [ ] **Step 5: Commit**

```bash
git add .husky/pre-commit .husky/commit-msg
git commit -m "chore: update husky hooks to use pnpm exec"
```

---

### Task 3: Configure Vercel for pnpm

**Files:**
- Modify: `vercel.json`

Vercel detects the package manager from `packageManager` field in `package.json` (set in Task 1). To ensure Vercel uses pnpm and doesn't fall back to npm, also set `ENABLE_EXPERIMENTAL_COREPACK=1` env var in the Vercel project (enables corepack which reads `packageManager` field). The `vercel.json` itself needs no install command override — Vercel auto-detects pnpm when `pnpm-lock.yaml` is present.

- [ ] **Step 1: Verify `vercel.json` needs no change**

Current `vercel.json`:
```json
{
  "framework": "nextjs"
}
```

Vercel detects pnpm automatically from `pnpm-lock.yaml` presence. No `installCommand` override needed. Confirm by checking Vercel docs behavior: if `pnpm-lock.yaml` exists at root, Vercel uses `pnpm install`.

- [ ] **Step 2: Add `ENABLE_EXPERIMENTAL_COREPACK=1` to Vercel project**

This must be set in Vercel dashboard (not in `vercel.json` — it's a build environment variable):

1. Go to Vercel project → Settings → Environment Variables
2. Add: `ENABLE_EXPERIMENTAL_COREPACK` = `1`, environment: Production + Preview + Development
3. Save

This tells Vercel's build system to use corepack, which reads `"packageManager": "pnpm@10.33.0"` from `package.json` and installs the exact version.

- [ ] **Step 3: Confirm PR check passes on push**

Push the branch and verify the Vercel preview build:
- Uses pnpm (check build logs: should show `pnpm install` not `npm install`)
- Build completes successfully
- No "dist not found" or module resolution errors

---

## Self-Review

**Spec coverage:** Migration requires (1) lockfile swap ✅ Task 1, (2) hook updates ✅ Task 2, (3) Vercel CI alignment ✅ Task 3. All covered.

**Placeholder scan:** No TBDs. All commands are exact. All file contents are complete.

**Type consistency:** No types — pure config/tooling. N/A.
