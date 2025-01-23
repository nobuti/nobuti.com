import { getAllArticles } from "@/lib/mdx";
import dayjs from "dayjs";
import styles from "./styles.module.css";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { default: Post, metadata } = await import(`@/posts/${slug}.mdx`);

  return (
    <div className={styles.container}>
      <h1>{metadata.title}</h1>
      <div className={styles.date}>
        {dayjs(metadata.date).format("MMMM D, YYYY")}
      </div>
      <Post />
    </div>
  );
}

export async function generateStaticParams() {
  const allTheArticles = await getAllArticles();

  return allTheArticles.map((article) => ({
    slug: article.slug.replace(/\.mdx$/, ""),
  }));
}

export const dynamicParams = false;
