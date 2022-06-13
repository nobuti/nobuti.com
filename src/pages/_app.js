import { ThemeProvider } from "theme-ui";

import Layout from "../components/layout";
import theme from "../theme";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
