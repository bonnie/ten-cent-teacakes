import { WhitelistResponse } from "@/lib/auth/types";
import { axiosInstance } from "@/lib/axios/axiosInstance";

export const validateUser = async (userEmail: string) => {
  const { data } = await axiosInstance.get<WhitelistResponse>(
    "/api/auth/whitelist",
  );
  const userIsValid =
    data.whitelist.length === 0 || data.whitelist.includes(userEmail);
  if (!userIsValid) {
    window.location.replace("/api/auth/logout");
  }
};
