export interface EducationItem {
  date: string;
  title: string;
  school: string;
  description: string;
}

const education: EducationItem[] = [
  {
    date: "2020.09 – Present",
    title: "Ph.D. Candidate",
    school: "School of Automation Science and Electrical Engineering (SASEE), Beihang University",
    description:
      "Admitted to the Successive Master-Doctoral Program due to academic distinction. " +
      "Supervised by Prof. Zheng Zheng, in collaboration with Prof. Tsong Yueh Chen " +
      "(Swinburne University, IEEE Fellow).",
  },
  {
    date: "2015.09 – 2019.06",
    title: "B.Eng.",
    school: "Shenyuan Honors College, Beihang University",
    description:
      "Shenyuan Honors College is an elite institute dedicated to the top students at " +
      "Beihang University. Waived from the National Graduate Entrance Examination " +
      "(Research Recommendation).",
  },
];

export default education;
