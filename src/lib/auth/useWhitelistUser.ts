import { UserProfile, useUser } from "@auth0/nextjs-auth0";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { ToastFunction, useToast } from "@/components/toasts/useToast";
import { WhitelistResponse } from "@/lib/auth/types";
import { axiosInstance } from "@/lib/axios/axiosInstance";

type WhitelistUser = UserProfile | undefined;
type WhitelistUserReturn = { user: UserProfile | undefined };

const updateWhitelistUser = async (
  user: WhitelistUser,
  setUser: Dispatch<SetStateAction<WhitelistUser | undefined>>,
  showToast: ToastFunction,
) => {
  const { data } = await axiosInstance.get<WhitelistResponse>(
    "/api/auth/whitelist",
  );
  const whitelisted =
    data.whitelist.length === 0 ||
    (user?.email && data.whitelist.includes(user?.email));

  setUser(whitelisted ? user : undefined);
  if (user?.email && !whitelisted) {
    showToast("warning", `${user?.email} not authorized`);
  }
};

export const useWhitelistUser = (): WhitelistUserReturn => {
  const { user: auth0User } = useUser();
  const [user, setUser] = useState<WhitelistUser>();
  const { showToast } = useToast();

  useEffect(() => {
    updateWhitelistUser(auth0User, setUser, showToast);
  }, [showToast, auth0User]);

  return { user };
};
