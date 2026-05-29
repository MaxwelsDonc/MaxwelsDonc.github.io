export interface HonorItem {
  date: string;
  level: string;
  text: string;
}

export interface HonorSection {
  heading: string;
  items: HonorItem[];
}

const honors: { sections: HonorSection[] } = {
  sections: [
    {
      heading: "Academic Honors &amp; Titles",
      items: [
        { date: "2025", level: "City-level", text: "Merit Student of Beijing (北京市三好学生)." },
        { date: "2019, 2022", level: "University", text: "Outstanding Graduate Student / Excellent Graduate, Beihang University." },
        { date: "2021", level: "School", text: "School Merit Student, SASEE, Beihang University." },
      ],
    },
    {
      heading: "Scholarships &amp; Competitions",
      items: [
        { date: "2019, 2020", level: "University", text: "First Prize, Academic Excellence Scholarship, Beihang University." },
        { date: "2017", level: "University", text: "First Prize, Scholarship for Academic Competitions, Beihang University." },
        { date: "2017", level: "Competition", text: "Honorable Mention, Mathematical Contest in Modeling (MCM/ICM)." },
      ],
    },
    {
      heading: "Leadership &amp; Service Awards",
      items: [
        { date: "2017, 2022, 2023", level: "University", text: "Outstanding Student Leader, Beihang University." },
        { date: "2022", level: "University", text: "Outstanding Member of the Communist Youth League, Beihang University." },
        { date: "2022, 2023", level: "Service", text: "Outstanding Academic Counselor Award, Beihang University." },
      ],
    },
  ],
};

export default honors;
