# Academic Homepage + Blog

A clean, minimal personal academic homepage and blog built with [Astro](https://astro.build). Designed in the style of Anthropic's engineering blog — typography-driven, generous whitespace, zero clutter.

**[Live Demo](https://zhouzenghui.site)**

## Quick Start

1. **Fork this repo**
2. **Edit `src/config.ts`** — change name, avatar, social links, site URL
3. **Replace `public/images/profile.jpg`** with your photo
4. **Edit `src/pages/about.astro`** — update your bio, education, publications, etc.
5. **Add blog posts** to `src/content/blog/` as Markdown files
6. **Push to `main`** — GitHub Actions deploys automatically

## Project Structure

```
src/
├── config.ts               Your site configuration (one file)
├── content/
│   └── blog/                Blog posts (Markdown)
├── components/              Reusable Astro components
├── layouts/                 Page layouts
├── pages/                   Route pages
│   ├── index.astro          Homepage
│   ├── about.astro          Full CV / about page
│   └── blog/                Blog listing + posts
└── styles/
    └── global.css           Complete design system
```

## Writing Blog Posts

Create a `.md` file in `src/content/blog/`:

```markdown
---
title: "My First Post"
date: 2025-06-01
excerpt: "A short description for previews."
featured: false
draft: false
---

Your content here. Supports KaTeX: $E = mc^2$
```

## Features

- Anthropic-inspired design — clean typography, generous whitespace, dark footer
- Blog with KaTeX math support and Giscus comments
- Google Scholar citation count integration
- Single config file — everything in `src/config.ts`
- RSS feed auto-generated from blog posts
- Responsive on mobile and desktop
- GitHub Pages auto-deployment
- Zero JavaScript by default (except citation count + giscus)

## Configuration

All customization happens in `src/config.ts`:

| Section | What it controls |
|---------|-----------------|
| `site` | Title, description, URL, analytics ID |
| `author` | Name, avatar, bio, location, social links |
| `navigation` | Header menu items |
| `homePage` | Hero greeting, subtitle, keywords |
| `blogPage` | Blog page title and subtitle |
| `selectedPublications` | Featured papers on homepage |
| `googleScholar` | Citation count CDN URL |
| `giscus` | Comment system config |

## Local Development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # Production build to dist/
```

## Deploy

Push to `main` and GitHub Actions handles the rest. For a custom domain, edit `public/CNAME`.

## Google Scholar Citations

The `google_scholar_crawler/` directory contains a Python script that fetches citation data via GitHub Actions. Data is stored in the `google-scholar-stats` branch and served via jsDelivr CDN. The site loads it client-side to display per-paper citation counts.

## Legacy

This project was migrated from a Jekyll-based site (Minimal Mistakes theme). The crawler and GitHub profile updater are preserved.

## License

MIT
