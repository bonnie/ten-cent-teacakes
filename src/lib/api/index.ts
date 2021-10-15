import { Show } from ".prisma/client";

import { instance } from "./axiosInstance";
import { routes } from "./types";

export const fetchShows = async (): Promise<Array<Show>> => {
  try {
    const { data } = await instance.get(`/api/${routes.shows}`);
    return data;
  } catch (error) {
    // TODO: show error here
    return [];
  }
};
