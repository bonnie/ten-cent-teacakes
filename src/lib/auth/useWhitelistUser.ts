import { UserProfile, useUser } from "@auth0/nextjs-auth0";
import * as Sentry from "@sentry/browser";
import { useState } from "react";
import { useQuery } from "react-query";

import { useToast } from "@/components/toasts/useToast";
import { WhitelistResponse } from "@/lib/auth/types";
import { axiosInstance } from "@/lib/axios/axiosInstance";
import { queryKeys } from "@/lib/react-query/query-keys";

type WhitelistUser = UserProfile | undefined;
type WhitelistUserReturn = { user: UserProfile | undefined };

export const useWhitelistUser = (): WhitelistUserReturn => {
  const auth0 = useUser();
  const [user, setUser] = useState<WhitelistUser>();
  const { showToast } = useToast();

  const auth0User = auth0.user;
  console.log("*******AUTH0", auth0);

  useQuery(
    queryKeys.whitelist,
    async () => {
      const { data } = await axiosInstance.get<WhitelistResponse>(
        "/api/auth/whitelist",
      );
      return data;
    },
    {
      onSuccess: (data: WhitelistResponse) => {
        const whitelisted =
          data.whitelist.length === 0 ||
          (auth0User?.email && data.whitelist.includes(auth0User?.email));
        setUser(whitelisted ? auth0User : undefined);
        if (auth0User?.email && !whitelisted) {
          Sentry.captureMessage(
            `unauthorized login: ${auth0User.email}`,
            Sentry.Severity.Warning,
          );
          showToast("warning", `${auth0User.email} not authorized`);
          Sentry.configureScope((scope) => scope.setUser(null));
        } else if (auth0User?.email) {
          Sentry.setUser({ email: auth0User.email });
          Sentry.captureMessage(
            `Login: ${auth0User.email}`,
            Sentry.Severity.Info,
          );
        } else {
          Sentry.configureScope((scope) => scope.setUser(null));
        }
      },
    },
  );

  return { user };
};
