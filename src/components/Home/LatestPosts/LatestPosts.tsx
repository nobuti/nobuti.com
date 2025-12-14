import { Article } from "@/types";
import dayjs from "dayjs";
import Link from "next/link";

interface LatestPostsProps {
  posts: Article[];
}

export const LatestPosts = ({ posts }: LatestPostsProps) => {
  const latestPosts = posts.slice(0, 5);

  return (
    <section className="py-xl">
      <h2 className="text-base font-normal mb-lg text-foreground">Writing</h2>
      <div className="flex flex-col gap-md">
        {latestPosts.map((post) => (
          <article
            key={post.slug}
            className="transition-opacity duration-200 hover:opacity-70"
          >
            <Link
              href={`/thoughts/${post.slug}`}
              className="no-underline text-foreground flex justify-between items-baseline gap-md"
            >
              <div className="text-sm font-normal flex-1">{post.title}</div>
              <time className="text-xs text-secondary whitespace-nowrap">
                {dayjs(post.date).format("MMM D, YYYY")}
              </time>
            </Link>
          </article>
        ))}
      </div>
      <div className="mt-lg">
        <Link
          href="/thoughts"
          className="text-foreground no-underline text-sm font-normal transition-opacity duration-200 hover:opacity-70"
        >
          View all
        </Link>
      </div>
    </section>
  );
};
