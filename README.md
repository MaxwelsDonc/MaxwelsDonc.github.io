# Academic Homepage · Astro

A clean, typography-driven academic personal homepage built with [Astro 5](https://astro.build). Single-page design in an **Editorial Minimalism** style — warm paper background, serif headlines, monospace metadata, generous whitespace, no card UI.

**[Live Site](https://zhouzenghui.site)**

---

## Quick Start (5 minutes to your own site)

1. **Fork this repo**
2. **Edit `src/config.ts`** — your name, hero copy, social links, site URL
3. **Replace `public/images/profile.jpg`** with your photo
4. **Edit the data files** in `src/data/` — intro, education, experience, news, publications, projects, honors, services, skills
5. **Push to `main`** — GitHub Actions deploys to GitHub Pages automatically

See **`docs/CONTENT.md`** for the full authoring guide.

---

## Features

### Design
- **Editorial Minimalism** — typography-first, no cards, no background colors
- **Three-font system** — Newsreader serif for content, JetBrains Mono for metadata (dates, badges, nav), Inter for small UI text
- **Warm paper palette** — `#f7f6f3` background, ink text, clay accent `#c15f3c`
- **Dual-column table-row layout** (mono date label + serif content)
- **Responsive** — single breakpoint at 768px, stacks gracefully on mobile

### Engineering
- **Single config file** — `src/config.ts` controls everything
- **Data-driven content** — all content in `src/data/*.json` + `intro.md`, also consumed by the GitHub profile README updater
- **Google Scholar citations** — auto-fetched via CDN, displayed per-paper
- **GitHub Pages deployment** — push to `main`, GitHub Actions handles the rest
- **Near-zero runtime JS** — citation counts, scroll-reveal, email de-obfuscation only

---

## Project Structure

```
src/
├── config.ts                    ★ Your one-file configuration
├── data/
│   ├── intro.md                 About Me paragraphs (shared with GitHub profile)
│   ├── education.json           Education timeline
│   ├── experience.json          Industry experience
│   ├── news.json                News entries (top 5 shown)
│   ├── publications.json        Papers, grouped into sections
│   ├── projects.json            Research projects
│   ├── honors.json              Honors & awards
│   ├── services.json            Academic services & talks
│   └── skills.json              Skill tags
├── components/
│   ├── CitationCount.astro      Google Scholar citation badge (the only badge)
│   ├── Header.astro / Footer.astro
│   ├── Hero.astro               Name, tagline, text links, avatar
│   ├── Section.astro            Generic section wrapper
│   └── icons/                   SVG icons (footer only)
├── layouts/
│   └── BaseLayout.astro         HTML shell + SEO + fonts
├── pages/
│   └── index.astro              The entire site (single page)
├── styles/
│   └── global.css               Complete design system
public/
├── images/                      Profile photo, favicon
└── CNAME                        Custom domain (optional)
```

---

## Configuration

All customization in `src/config.ts`:

```typescript
export const site = {
  title: "Your Name",
  description: "PhD Candidate at ...",
  url: "https://yourname.github.io",
  lang: "en",
  analyticsId: "G-XXXXXXXXXX",  // optional Google Analytics
};

export const author = {
  name: "Your Name (中文名)",
  avatar: "/images/profile.jpg",
  bio: "Your University",
  location: "City, Country",
  email: "...",
  github: "...",
  googleScholar: "...",
  orcid: "...",
  // ...
};

export const navigation = {
  header: [
    { label: "News", href: "/#news" },
    { label: "Publications", href: "/#publications" },
  ],
};

export const homePage = {
  name: "Your Name",
  nameCn: "中文名",
  subtitle: "Your tagline.",
  sections: { aboutMe: true, news: true, /* ...toggle sections */ },
};
```

Build-time validation fails the build with a clear error if `site.title`,
`site.url`, or `author.name` are left as placeholders.

---

## Google Scholar Citations

1. The `google_scholar_crawler/` directory contains a Python script
2. GitHub Actions (`google_scholar_crawler.yaml`) runs it periodically
3. Citation data is stored in the `google-scholar-stats` branch
4. Served via jsDelivr CDN — no server needed
5. The site fetches it client-side and displays per-paper counts

**Setup:** Update `USER_ID` in the crawler script to your Google Scholar user ID.

---

## Local Development

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # Production build to dist/
```

---

## Deploy

Push to `main`. GitHub Actions builds and deploys to GitHub Pages automatically.

For a custom domain:
1. Edit `public/CNAME` with your domain
2. Configure your DNS (CNAME to `<username>.github.io`)

---

## Design Principles

1. **No cards** — no background colors, no border-radius, no box-shadows on content
2. **Three-font discipline** — serif for content, monospace for metadata, sans-serif only for small UI text
3. **Hairline dividers** — top-borders on section headings, never boxes
4. **Hover is color + slight scale** — via the `--hover-scale-*` tokens only
5. **Left-aligned** — no centering, left edge is the spine

---

## License

MIT
