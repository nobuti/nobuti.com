import remarkFrontmatter from 'remark-frontmatter';
import MDX from "@next/mdx";

const withMDX = MDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
});
export default withMDX({
  // Append the default value with md extensions
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
});
