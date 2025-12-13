import Link from "next/link";
import { Article } from "@/types";
import dayjs from "dayjs";
import styles from "./styles.module.css";

interface LatestPostsProps {
  posts: Article[];
}

export const LatestPosts = ({ posts }: LatestPostsProps) => {
  const latestPosts = posts.slice(0, 5);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Latest Posts</h2>
      <div className={styles.list}>
        {latestPosts.map((post) => (
          <article key={post.slug} className={styles.post}>
            <Link href={`/thoughts/${post.slug}`} className={styles.postLink}>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <time className={styles.postDate}>
                {dayjs(post.date).format("MMMM D, YYYY")}
              </time>
            </Link>
          </article>
        ))}
      </div>
      <div className={styles.viewAll}>
        <Link href="/thoughts" className={styles.viewAllLink}>
          View all thoughts →
        </Link>
      </div>
    </section>
  );
};

