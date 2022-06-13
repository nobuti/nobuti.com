/** @jsxImportSource theme-ui */

import dayjs from "dayjs";
import remarkFrontmatter from "remark-frontmatter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { components } from "theme-ui";

import { getSlug, getArticleFromSlug } from "../../lib/mdx";
import Meta from "../../components/meta";

const Draft = () => (
  <div
    sx={{
      my: 4,
      fontWeight: "bold",
      color: "primary"
    }}
  >
    You are viewing an draft post, and this may not be ready for primetime.
  </div>
);

export default function Blog({ post: { source, frontmatter } }) {
  return (
    <>
      <Meta
        title={`Thoughts | ${frontmatter.title}`}
        description={frontmatter.title}
      />

      <div
        sx={{
          maxWidth: "container"
        }}
      >
        {frontmatter.draft && <Draft />}
        <components.h1>{frontmatter.title}</components.h1>
        <div
          sx={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <div sx={{ variant: "type.small", mr: 3 }}>
            {dayjs(frontmatter.date).format("MMMM D, YYYY")}
          </div>
        </div>
        <article>
          <MDXRemote {...source} components={components} />
        </article>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const { content, frontmatter } = await getArticleFromSlug(slug);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkFrontmatter],
      rehypePlugins: []
    },
    scope: frontmatter
  });

  return {
    props: {
      post: {
        source: mdxSource,
        frontmatter
      }
    }
  };
}

export async function getStaticPaths() {
  const paths = (await getSlug()).map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false
  };
}
