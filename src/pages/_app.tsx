/* eslint-disable react/jsx-props-no-spreading */
import "tailwindcss/tailwind.css";
import "@/styles/globals.css";

import { UserProvider } from "@auth0/nextjs-auth0";
import * as Sentry from "@sentry/nextjs";
import { AppProps } from "next/app";
import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

import { Layout } from "@/components/Layout";
import { ErrorComponent } from "@/components/lib/ErrorComponent";
import { ToastContainer } from "@/components/toasts/ToastContainer";
import { ToastProvider } from "@/components/toasts/ToastContext";

export default function TenCentTeacake({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <Sentry.ErrorBoundary fallback={ErrorComponent}>
      <ToastProvider>
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Layout>
                <Component className="h-full" {...pageProps} />
                <ToastContainer />
              </Layout>
            </Hydrate>
          </QueryClientProvider>
        </UserProvider>
      </ToastProvider>
    </Sentry.ErrorBoundary>
  );
}
