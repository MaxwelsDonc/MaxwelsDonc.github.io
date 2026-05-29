export interface Paper {
  title: string;
  venue: string;
  paperId: string;
  authors: string;
}

export interface PubSection {
  heading: string;
  papers: Paper[];
}

const publications: { sections: PubSection[] } = {
  sections: [
    {
      heading: "Manuscripts Under Review",
      papers: [
        {
          title: "Code comments for quantum software development kits: An empirical study on Qiskit",
          venue: "TOSEM",
          paperId: "mrf-JvkAAAAJ:Y0pCki6q_DkC",
          authors: "**Zenghui Zhou**, Y. Li, Y. Cai, J. Wen, X. Yu, Z. Zheng, B. Yin",
        },
        {
          title: "PSALM: Applying proportional sampling strategy in metamorphic testing",
          venue: "TSE",
          paperId: "mrf-JvkAAAAJ:W7OEmFMy1HYC",
          authors: "**Zenghui Zhou**, P.-L. Poon, Z. Zheng, X.-Y. Zhang",
        },
        {
          title: "Bidirectional empowerment of metamorphic testing and large language models: A systematic survey",
          venue: "CSUR",
          paperId: "mrf-JvkAAAAJ:YsMSGLbcyi4C",
          authors: "Zheng Zheng, **Zenghui Zhou**, Y. Xu, D. Ren, T.Y. Chen",
        },
      ],
    },
    {
      heading: "Selected Publications",
      papers: [
        {
          title: "LGMT: Logic-grounded metamorphic testing for evaluating the reasoning reliability of LLMs",
          venue: "KBS 2026",
          paperId: "mrf-JvkAAAAJ:eQOLeE2rZwMC",
          authors: "**Zenghui Zhou**, M. Li, X. Fang, X. Zhou, W. Li, Z. Zheng",
        },
        {
          title: "Evaluating the effectiveness of neuron coverage metrics: a metamorphic-testing approach",
          venue: "SQJ 2025",
          paperId: "mrf-JvkAAAAJ:Tyk-4Ss8FVUC",
          authors: "**Zenghui Zhou**, Pak-Lok Poon, Tsong Yueh Chen, Kun Qiu, Qinghua Zhou, Zheng Zheng",
        },
        {
          title: "Is word order considered by foundation models? A comparative task-oriented analysis",
          venue: "ESA 2024",
          paperId: "mrf-JvkAAAAJ:qjMakFHDy7sC",
          authors: "Qinghua Zhao, Jiaang Li, Junfeng Liu, Zhongfeng Kang, **Zenghui Zhou**",
        },
        {
          title: "TraceNet: Tracing and locating the key elements in sentiment analysis",
          venue: "KBS 2023",
          paperId: "mrf-JvkAAAAJ:2osOgNQ5qMEC",
          authors: "Qinghua Zhao, Junfeng Liu, Zhongfeng Kang, **Zenghui Zhou**",
        },
        {
          title: "DEEPSIM: Deep Semantic Information-Based Automatic Mandelbug Classification",
          venue: "TR 2022",
          paperId: "mrf-JvkAAAAJ:u5HHmVD_uO8C",
          authors: "Xiaoting Du, Zheng Zheng, Guanping Xiao, **Zenghui Zhou**, Kishor S. Trivedi",
        },
        {
          title: "Follow-up Test Cases are Better Than Source Test Cases in Metamorphic Testing: A Preliminary Study",
          venue: "MET 2021",
          paperId: "mrf-JvkAAAAJ:9yKSN-GCB0IC",
          authors: "**Zenghui Zhou**, Zheng Zheng, Tsong Yueh Chen, Jinyi Zhou, Kun Qiu",
        },
        {
          title: "Cross-project bug type prediction based on transfer learning",
          venue: "SQJ 2020",
          paperId: "mrf-JvkAAAAJ:u-x6o8ySG0sC",
          authors: "Xiaoting Du, **Zenghui Zhou**, Beibei Yin, Guanping Xiao",
        },
      ],
    },
  ],
};

export default publications;
