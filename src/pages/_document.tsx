// adapted from
// https://javascript.plainenglish.io/how-to-add-a-custom-google-font-to-a-next-js-and-tailwind-css-app-d0e4ad03f1c3
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap"
            rel="stylesheet"
          />
          <link
            href="http://fonts.cdnfonts.com/css/noir-et-blanc"
            rel="stylesheet"
          />
          {/* <link
            href="http://fonts.cdnfonts.com/css/antique-book-cover"
            rel="stylesheet"
          /> */}
          {/* <link href="http://fonts.cdnfonts.com/css/duality" rel="stylesheet" /> */}
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Rokkitt:wght@400;600;700&display=swap"
            rel="stylesheet"
          /> */}
          {/* <link href="http://fonts.cdnfonts.com/css/parsons" rel="stylesheet" /> */}
        </Head>
        <body className="bg-aqua-light">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
