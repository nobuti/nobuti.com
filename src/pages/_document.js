import Document, { Html, Head, Main, NextScript } from "next/document";
import { InitializeColorMode } from "theme-ui";

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* add allow_local: true to data-goatcounter-settings to allow localhost dev environment */}
          <script
            data-goatcounter="https://nobuti.goatcounter.com/count"
            data-goatcounter-settings='{"no_onload": true}'
            async
            src="/scripts/goatcounter.js"
          ></script>
        </Head>
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
