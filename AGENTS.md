# AGENTS.md

This is an Astro 5 static site — an academic personal homepage (single page). Editorial minimalist design: warm paper background, serif typography, monospace metadata.

## Commands
- `npm run dev` — start dev server at localhost:4321
- `npm run build` — production build to dist/
- `npm install` — install dependencies

## Architecture
- **Astro 5** with static output, deployed to GitHub Pages
- **Single page** `src/pages/index.astro` — the entire site; header nav is anchor links (`/#news`, ...)
- **Single config file** `src/config.ts` — all site settings (identity, hero copy, section toggles)
- **CSS design system** in `src/styles/global.css` — CSS custom properties
- No content collections, no blog, no RSS (removed; do not reintroduce without asking)

## Key conventions
- **Fonts**: Newsreader (serif, content) + JetBrains Mono (monospace, metadata) + Inter (sans-serif, small UI text) via Bunny CDN
- **Space scale**: 4px base, powers of 2 (--space-xs through --space-2xl)
- **Type scale**: --text-xs (12px) through --text-5xl (72px)
- **Colors**: warm ivory bg (#f4f3ec), text (#1c1b19), secondary (#55524c), muted (#a09a90), clay accent (#c15f3c), border (#e4e1d6)
- **Layout**: max-width 1100px (content), 680px (body text)
- **Responsive**: single 768px breakpoint
- **Weight tiers**: labels/sub-lines 400 muted · entry titles 500 · key phrases (your name, job/degree titles) 600 — never other weights

## Content & authoring
- **Full guide: `docs/CONTENT.md`** — how to update data files. Read it before editing content.
- All content lives in `src/data/*.json` + `src/data/intro.md` (single source of truth, also read by the GitHub profile updater in `github_myprofile_updater/`).

## Homepage editing
- Edit `src/pages/index.astro` directly
- Sections use `<Section title="..." id="...">` wrapper (id = anchor target); the intro block is a plain `<section>` without heading
- Hero (name, tagline, text links, avatar) is `src/components/Hero.astro`, driven by `homePage` in `src/config.ts`
- Unified row — one entry format for all sections: `<div class="row"><span class="row-label">DATE / VENUE / ROLE</span><div class="row-body"><div class="row-title">TITLE</div><div class="row-sub">SUBLINE</div></div></div>`
- `row-sub`/`row-desc` are optional sub-lines; `.rows-compact` wraps single-line sections (Honors, Services) for tighter rhythm
- Citations: `<CitationCount paperId="mrf-JvkAAAAJ:XXXXX" />` (fetches from Google Scholar CDN; renders nothing when count is 0; `paperId` is optional per-paper in `publications.json`)

## Design rules (never break these)
1. No background colors on content items (except badges)
2. No border-radius or box-shadow on cards (there are no cards)
3. Serif for content, monospace for metadata (dates, badges, sub-headings, nav, tags), sans-serif only for small UI text
4. Hover effects are color transitions plus at most a slight scale — no shadow, no background change. Scale must use the two `--hover-scale-*` tokens (text 1.02 / icon 1.1), never a raw value
5. Left-aligned — never center text
6. Section dividers are top-borders on headings, not between items
