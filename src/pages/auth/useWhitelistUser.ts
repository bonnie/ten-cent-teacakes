import { UserProfile, useUser } from "@auth0/nextjs-auth0";

import { useToast } from "@/components/toasts/useToast";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { WhitelistResponse } from "@/lib/auth/types";

export const userInWhitelist = async (userEmail: string) => {
  const { data } = await axiosInstance.get<WhitelistResponse>(
    "/api/auth/whitelist",
  );
  return data.whitelist.length === 0 || data.whitelist.includes(userEmail);
};

type WhitelistUser = { user: UserProfile | null };

export const useWhitelistUser = async (): Promise<WhitelistUser> => {
  const { showToast } = useToast();
  const { user } = useUser();

  if (!user) return { user: null };

  if (user.email && !(await userInWhitelist(user.email))) {
    // showToast("warning", `${user?.email} not authorized`);
    // window.location.replace("/api/auth/logout");
    return { user: null };
  }

  return { user };
};
