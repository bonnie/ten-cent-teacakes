import { UserProfile, useUser } from "@auth0/nextjs-auth0";
import * as Sentry from "@sentry/browser";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { useToast } from "@/components/toasts/useToast";
import { WhitelistResponse } from "@/lib/auth/types";
import { axiosInstance } from "@/lib/axios/axiosInstance";
import { queryKeys } from "@/lib/react-query/query-keys";

type WhitelistUser = UserProfile | undefined;
type WhitelistUserReturn = { user: UserProfile | undefined };

export const useWhitelistUser = (): WhitelistUserReturn => {
  const { user: auth0User } = useUser();
  const [user, setUser] = useState<WhitelistUser>();
  const { showToast } = useToast();

  const [cypressUser, setCypressUser] = useState<UserProfile | undefined>();
  // window / localstorage only accessible from useEffect in Next.js
  useEffect(() => {
    // @ts-ignore
    if (window.Cypress && process.env.CYPRESS_LOCALSTORAGE_KEY) {
      // If under test in Cypress, get credentials from localstorage item
      // adapted from:
      // https://docs.cypress.io/guides/testing-strategies/auth0-authentication#Adapting-the-front-end
      const auth0 = JSON.parse(
        localStorage.getItem(process.env.CYPRESS_LOCALSTORAGE_KEY)!,
      );
      if (auth0?.body?.decodedToken?.user)
        setCypressUser(auth0.body.decodedToken.user);
    }
  }, []);

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
        const workingUser = cypressUser ?? auth0User;
        const email = workingUser?.email;
        const whitelisted =
          data.whitelist.length === 0 ||
          (email && data.whitelist.includes(email));
        setUser(whitelisted ? workingUser : undefined);
        if (!cypressUser) {
          // don't bother logging during testing!
          if (email && !whitelisted) {
            Sentry.captureMessage(`unauthorized login: ${email}`, "warning");
            showToast("warning", `${email} not authorized`);
            Sentry.configureScope((scope) => scope.setUser(null));
          } else if (email) {
            Sentry.setUser({ email });
            Sentry.captureMessage(`Login: ${email}`, "info");
          } else {
            Sentry.configureScope((scope) => scope.setUser(null));
          }
        }
      },
    },
  );

  return { user };
};

// TODO: disable Sentry in general for tests
