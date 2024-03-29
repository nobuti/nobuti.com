/** @jsxImportSource theme-ui */

import Link from "next/link";
import dayjs from "dayjs";
import { components } from "theme-ui";

import { getAllArticles } from "../../lib/mdx";
import Meta from "../../components/meta";

export default function Thoughts({ posts }) {
  const getTitle = (post) =>
    `${post.title || post.slug} ${post.draft ? "*" : ""}`;

  return (
    <>
      <Meta title="Buti" description="Thoughts" />
      <div
        sx={{
          maxWidth: "container"
        }}
      >
        <ul
          sx={{
            listStyle: "none",
            m: 0,
            p: 0
          }}
        >
          {posts.map((post) => (
            <li key={post.slug}>
              <components.h2 sx={{ fontSize: [5, 6] }}>
                <Link href={`/thoughts/${post.slug}`} passHref>
                  <a
                    sx={{
                      display: "block",
                      color: "inherit",
                      textDecoration: "none"
                    }}
                  >
                    {getTitle(post)}
                  </a>
                </Link>
              </components.h2>
              <div sx={{ variant: "type.small" }}>
                {dayjs(post.date).format("MMMM D, YYYY")}
              </div>
              <components.p>{post.excerpt}</components.p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const articles = await getAllArticles();
  const isDevelopment = process.env.NODE_ENV === "development";

  const posts = [...articles]
    .filter((article) => (isDevelopment ? true : !article.draft))
    .sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? -1 : 1));

  return {
    props: {
      posts
    }
  };
}
