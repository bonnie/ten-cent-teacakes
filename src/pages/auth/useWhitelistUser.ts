import { UserProfile, useUser } from "@auth0/nextjs-auth0";

import { useToast } from "@/components/toasts/useToast";

export const userInWhitelist = (user: UserProfile) => {
  const whitelistJSON = process.env.AUTH0_WHITELIST;
  const whitelist = whitelistJSON ? JSON.parse(whitelistJSON) : null;
  return whitelist && !whitelist.contains(user?.email);
};

type WhiteListUser = UserProfile | null;

export const useWhitelistUser = (): WhiteListUser => {
  const { showToast } = useToast();
  const { user } = useUser();

  if (!user) return null;

  if (!userInWhitelist(user)) {
    showToast("warning", `${user?.email} not authorized`);
    return null;
  }

  return user;
};
