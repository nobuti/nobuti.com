import { getAllArticles } from "@/lib/mdx";
import dayjs from "dayjs";
import Link from "next/link";
import styles from "./styles.module.css";

export default async function Page() {
  const articles = await getAllArticles();
  const isDevelopment = process.env.NODE_ENV === "development";

  const posts = [...articles]
    .filter((article) => (isDevelopment ? true : !article.draft))
    .sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? -1 : 1));

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {posts.map((post) => (
          <li key={post.slug}>
            <h2>
              <Link href={`/thoughts/${post.slug}`}>{post.title}</Link>
            </h2>
            <div className={styles.date}>
              {dayjs(post.date).format("MMMM D, YYYY")}
            </div>
            <div className={styles.excerpt}>{post.excerpt}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const metadata = {
  title: "Buti | Thoughts",
  description: "Thoughts",
};
