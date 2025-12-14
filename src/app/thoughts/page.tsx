import { getAllArticles } from "@/lib/mdx";
import dayjs from "dayjs";
import Link from "next/link";

export default async function Page() {
  const articles = await getAllArticles();
  const isDevelopment = process.env.NODE_ENV === "development";

  const posts = [...articles]
    .filter((article) => (isDevelopment ? true : !article.draft))
    .sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? -1 : 1));

  return (
    <div className="pt-xl">
      <ul className="flex flex-col gap-xl list-none">
        {posts.map((post) => (
          <li key={post.slug}>
            <h2 className="text-2xl md:text-[1.75rem] font-semibold mb-xs leading-tight">
              <Link href={`/thoughts/${post.slug}`}>{post.title}</Link>
            </h2>
            <div className="text-xs font-normal text-secondary mb-sm">
              {dayjs(post.date).format("MMMM D, YYYY")}
            </div>
            <div className="text-base font-normal leading-base text-secondary">{post.excerpt}</div>
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
