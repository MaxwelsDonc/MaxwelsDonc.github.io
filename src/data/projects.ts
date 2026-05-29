export interface ProjectItem {
  date: string;
  role: string;
  title: string;
  description: string;
  link?: string;
}

const projects: ProjectItem[] = [
  {
    date: "2020 – 2023",
    role: "Algorithm Lead",
    title: "Automated Test Generation for Safety-Critical Embedded Software",
    description:
      "Utilized State Charts to model intricate system behaviors and developed Search-based " +
      "Algorithms to automatically identify test paths and generate test cases.",
  },
  {
    date: "2021 – 2023",
    role: "Core Researcher",
    title: "Reliability Simulation Platform for Distributed Network Systems",
    description:
      "Developed a comprehensive simulation platform applying Markov Chains to model " +
      "system states for real-time reliability prediction.",
  },
  {
    date: "2019 – 2022",
    role: "Core Researcher",
    title: "Automated Testing for Deep Learning Object Detection Systems",
    description:
      "Built an automated testing framework for YOLO using Metamorphic Testing with " +
      "custom image transformation operators.",
  },
  {
    date: "2024 – Present",
    role: "Open Source",
    title: "Response Letter LaTeX Template",
    description:
      "A structured LaTeX Template for drafting response letters during peer-review " +
      "with professional, aesthetic formatting.",
    link: "https://github.com/MaxwelsDonc/responseLetterLatexTemplate",
  },
];

export default projects;
