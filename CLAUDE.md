# ADS OF STUPID — HOUSE RULES

## SOURCE OF TRUTH
- `ads-of-stupid-homepage-content.md` is the single source of truth for all copy, section order, layouts, animations, and SEO. Never invent copy. If something's missing, flag it.

## STACK
- Match the existing repo's framework (React + Tailwind expected).
- GSAP + ScrollTrigger for the two scroll-pinned cinematic sections (Problem Journey, Growth Formula) and the timeline tube-fill progress.
- Lighter sections: CSS + Intersection Observer, or Framer Motion if already installed. Accordion may use native `<details>` or Framer Motion — whichever is lighter.
- Prefer libraries already in package.json; add GSAP only if it's missing.

## COLORS
- Base: keep the existing pastel / soft-gradient backgrounds and fonts. Do not invent or replace them.
- 5 element colors (named tokens), used ONLY in lab/tool sections: Research purple #7F77DD, Strategy blue #378ADD, Acquisition coral #D85A30, Conversion green #639922, Scale teal #1D9E75 (each a small family).

## TYPOGRAPHY
> **OVERRIDE (owner decision, June 2026):** "Use the old one." Match the EXISTING
> site's typography — i.e. the weights already used in the current components
> (`font-semibold` / 600 for H1+H2, the gradient-pill bold treatment in the hero,
> etc.). Do NOT force the 400/500-only rule below onto existing or new sections;
> new sections should look consistent with what's already built. The rest of the
> rules (sentence case, single H1, one H2 per section, body line-height 1.7) still apply.

- ~~Two font weights ONLY: 400 regular and 500 medium. Never 700 / black.~~ (superseded by override above)
- H1: large, sentence case. Used EXACTLY ONCE on the page (hero).
- H2: medium-large, sentence case — one per section.
- Body line-height: 1.7.
- Sentence case everywhere. Never Title Case. Never ALL CAPS.

## ANIMATION DISCIPLINE (restraint is the brand)
- Sections 3 & 4: scroll-pinned cinematic reveals (heavy) via GSAP ScrollTrigger.
- Section 6: light fade-in on scroll only.
- All other sections: minimal fade / subtle stagger.
- NO bouncing, sliding, neon, typewriter, or decorative motion. Subtle and intentional only.
- Respect prefers-reduced-motion: provide a static fallback for the heavy sections.
- Mobile: simplified, non-pinned versions of the heavy animations (vertical stack, scroll-triggered).

## SEO / SEMANTICS
- Single H1 (hero). One H2 per section. Semantic landmarks.
- Alt text on every image, weaving in keyword variations naturally.
- Page title, meta description, OG + Twitter tags, and LocalBusiness + Service schema exactly as specified in the content file's SEO section.
- Target Lighthouse mobile 85+.

## RESPONSIVE
- Mobile-first. Each section's mobile layout is defined in the content file — follow it.

## SECRETS / BACKEND
- Never hardcode API keys, tokens, or deployment URLs. For the contact form (Google Apps Script + Interakt), use clearly-marked config placeholders / env vars and document what I need to fill in. Build the frontend and a documented submit handler only.

---

## OWNER DECISIONS (June 2026)
- **Typography:** "Use the old one" — match existing site weights; the 400/500-only rule is NOT enforced (see Typography override above).
- **Section 7 serif:** Load Playfair Display via `next/font` when building Section 7 (Why "Ads of Stupid") so the pull-quote uses a real italic serif.
- **Content gaps (footer email/WhatsApp/socials, Section 3 closing icon, Section 7 founder photo):** owner will provide. Use clearly-marked placeholders until then; do not invent.
- **Template reference sections removed from homepage:** Workflow, KeyFeatures, CoreValues, Testimonials, Trust, Blog, CTA were the original template's reference sections (banking-template / made-up / Phase-2 content). They are no longer rendered in `app/page.tsx` so the page matches the content brief. **Their component files are kept in `/components`** for reference and possible Phase-2 reuse (Testimonials + Blog). Do not delete the files.
- **Live page order now matches the brief:** Hero → Proof → Journey (Problem) → Formula (Growth) → Tools (Tool Stack) → Process (Lab Protocol) → WhyUs → Contact → Footer.

## REPO NOTES (groundwork findings — June 2026)
- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript.
- **Styling:** Tailwind CSS v4 (CSS-first, configured via `@theme` in `app/globals.css`). No `tailwind.config.js`.
- **Import alias:** `@/*` → project root.
- **Fonts:** Plus Jakarta Sans (loaded via `next/font`, used for `--font-display` + `--font-body`). `--font-accent` (Playfair Display) is declared but NOT loaded via next/font — currently falls back to Georgia/serif.
- **Animation libs installed:** framer-motion ^12, gsap ^3.15 (+ ScrollTrigger), lenis ^1.3 (smooth scroll). GSAP/ScrollTrigger/Lenis are registered globally in `components/SmoothScroll.tsx`. chart.js + react-chartjs-2 also present.
- **Shared components to reuse:** `components/SectionHeader.tsx` (eyebrow + H2 + description, with fade/stagger), `components/ui/EyebrowBadge.tsx`, `components/ScrollStack.tsx` (GSAP pinned stack), `components/ui/{PhoneMockup,DashboardPreview,Toast}.tsx`.
- **Base color tokens** (`@theme`, the ONLY base palette): `brand-strong #111827`, `brand-mid #5c43fd`, `accent-soft #818cf8`, `surface-tint #f0f0ff`, `surface-main #fafaff`, `ink-strong #111827`, `ink-soft rgba(17,24,39,.72)`.
- **Element tokens added** (lab/tool only): `research`, `strategy`, `acquisition`, `conversion`, `scale` — each with `-soft` and `-deep` variants.
