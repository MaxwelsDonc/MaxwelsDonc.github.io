export interface ServiceItem {
  role: string;
  text: string;
}

export interface ServiceSection {
  heading: string;
  items: ServiceItem[];
}

const services: { sections: ServiceSection[] } = {
  sections: [
    {
      heading: "Conference &amp; Workshop Service",
      items: [
        { role: "PC Member", text: "AISQ 2025 (The 2nd International Workshop on Advanced Intelligent Software Applications)." },
      ],
    },
    {
      heading: "Journal Reviewer",
      items: [
        { role: "Reviewer", text: "Artificial Intelligence Review (Springer)" },
        { role: "Reviewer", text: "Expert Systems with Applications (Elsevier)" },
        { role: "Reviewer", text: "Scientific Reports (Nature Portfolio)" },
      ],
    },
    {
      heading: "Leadership &amp; Community Service",
      items: [
        { role: "Leadership", text: "President of Beihang Toastmasters Club (2022 – 2023)." },
        { role: "Leadership", text: "Director of Academic Support Center, SASEE, Beihang University (2021 – 2024)." },
        { role: "Mentorship", text: "Academic Counselor, SASEE, BUAA (2021 – 2024)." },
      ],
    },
  ],
};

export default services;
