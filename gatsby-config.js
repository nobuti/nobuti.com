module.exports = {
  siteMetadata: {
    title: "nobuti.com",
    description: "Buti's personal site",
    siteUrl: "https://nobuti.com",
  },
  plugins: [
    "gatsby-plugin-theme-ui",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: "src/posts",
      },
    },
  ],
};
