import React from "react";

import Document, { Html, Head, Main, NextScript } from "next/document";

class AppDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* TODO :: Change title to kargo.am */}
          <title>auto recource hub</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
