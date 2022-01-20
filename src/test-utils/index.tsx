/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import { UserProvider } from "@auth0/nextjs-auth0";
import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from "@testing-library/react";
import React, { ReactElement, ReactNode } from "react";
import {
  DefaultOptions,
  QueryClient,
  QueryClientProvider,
  setLogger,
} from "react-query";

import { ToastProvider } from "@/components/toasts/ToastContext";
import { defaultQueryClientOptions } from "@/lib/react-query/query-client";

type CustomRenderOptions = {
  testQueryClient?: QueryClient;
  renderOptions?: Omit<RenderOptions, "wrapper">;
};

// suppress errors written to console
setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {
    // swallow the errors
  },
});

const defaultOptions: DefaultOptions = defaultQueryClientOptions;
if (defaultOptions && defaultOptions.queries)
  defaultOptions.queries.retry = false;

// make this a function for unique queryClient per test
const generateQueryClient = () => new QueryClient({ defaultOptions });

function render(
  ui: React.ReactElement,
  { testQueryClient, ...renderOptions }: CustomRenderOptions,
): RenderResult {
  function Wrapper({ children }: { children?: ReactNode }): ReactElement {
    const queryClient = testQueryClient ?? generateQueryClient();
    return (
      <ToastProvider>
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </UserProvider>
      </ToastProvider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// from https://tkdodo.eu/blog/testing-react-query#for-custom-hooks
// export const createWrapper = () => {
//   const queryClient = new QueryClient({
//     defaultOptions: defaultQueryClientOptions,
//   });
//   return ({ children }: { children: React.ReactNode }) => (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );
// };

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
