import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { site, author } from "../config";
import { toSlug } from "../utils/content";

export async function GET() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: site.title,
    description: site.description,
    site: site.url,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt || "",
      pubDate: post.data.date,
      link: `/blog/${toSlug(post.id)}`,
    })),
    customData: `<language>${site.lang}</language>`,
  });
}
