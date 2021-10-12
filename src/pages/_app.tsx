/* eslint-disable react/jsx-props-no-spreading */
import "tailwindcss/tailwind.css";
import "@/styles/globals.css";

import { AppProps } from "next/app";
import { Head } from "next/document";
import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

export default function TenCentTeacake({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      {/* <Head>
        <title>My new cool app</title>
      </Head> 
      leads to TypeError: Cannot destructure property 'styles' of 'this.context' as it is null. */}
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
