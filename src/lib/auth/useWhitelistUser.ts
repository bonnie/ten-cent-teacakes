import { UserProfile, useUser } from "@auth0/nextjs-auth0";
import { useState } from "react";
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

  useQuery(
    queryKeys.whitelist,
    async () => {
      const { data } = await axiosInstance.get<WhitelistResponse>(
        "/api/auth/whitelist",
      );
      return data;
    },
    {
      staleTime: 3000,
      cacheTime: 3000,
      onSuccess: (data: WhitelistResponse) => {
        const whitelisted =
          data.whitelist.length === 0 ||
          (auth0User?.email && data.whitelist.includes(auth0User?.email));
        setUser(whitelisted ? user : undefined);
        if (auth0User?.email && !whitelisted) {
          showToast("warning", `${auth0User?.email} not authorized`);
        }
      },
    },
  );

  return { user };
};
