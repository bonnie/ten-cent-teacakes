/* eslint-disable react/jsx-props-no-spreading */
import "@/styles/globals.css";

import { UserProvider } from "@auth0/nextjs-auth0";
import * as Sentry from "@sentry/nextjs";
import withTwindApp from "@twind/next/app";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { Hydrate, QueryClientProvider } from "react-query";
import { tw } from "twind";

import { Layout } from "@/components/Layout";
import { ErrorComponent } from "@/components/lib/ErrorComponent";
import { ToastContainer } from "@/components/toasts/ToastContainer";
import { ToastProvider } from "@/components/toasts/ToastContext";
import { createQueryClient } from "@/lib/react-query/query-client";

import twindConfig from "../../twind.config";

function TenCentTeacake({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(createQueryClient);

  return (
    <div>
      <Head>
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
      <Sentry.ErrorBoundary fallback={ErrorComponent}>
        <ToastProvider>
          <UserProvider>
            <QueryClientProvider client={queryClient}>
              <Hydrate state={pageProps.dehydratedState}>
                <Layout>
                  <Component className={tw(["h-full"])} {...pageProps} />
                  <ToastContainer />
                </Layout>
              </Hydrate>
            </QueryClientProvider>
          </UserProvider>
        </ToastProvider>
      </Sentry.ErrorBoundary>{" "}
    </div>
  );
}

export default withTwindApp(twindConfig, TenCentTeacake);
