"""
Generate README.md for the GitHub profile repo (MaxwelsDonc/MaxwelsDonc).
Reads directly from src/data/ JSON files — no regex parsing of TypeScript.
"""

import json
import re


def read_file(path):
    with open(path, encoding="utf-8") as f:
        return f.read().strip()


def load_json(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def md_bold(text):
    """Keep **name** markdown bold as-is (valid in GitHub README)."""
    return text


def main():
    base = "../src/data"

    intro = read_file(f"{base}/intro.md")
    news = load_json(f"{base}/news.json")
    publications = load_json(f"{base}/publications.json")
    skills = load_json(f"{base}/skills.json")
    experience = load_json(f"{base}/experience.json")

    lines = []

    lines.append("## Hi there 👋\n")
    lines.append(intro)
    lines.append("")

    if experience:
        lines.append("## Current Position\n")
        for item in experience[:1]:
            lines.append(f"**{item['title']}** @ {item['company']}")
            lines.append(f"> {item['description']}")
        lines.append("")

    if news:
        lines.append("## Recent News\n")
        for item in news[:5]:
            text = item.get("text", "")
            if item.get("link") and item.get("linkText"):
                text += f"[{item['linkText']}]({item['link']})"
            if item.get("suffix"):
                text += item["suffix"]
            lines.append(f"- **{item['date']}**: {text}")
        lines.append("")

    selected = next(
        (s for s in publications["sections"] if s["heading"] == "Selected Publications"),
        None,
    )
    if selected:
        lines.append("## Selected Publications\n")
        for paper in selected["papers"][:5]:
            lines.append(f"- **[{paper['venue']}]** {paper['title']}")
        lines.append("")

    if skills:
        lines.append("## Skills\n")
        lines.append(" · ".join(skills))
        lines.append("")

    lines.append("---")
    lines.append("*Profile auto-updated via GitHub Actions.*")

    with open("README.md", "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")

    print("README.md generated successfully.")


if __name__ == "__main__":
    main()
