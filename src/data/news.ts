export interface NewsItem {
  date: string;
  text: string;
  link?: string;
  linkText?: string;
  suffix?: string;
}

const news: NewsItem[] = [
  {
    date: "2025.12",
    text: "Honored as the Merit Student of Beijing (City-level Honor).",
  },
  {
    date: "2025.11",
    text: "Open-sourced a Response Letter LaTeX Template on ",
    link: "https://github.com/MaxwelsDonc/responseLetterLatexTemplate",
    linkText: "GitHub",
  },
  {
    date: "2025.01",
    text: "Invited to serve as a PC Member for the ",
    link: "https://sites.google.com/view/aisq-2025/home",
    linkText: "AISQ 2025",
    suffix: " workshop (co-located with IEEE ISSRE).",
  },
];

export default news;
