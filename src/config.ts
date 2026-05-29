// ============================================
// Site Configuration — the only file you need to edit.
// ============================================

export const site = {
  title: "Zhou Zenghui",
  description: "PhD Candidate at Beihang University",
  url: "https://zhouzenghui.site",
  lang: "en",
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
  bio: "Ph.D. Candidate @ Beihang University | Researching LLM Testing & Quantum Software Engineering",
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
  repo: "MaxwelsDonc/MaxwelsDonc.github.io",
  repoId: "",
  category: "Blog Comments",
  categoryId: "",
};
