import Head from "next/head";

const DEFAULT_TITLE = "Buti";
const DEFAULT_DESCRIPTION = "Software Engineer";

const Meta = (props) => {
  const { title, description } = props;
  const canonicalUrl =
    typeof window === "undefined"
      ? ""
      : `${window.location.origin}/${window.location.pathname}`;
  return (
    <Head>
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
      <link rel="canonical" href={canonicalUrl} />
      <meta name="twitter:site" content="@nobuti" />
      <meta name="og:image" content="https://nobuti.com/avatar.png" />
      <title>{title || DEFAULT_TITLE}</title>
      <meta name="og:title" content={title || DEFAULT_TITLE} />
      <meta
        name="og:description"
        content={description || DEFAULT_DESCRIPTION}
      />
      <meta name="twitter:title" content={title || DEFAULT_TITLE} />
      <meta
        name="twitter:description"
        content={description || DEFAULT_DESCRIPTION}
      />
      <meta name="twitter:creator" content="Buti" />
      <meta name="twitter:card" content="summary" />
      <meta name="Description" content={description || DEFAULT_TITLE}></meta>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};

export default Meta;
