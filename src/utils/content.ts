/** Convert a subset of Markdown inline syntax to HTML: **bold** and [text](url). */
export function mdInline(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}
