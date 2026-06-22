# Content & Authoring Guide

How to keep this site updated — for a human or an AI agent. Nothing here
requires touching HTML or Astro components. You edit **data files** and
**Markdown**, then push to `main`; GitHub Actions deploys automatically.

---

## Where everything lives

| What | File | Format |
|------|------|--------|
| Name, social links, site URL, section toggles | `src/config.ts` | TypeScript object |
| Intro paragraph (About + GitHub profile) | `src/data/intro.md` | Markdown |
| Education / Experience | `src/data/education.json`, `experience.json` | JSON array |
| News | `src/data/news.json` | JSON array |
| Publications | `src/data/publications.json` | JSON (sections → papers) |
| Projects / Honors / Services / Skills | `src/data/*.json` | JSON |
| Blog posts | `src/content/blog/YYYY-MM-DD-slug.md` | Markdown + frontmatter |

The JSON files are the **single source of truth** — both the website and
the GitHub profile README (`github_myprofile_updater/update.py`) read them.
Edit once, both update.

---

## Common updates

### News (auto-merged from two sources)
The About-page News list is built from **two sources**, merged and sorted
newest-first, showing the **top 3**:

1. **Blog posts** with `news: true` in frontmatter — title becomes the news
   headline, linking to the post. Write a post, it shows up automatically.
2. **Manual entries** in `src/data/news.json` — for things not written as a
   blog post (paper acceptance, award, invited talk).

So most news takes care of itself. Only add a manual entry when there's no
blog post for it. Keep manual entries to things Honors/Services don't already
cover.

```json
{ "date": "2026.07", "text": "Paper accepted at ", "link": "https://...", "linkText": "ICSE 2027", "suffix": "." }
```
`date` is `YYYY.MM`. `link`, `linkText`, `suffix` are optional — plain `text`
alone is fine. (The GitHub profile README still lists only `news.json`, since
it can't link to blog posts the same way.)

### Add a publication
In `src/data/publications.json`, add to the right section's `papers` array:

```json
{
  "title": "Paper Title",
  "venue": "ICSE 2027",
  "authors": "**Zhou Zenghui**, Co-Author, et al.",
  "paperId": "mrf-JvkAAAAJ:FULL_PAPER_ID"
}
```
- `**bold**` in `authors` marks your name (renders bold).
- `paperId` is the **full** Google Scholar `author_pub_id`
  (`mrf-JvkAAAAJ:xxxxx`), not just the suffix. The citation count is
  fetched automatically from the Scholar CDN — leave it out, it fills in.

### Add an honor / project / service
Match the shape already in the corresponding JSON file. Use plain `&`, not
`&amp;`, in headings.

### Toggle a whole section off
In `src/config.ts`, `aboutPage.sections` — set any to `false` to hide it
site-wide without deleting data.

### Add / remove a social icon
Add a field under `author` in `src/config.ts` (e.g. `x: "handle"`). Icons
render conditionally in `src/components/AboutCard.astro` — present field =
shown, absent = hidden. New platform needs a matching icon in
`src/components/icons/` (fill-based Simple Icons SVG, `fill="currentColor"`).

---

## Writing a blog post

Create `src/content/blog/YYYY-MM-DD-slug.md`. The date prefix sets the URL
slug and ordering.

### Frontmatter

```yaml
---
title: "Your Title"
date: 2026-06-23
excerpt: "One or two sentences shown in listings and as the share preview."
keywords: ["Topic", "Topic"]   # small tags under the title
related: []                     # other post slugs, e.g. ["2025-05-28-llm-testing"]
featured: false                 # true = highlighted at top of /blog
draft: false                    # true = excluded from build & RSS
news: false                     # true = also surface in About-page News list
---
```

### Body conventions
- **Headings**: start at `##` (the `#`/title comes from frontmatter). `##`
  and `###` populate the on-page Table of Contents automatically.
- **Math**: inline `$E=mc^2$`, block `$$ ... $$` (KaTeX).
- **Diagrams**: fenced ` ```mermaid ` blocks render as diagrams.
- **Code**: fenced blocks get a copy button and syntax highlighting.
- **Links**: standard Markdown. External links print with their URL
  appended (print stylesheet), so a printed post stays self-contained.

### Voice & tone
Match the existing posts: plain, direct, technical-but-readable. The design
is "Editorial Minimalism" (Anthropic engineering blog / *The New Yorker*) —
the prose should feel the same. No marketing fluff, no emoji headers.

---

## Design rules (never break — applies to prose too)

1. No background colors on content (badges are the only exception).
2. No border-radius or box-shadow on content blocks.
3. Serif (Newsreader) for content, sans-serif (Inter) for metadata only.
4. Hover effects are color transitions only.
5. Left-aligned — never center text.
6. Section dividers are top/bottom borders on headings, not boxes.

---

## Before you push

```bash
npm run build      # must pass — config has build-time validation
npm run dev        # eyeball at localhost:4321
```

A clean `npm run build` is the gate. Pushing to `main` triggers deploy
(`.github/workflows/deploy.yml`). Two scheduled jobs run on their own:
citation data (daily 08:00 UTC) and GitHub profile README (daily 02:00 UTC).

## Maintenance

The site is mostly self-running. Day-to-day there is exactly one job —
keep content fresh. Everything else is occasional or automatic.

### 1. Content freshness — the only real upkeep
A stale News list or an old "latest" date ages the whole page more than any
design flaw. When something happens (paper, talk, award, release), update the
relevant JSON or write a post with `news: true`. That's the whole job.

### 2. Automated jobs (run on their own)
Three GitHub Actions workflows; you don't trigger them by hand:

| Workflow | File | Schedule | Needs secret |
|----------|------|----------|--------------|
| Deploy to Pages | `deploy.yml` | on push to `main` | — |
| Citation data crawl | `google_scholar_crawler.yaml` | daily 08:00 UTC | `GOOGLE_SCHOLAR_ID` |
| GitHub profile README | `update-profile.yml` | daily 02:00 UTC | `GHRS_GITHUB_API_TOKEN` |

If one looks broken, check the **Actions** tab for a red run. Common causes:
a missing/expired secret, or Google Scholar rate-limiting the crawler (it
retries next day — usually self-heals).

### 3. Citation counts
Counts under each publication are fetched client-side from a CDN-hosted JSON
that the crawler pushes to the `google-scholar-stats` branch. To wire up a new
paper: set its `paperId` in `publications.json` to the full Google Scholar
`author_pub_id` (`mrf-JvkAAAAJ:xxxxx`). If a count shows blank, confirm (a) the
crawler's last run succeeded, and (b) that exact `paperId` exists in the
published `gs_data.json`.

### 4. Dependencies
Every few months: `npm outdated`. Patch/minor bumps are safe; read the
changelog before a major version (especially Astro). This is the only part
that rots without you touching it.

### 5. Design discipline (maintenance of taste)
When tempted to "beautify," re-read the **Design rules** above first. This
site's quality comes from restraint — no motion gimmicks, no cards, no
centered text. Adding flashy components is the most common way to make it
worse. Prefer subtraction.
