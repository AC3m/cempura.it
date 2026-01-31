# cempura.it

A premium, modern, mobile-first personal website — a **digital business card** built with React + Vite + TypeScript.

## Quick Start

\`\`\`bash

# Install dependencies

npm install

# Start development server

npm run dev

# Build for production

npm run build

# Preview production build

npm run preview
\`\`\`

## Deploy

### AWS S3 + CloudFront (GitHub Actions)

This project uses automated deployment to AWS S3 with CloudFront CDN via GitHub Actions.

#### Required GitHub Secrets

Add these secrets to your repository (Settings → Secrets and variables → Actions → Environments → PROD):

| Secret Name                  | Description                | How to get it                                    |
| ---------------------------- | -------------------------- | ------------------------------------------------ |
| `AWS_ACCESS_KEY_ID`          | IAM user access key        | AWS Console → IAM → Users → Security credentials |
| `AWS_SECRET_ACCESS_KEY`      | IAM secret key             | Created with access key (save immediately!)      |
| `AWS_REGION`                 | S3 bucket region           | e.g., `us-east-1`, `eu-west-1`                   |
| `S3_BUCKET`                  | S3 bucket name             | AWS Console → S3 → Your bucket name              |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID | AWS Console → CloudFront → Distribution ID       |

#### IAM Permissions Required

Your IAM user needs these policies:

- **S3**: `s3:PutObject`, `s3:GetObject`, `s3:DeleteObject`, `s3:ListBucket`
- **CloudFront**: `cloudfront:CreateInvalidation`, `cloudfront:GetInvalidation`

Or use AWS managed policies: `AmazonS3FullAccess` + `CloudFrontFullAccess` (less secure but simpler).

#### Deploy

Deployment is **manual** (on-demand):

1. Go to GitHub → Actions → "Deploy to S3"
2. Click "Run workflow"
3. Select branch (usually `main`)
4. Click "Run workflow"

The workflow will:

1. Build the project (`npm run build`)
2. Upload `dist/` to S3
3. Invalidate CloudFront cache

### Netlify (alternative)

```bash
npm run build
# Drag & drop the `dist` folder to netlify.com
# Or use Netlify CLI: netlify deploy --prod
```

### GitHub Pages

1. Add to `vite.config.ts`:
   ```ts
   export default defineConfig({
     base: '/repo-name/', // if not using custom domain
     // ...
   });
   ```
2. Build and push the `dist` folder to `gh-pages` branch

### Vercel

\`\`\`bash
npm i -g vercel
vercel --prod
\`\`\`

## Before Deploy Checklist

- [ ] Update LinkedIn URL in \`src/components/ContactCard.tsx\`
- [ ] Add CV file to \`public/\` and update link in \`src/components/Footer.tsx\`
- [ ] (Optional) Add analytics

---

## Design System

### Colors

| Token                | Value       | Usage                         |
| -------------------- | ----------- | ----------------------------- |
| \`background\`       | \`#0a0a0b\` | Page background               |
| \`surface\`          | \`#141416\` | Card backgrounds              |
| \`surface-elevated\` | \`#1c1c1f\` | Hover states, nested surfaces |
| \`border\`           | \`#27272a\` | Dividers, subtle borders      |
| \`text-primary\`     | \`#fafafa\` | Headings, important text      |
| \`text-secondary\`   | \`#a1a1aa\` | Body text                     |
| \`text-muted\`       | \`#71717a\` | Captions, labels              |
| \`accent\`           | \`#3b82f6\` | Primary accent (blue-500)     |
| \`accent-hover\`     | \`#60a5fa\` | Accent hover state (blue-400) |

### Typography Scale

Based on 16px root, using system font stack for optimal performance.

| Class         | Size | Line Height | Usage          |
| ------------- | ---- | ----------- | -------------- |
| \`text-xs\`   | 12px | 16px        | Tags, labels   |
| \`text-sm\`   | 14px | 20px        | Secondary text |
| \`text-base\` | 16px | 24px        | Body text      |
| \`text-lg\`   | 18px | 28px        | Large body     |
| \`text-xl\`   | 20px | 28px        | Section titles |
| \`text-2xl\`  | 24px | 32px        | Card titles    |
| \`text-3xl\`  | 30px | 36px        | Name (mobile)  |
| \`text-4xl\`  | 36px | 40px        | Name (desktop) |

**Heading style:** Tight leading (\`leading-tight\`), \`font-bold\`, \`tracking-tight\`  
**Body style:** Relaxed leading (\`leading-relaxed\`), normal weight

### Spacing

8px grid system. Key values:

| Token     | Value | Usage                      |
| --------- | ----- | -------------------------- |
| \`gap-2\` | 8px   | Tag gaps, tight spacing    |
| \`gap-3\` | 12px  | List items, button content |
| \`gap-4\` | 16px  | Card gaps (mobile)         |
| \`gap-5\` | 20px  | Card gaps (desktop)        |
| \`p-6\`   | 24px  | Card padding (mobile)      |
| \`p-8\`   | 32px  | Card padding (desktop)     |

### Border Radii

| Token              | Value | Usage                 |
| ------------------ | ----- | --------------------- |
| \`rounded-lg\`     | 8px   | Tags, small buttons   |
| \`rounded-xl\`     | 12px  | Buttons, nested cards |
| \`rounded-2xl\`    | 16px  | Avatar                |
| \`rounded-[20px]\` | 20px  | Main cards            |

### Shadows

\`\`\`css
--shadow-card: 0 0 0 1px rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.4);
--shadow-card-hover: 0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.5);
\`\`\`

Cards have a subtle inner border (1px white at 5% opacity) + soft drop shadow.

### Animation

- **Durations:** 150–350ms
- **Easing:** \`ease-out\` / \`[0.25, 0.46, 0.45, 0.94]\`
- **Types:**
  - Page load: Staggered fade-up (0.1s delay between cards)
  - Hover: Lift (\`y: -2px\`) + shadow intensify
  - Tap: Scale down (\`scale: 0.98\`)
  - Links: Arrow icon shifts on hover
- **Reduced motion:** All animations disabled via \`useReducedMotion()\`

### Component Structure

\`\`\`
src/
├── components/
│ ├── Card.tsx # Base card with shadow, radius, hover
│ ├── Header.tsx # Sticky header with logo
│ ├── HeroCard.tsx # Name, title, positioning
│ ├── ImpactCard.tsx # Value bullets
│ ├── StrengthsCard.tsx # 2x2 strengths grid
│ ├── TechCard.tsx # Tech tags
│ ├── ContactCard.tsx # Email + LinkedIn CTAs
│ └── Footer.tsx # Location + CV link
├── App.tsx # Layout + animation orchestration
├── main.tsx # Entry point
└── index.css # Tailwind + design tokens
\`\`\`

## Tech Stack

- **React 18** + **TypeScript** — Type-safe components
- **Vite** — Fast builds, HMR
- **Tailwind CSS v4** — Utility-first styling with custom theme
- **Framer Motion** — Smooth, accessible animations
- **Lucide React** — Clean, consistent icons

## Performance

- No heavy images (CSS/SVG only)
- System font stack (no font loading)
- Minimal JS bundle (~50kb gzipped)
- Lighthouse targets: Performance 90+, Accessibility 95+

## Browser Support

- Chrome, Firefox, Safari, Edge (latest 2 versions)
- iOS Safari, Chrome Mobile
- Graceful degradation for reduced motion preferences
