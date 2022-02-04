import { QueryClient } from "react-query";

export const defaultQueryClientOptions = {
  queries: {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },
};

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: defaultQueryClientOptions,
  });
