import { ThemeProvider } from "theme-ui";
import { useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../components/layout";
import theme from "../theme";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.goatcounter.count({
        path: router.asPath
      });
    }
  }, [router]);

  return (
    <ThemeProvider theme={theme}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
