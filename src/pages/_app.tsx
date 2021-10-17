/* eslint-disable react/jsx-props-no-spreading */
import "tailwindcss/tailwind.css";
import "@/styles/globals.css";

import { AppProps } from "next/app";
import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

import { Layout } from "@/components/Layout";
import { ToastProvider } from "@/components/toasts/ToastContext";

export default function TenCentTeacake({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component className="h-full" {...pageProps} />
          </Layout>
        </Hydrate>
      </ToastProvider>
    </QueryClientProvider>
  );
}
