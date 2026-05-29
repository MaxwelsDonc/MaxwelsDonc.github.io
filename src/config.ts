// ============================================
// Site Configuration — the only file you need to edit.
// ============================================

export const site = {
  title: "Zhou Zenghui",
  description: "PhD Candidate at Beihang University",
  url: "https://zhouzenghui.site",
  lang: "en",
  /** Google Analytics ID. Remove or set to "" to disable. */
  analyticsId: "G-6VT97KX01G",
};

export const author = {
  name: "Zhou Zenghui (周增辉)",
  avatar: "/images/profile.jpg",
  bio: "Beihang University",
  location: "Beijing, China",
  email: "zhouzenghui@buaa.edu.cn",
  github: "MaxwelsDonc",
  googleScholar: "https://scholar.google.com.hk/citations?user=mrf-JvkAAAAJ",
  orcid: "https://orcid.org/0000-0002-1824-6979",
  researchgate: "https://www.researchgate.net/profile/Zenghui-Zhou-2",
  stackoverflow: "https://stackoverflow.com/users/18479002/zhouzenghui",
};

export const navigation = {
  header: [
    { label: "Intro", href: "/about" },
    { label: "Blog", href: "/blog" },
  ],
};

export const homePage = {
  greeting: "Hi, I'm Zhou Zenghui",
  subtitle: "Token is Cheap, Attention is Expensive",
  keywords: ["LLM Testing", "Quantum Software Engineering", "Trustworthy AI"],
};

export const blogPage = {
  title: "Blog",
  subtitle: "Thoughts on AI, software, and beyond",
};

export const selectedPublications = [
  {
    venue: "TOSEM",
    title: "Code comments for quantum software development kits: An empirical study on Qiskit",
    paperId: "mrf-JvkAAAAJ:Y0pCki6q_DkC",
  },
  {
    venue: "TSE",
    title: "PSALM: Applying proportional sampling strategy in metamorphic testing",
    paperId: "mrf-JvkAAAAJ:W7OEmFMy1HYC",
  },
  {
    venue: "SQJ",
    title: "Evaluating the effectiveness of neuron coverage metrics: a metamorphic-testing approach",
    paperId: "mrf-JvkAAAAJ:Tyk-4Ss8FVUC",
  },
];

export const googleScholar = {
  enabled: true,
  statsUrl: "https://cdn.jsdelivr.net/gh/MaxwelsDonc/MaxwelsDonc.github.io@google-scholar-stats/gs_data.json",
};

export const giscus = {
  /** GitHub repo, e.g. "yourname/yourname.github.io" */
  repo: "MaxwelsDonc/MaxwelsDonc.github.io",
  /** Get these from https://giscus.app — leave empty to disable comments */
  repoId: "",
  category: "Blog Comments",
  categoryId: "",
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

  if (giscus.repoId && !giscus.categoryId)
    errors.push('giscus: set both repoId AND categoryId, or leave both empty');
  if (!giscus.repoId && giscus.categoryId)
    errors.push('giscus: set both repoId AND categoryId, or leave both empty');

  if (errors.length > 0) {
    console.error("\n❌ Config validation failed:\n");
    errors.forEach((e) => console.error(`  • ${e}`));
    console.error("\nFix src/config.ts and try again.\n");
    process.exit(1);
  }
}

validateConfig();
