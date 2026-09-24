# Content & Authoring Guide

How to keep this site updated — for a human or an AI agent. Nothing here
requires touching HTML or Astro components. You edit **data files**, then
push to `main`; GitHub Actions deploys automatically.

The site is a **single-page homepage** (`src/pages/index.astro`). The header
nav is a set of anchor links (`/#news`, `/#publications`, ...) that scroll to
sections on that page.

---

## Where everything lives

| What | File | Format |
|------|------|--------|
| Name, social links, site URL, hero copy, section toggles | `src/config.ts` | TypeScript object |
| Intro paragraphs (About Me + GitHub profile) | `src/data/intro.md` | Markdown |
| Education / Experience | `src/data/education.json`, `experience.json` | JSON array |
| News | `src/data/news.json` | JSON array |
| Publications | `src/data/publications.json` | JSON (sections → papers) |
| Projects / Honors / Services / Skills | `src/data/*.json` | JSON |

The JSON files are the **single source of truth** — both the website and
the GitHub profile README (`github_myprofile_updater/update.py`) read them.
Edit once, both update.

---

## Common updates

### News
Manual entries in `src/data/news.json`, merged and sorted newest-first by
the homepage, showing the **top 5**:

```json
{ "date": "2026.07", "text": "Paper accepted at ", "link": "https://...", "linkText": "ICSE 2027", "suffix": "." }
```
`date` is `YYYY.MM` (a bare `YYYY` also works). `link`, `linkText`, `suffix`
are optional — plain `text` alone is fine. Keep entries to things
Honors/Services don't already cover.

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
  fetched automatically from the Scholar CDN. **Optional** — omit it for
  papers not yet indexed (e.g. just-accepted); the title then renders as
  plain text without a Scholar link.

### Add an honor / project / service
Match the shape already in the corresponding JSON file. Use plain `&`, not
`&amp;`, in headings.

### Toggle a whole section off
In `src/config.ts`, `homePage.sections` — set any to `false` to hide it
site-wide without deleting data.

### Hero copy
The top block (name, tagline, link row) lives in `src/config.ts` under
`homePage`. The avatar is `images/profile.jpg` (referenced as `author.avatar`).

### Add / remove a hero link
The link row (`Google Scholar · GitHub · X · ORCID · Email`) renders in
`src/components/Hero.astro` from `author` fields in `src/config.ts` — present
field = shown, absent = hidden. Email stays Base64-obfuscated.

---

## Design rules (never break)

1. No background colors on content items (except badges).
2. No border-radius or box-shadow on content blocks (there are no cards).
3. Serif (Newsreader) for content; monospace (JetBrains Mono) for metadata
   — dates, badges, sub-headings, nav, tags; sans-serif (Inter) is reserved
   for small UI text.
4. Hover effects are color transitions plus at most a slight scale via the
   `--hover-scale-text` / `--hover-scale-icon` tokens — never shadow or
   background.
5. Left-aligned — never center text.
6. Section dividers are top-borders on headings, not between items.

Palette reference: warm ivory `#f4f3ec`, ink `#1c1b19`, clay accent
`#c15f3c`, hairline borders `#e4e1d6`.

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
A stale News list ages the whole page more than any design flaw. When
something happens (paper, talk, award, internship), update the relevant
JSON. That's the whole job.

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
