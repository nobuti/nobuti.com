import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { sync } from "glob";
import dayjs from "dayjs";

const articlesPath = path.join(process.cwd(), "src/posts");

export async function getSlug() {
  const paths = sync(`${articlesPath}/*.mdx`);

  return paths.map((path) => {
    const pathContent = path.split("/");
    const fileName = pathContent[pathContent.length - 1];
    const [slug, _extension] = fileName.split(".");

    return slug;
  });
}

export async function getArticleFromSlug(slug) {
  const articleDir = path.join(articlesPath, `${slug}.mdx`);
  const source = fs.readFileSync(articleDir);
  const { content, data } = matter(source);

  return {
    content,
    frontmatter: {
      ...data,
      slug,
      date: dayjs(data.date).toJSON()
    }
  };
}

export async function getAllArticles() {
  const articles = fs.readdirSync(path.join(process.cwd(), "src/posts"));

  return articles.reduce((allArticles, articleSlug) => {
    const source = fs.readFileSync(
      path.join(process.cwd(), "src", "posts", articleSlug),
      "utf-8"
    );
    const { data } = matter(source);

    return [
      {
        ...data,
        date: dayjs(data.date).toJSON(),
        slug: articleSlug.replace(/.mdx/, "")
      },
      ...allArticles
    ];
  }, []);
}
