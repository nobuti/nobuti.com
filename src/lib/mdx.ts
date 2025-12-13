import { Article } from "@/types";
import dayjs from "dayjs";
import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";
import path from "path";

const articlesPath = path.join(process.cwd(), "src/posts");

export async function getSlug() {
  const paths = sync(`${articlesPath}/*.mdx`);

  return paths.map((path) => {
    const pathContent = path.split("/");
    const fileName = pathContent[pathContent.length - 1];
    const [slug] = fileName.split(".");

    return slug;
  });
}

export async function getArticleFromSlug(slug: string) {
  const articleDir = path.join(articlesPath, `${slug}.mdx`);
  const source = fs.readFileSync(articleDir);
  const { content, data } = matter(source);

  return {
    content,
    frontmatter: {
      ...data,
      slug,
      date: dayjs(data.date).toJSON(),
    },
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const articles = fs.readdirSync(articlesPath);

  const posts = await Promise.all(
    articles.map(async (name) => {
      const { metadata } = await import(`@/posts/${name}`);

      return {
        ...metadata,
        slug: name.replace(/.mdx/, ""),
        date: dayjs(metadata.date).toJSON(),
      };
    })
  );

  // Sort by date descending (newest first)
  return posts.sort((a, b) => {
    return dayjs(b.date).isAfter(dayjs(a.date)) ? 1 : -1;
  });
}
