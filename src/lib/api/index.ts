import { Event } from ".prisma/client";

import { instance } from "./axiosInstance";
import { routes } from "./types";

export const fetchEvents = async (): Promise<Array<Event>> => {
  try {
    const { data } = await instance.get(`/api/${routes.events}`);
    return data;
  } catch (error) {
    // TODO: show error here
    return [];
  }
};
