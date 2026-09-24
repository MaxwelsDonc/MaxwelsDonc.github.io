// ============================================
// Site Configuration — the only file you need to edit.
// ============================================

export const site = {
  title: "Zhou Zenghui",
  description: "Ph.D. candidate at Beihang University — reliable evaluation of intelligent systems",
  url: "https://zhouzenghui.site",
  lang: "en",
  /** Google Analytics ID. Remove or set to "" to disable. */
  analyticsId: "G-6VT97KX01G",
};

export const author = {
  name: "Zhou Zenghui (周增辉)",
  avatar: "/images/profile.jpg",
  bio: "Ph.D. Candidate, Beihang University",
  location: "Beijing, China",
  email: "zhouzenghui.p@outlook.com",
  github: "MaxwelsDonc",
  x: "MaxwelDonc",
  googleScholar: "https://scholar.google.com.hk/citations?user=mrf-JvkAAAAJ",
  googleScholarId: "mrf-JvkAAAAJ",
  orcid: "https://orcid.org/0000-0002-1824-6979",

};

export const navigation = {
  header: [
    { label: "About", href: "/#about" },
    { label: "News", href: "/#news" },
    { label: "Experience", href: "/#experience" },
    { label: "Publications", href: "/#publications" },
  ],
};

export const homePage = {
  name: "Zhou Zenghui",
  nameCn: "周增辉",
  subtitle: "Token is cheap, attention is expensive.",
  /** Toggle sections on/off. Set false to hide a section entirely. */
  sections: {
    aboutMe: true,
    news: true,
    experience: true,
    publications: true,
    education: false,
    projects: false,
    honors: true,
    services: false,
    skills: false,
  },
};

export const googleScholar = {
  enabled: true,
  statsUrl: "https://cdn.jsdelivr.net/gh/MaxwelsDonc/MaxwelsDonc.github.io@google-scholar-stats/gs_data.json",
};

// ============================================
// Validation — checked at build time
// ============================================

function validateConfig() {
  const errors: string[] = [];

  if (!site.title || site.title === "Your Name")
    errors.push('site.title is required. Set it in src/config.ts');
  if (!site.url || site.url.includes("yourname"))
    errors.push('site.url is required. Set your GitHub Pages URL in src/config.ts');

  if (!author.name || author.name === "Your Name")
    errors.push('author.name is required. Set it in src/config.ts');

  if (errors.length > 0) {
    console.error("\n❌ Config validation failed:\n");
    errors.forEach((e) => console.error(`  • ${e}`));
    console.error("\nFix src/config.ts and try again.\n");
    throw new Error("Config validation failed — see messages above.");
  }
}

validateConfig();
