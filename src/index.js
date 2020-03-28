import React from "react";
import { Helmet } from "react-helmet";
import get from "lodash.get";
import Layout from "./layout";

const Page = (props) => {
  let title = "Nobuti";
  const postTitle = get(props.data, "post.title");
  const description = get(props.data, "post.excerpt");

  if (postTitle) {
    title = `${postTitle} | ${title}`;
  }

  return (
    <>
      <Helmet>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="canonical" href={props.location.href} />
        <meta name="twitter:site" content="@nobuti" />
        <meta name="og:image" content="https://nobuti.com/avatar.png" />
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content="Buti" />
        <meta name="twitter:card" content="summary" />
      </Helmet>
      <Layout {...props}>{props.children}</Layout>
    </>
  );
};

export const wrapPageElement = ({ element, props }) => (
  <Page {...props}>{element}</Page>
);
