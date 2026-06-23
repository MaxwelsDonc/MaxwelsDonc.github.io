# CLAUDE.md

This is an Astro 5 static site — an academic personal homepage + blog. Editorial minimalist design with serif typography.

## Commands
- `npm run dev` — start dev server at localhost:4321
- `npm run build` — production build to dist/
- `npm install` — install dependencies

## Architecture
- **Astro 5** with static output, deployed to GitHub Pages
- **Content collections** (`src/content.config.ts`) for blog posts
- **Single config file** `src/config.ts` — all site settings
- **CSS design system** in `src/styles/global.css` — CSS custom properties

## Key conventions
- **Fonts**: Newsreader (serif, content) + Inter (sans-serif, metadata) via Bunny CDN
- **Space scale**: 4px base, powers of 2 (--space-xs through --space-2xl)
- **Type scale**: --text-xs (12px) through --text-5xl (72px)
- **Colors**: --color-text (#171717), --color-text-secondary (#525252), --color-text-muted (#a3a3a3)
- **Layout**: max-width 1100px (content), 680px (article text)
- **Responsive**: single 768px breakpoint

## Blog posts
- Markdown files in `src/content/blog/`, named `YYYY-MM-DD-slug.md`
- Frontmatter: title, date, excerpt, keywords[], related[], featured, draft
- Supports KaTeX math (`$...$` and `$$...$$`) and Mermaid diagrams (` ```mermaid `)
- Article styles are scoped in `src/layouts/BlogPostLayout.astro` with `is:global`

## About page editing
- Edit `src/pages/about.astro` directly
- Sections use `<Section title="...">` wrapper
- Dual-column rows: `<div class="cv-row"><span class="cv-label edu-date">DATE</span><div><div class="cv-main">TITLE</div><div class="cv-desc">DESC</div></div></div>`
- Badges: `<Badge variant="journal|role|honor|project">TEXT</Badge>`
- Citations: `<CitationCount paperId="mrf-JvkAAAAJ:XXXXX" />` (fetches from Google Scholar CDN)

## Design rules (never break these)
1. No background colors on content items (except badges)
2. No border-radius or box-shadow on cards (there are no cards)
3. Serif for content, sans-serif for metadata only
4. Hover effects are color transitions plus at most a slight scale — no shadow, no background change. Scale must use the two `--hover-scale-*` tokens (text 1.02 / icon 1.1), never a raw value
5. Left-aligned — never center text
6. Section dividers are top-borders on headings, not between items
