/* eslint-disable react/jsx-props-no-spreading */
import "@/styles/globals.css";

import { UserProvider } from "@auth0/nextjs-auth0";
import * as Sentry from "@sentry/nextjs";
import withTwindApp from "@twind/next/app";
import { AppProps } from "next/app";
import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { tw } from "twind";

import { Layout } from "@/components/Layout";
import { ErrorComponent } from "@/components/lib/ErrorComponent";
import { ToastContainer } from "@/components/toasts/ToastContainer";
import { ToastProvider } from "@/components/toasts/ToastContext";

import twindConfig from "../../twind.config";

function TenCentTeacake({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <Sentry.ErrorBoundary fallback={ErrorComponent}>
      <ToastProvider>
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Layout>
                <Component className={tw(["h-full"])} {...pageProps} />
                <ToastContainer />
                <ReactQueryDevtools />
              </Layout>
            </Hydrate>
          </QueryClientProvider>
        </UserProvider>
      </ToastProvider>
    </Sentry.ErrorBoundary>
  );
}

export default withTwindApp(twindConfig, TenCentTeacake);
