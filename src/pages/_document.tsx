import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { tw } from "twind";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
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
            href="https://fonts.cdnfonts.com/css/delfina"
            rel="stylesheet"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.tencentteacakes.com" />
          <meta property="og:title" content="Ten-Cent Teacakes" />
          <meta
            property="og:description"
            content="Eclectic string band music and cheap baked goods"
          />
          <meta
            property="og:image"
            content="https://www.tencentteacakes.com/_next/image?url=%2Flogo%2Flogo-shadow.png&w=1920&q=75"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@TenCentTeacakes" />
          <meta name="twitter:creator" content="@TenCentTeacakes" />
          <meta name="twitter:domain" content="tencentteacakes.com" />
          <meta name="twitter:title" content="Ten-Cent Teacakes" />
          <meta
            name="twitter:description"
            content="Eclectic string band music and cheap baked goods"
          />
          <meta
            name="twitter:image"
            content="https://www.tencentteacakes.com/_next/image?url=%2Flogo%2Flogo-shadow.png&w=1920&q=75"
          />
          <meta
            name="twitter:image:alt"
            content="Ten-Cent Teacakes String Band, teacake with 10-cent price tag"
          />
          <meta name="twitter:url" content="https://www.tencentteacakes.com" />
        </Head>
        <body className={tw(["bg-aqua-100"])}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
