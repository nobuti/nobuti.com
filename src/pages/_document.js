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
