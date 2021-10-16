import { Musician, Show } from ".prisma/client";

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

export type InstrumentName = { name: string };
export type MusicianWithInstruments = Musician & {
  instruments: Array<InstrumentName>;
};
export const fetchMusiciansWithInstruments = async (): Promise<
  Array<MusicianWithInstruments>
> => {
  try {
    const { data } = await instance.get(`/api/${routes.musicians}`);
    return data;
  } catch (error) {
    // TODO: show error here
    return [];
  }
};
