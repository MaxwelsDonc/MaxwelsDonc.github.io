# Generate README.md for GitHub profile repo (MaxwelsDonc/MaxwelsDonc).
# Reads from src/data/ - edit those files to also update your profile page.

import re


def read_file(path):
    with open(path) as f:
        return f.read().strip()


def main():
    base = "../src/data/"
    header = "## Hi there \U0001f44b"
    intro = read_file(f"{base}/intro.md")

    # Parse news dates and texts (simple approach: extract structured fields)
    news_raw = read_file(f"{base}/news.ts")
    news_items = []
    current_date = ""
    current_text = ""
    current_link = ""
    current_link_text = ""
    current_suffix = ""
    for line in news_raw.split("\n"):
        line = line.strip()
        m = re.match(r'date:\s*"([^"]+)"', line)
        if m:
            # Flush previous item
            if current_date:
                item = f"- **{current_date}**: {current_text}"
                if current_link and current_link_text:
                    item += f" [{current_link_text}]({current_link})"
                if current_suffix:
                    item += current_suffix
                news_items.append(item)
            current_date = m.group(1)
            current_text = ""
            current_link = ""
            current_link_text = ""
            current_suffix = ""
            continue
        m = re.match(r'text:\s*"([^"]*)"', line)
        if m:
            current_text = m.group(1)
            continue
        m = re.match(r'link:\s*"([^"]+)"', line)
        if m:
            current_link = m.group(1)
            continue
        m = re.match(r'linkText:\s*"([^"]+)"', line)
        if m:
            current_link_text = m.group(1)
            continue
        m = re.match(r'suffix:\s*"([^"]+)"', line)
        if m:
            current_suffix = m.group(1)
            continue
    # Flush last item
    if current_date:
        item = f"- **{current_date}**: {current_text}"
        if current_link and current_link_text:
            item += f" [{current_link_text}]({current_link})"
        if current_suffix:
            item += current_suffix
        news_items.append(item)

    # Parse publications - extract titles from Selected Publications section
    pub_raw = read_file(f"{base}/publications.ts")
    in_selected = False
    pub_titles = []
    for line in pub_raw.split("\n"):
        line = line.strip()
        if 'heading: "Selected Publications"' in line:
            in_selected = True
            continue
        if in_selected and line.startswith("heading:"):
            break
        if in_selected and "title:" in line:
            title = line.split("title:", 1)[1].strip()
            title = title.strip().strip('"').strip("'").rstrip(",").rstrip('"').strip()
            pub_titles.append(title)

    with open("README.md", "w") as f:
        f.write(f"{header}\n\n")
        f.write(f"{intro}\n\n")

        if news_items:
            f.write("## Recent News\n\n")
            for item in news_items[:5]:
                f.write(f"{item}\n")
            f.write("\n")

        if pub_titles:
            f.write("## Selected Publications\n\n")
            for title in pub_titles[:6]:
                f.write(f"- {title}\n")

        f.write("\n---\n*Updated automatically via GitHub Actions.*\n")


if __name__ == "__main__":
    main()
