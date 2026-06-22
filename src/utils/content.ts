/** Strip .md extension from a content collection entry id to get the URL slug. */
export function toSlug(id: string): string {
  return id.replace(/\.md$/, "");
}

/** Convert a subset of Markdown inline syntax to HTML: **bold** and [text](url). */
export function mdInline(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}
