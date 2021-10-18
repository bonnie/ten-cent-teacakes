import { Musician, Show } from ".prisma/client";

import { instance } from "./axiosInstance";
import { routes } from "./types";

export const fetchShows = async (): Promise<Array<Show>> => {
  const { data } = await instance.get(`/api/${routes.shows}`);
  return data;
};

export type InstrumentName = { name: string };
export type MusicianWithInstruments = Musician & {
  instruments: Array<InstrumentName>;
};
export const fetchMusiciansWithInstruments = async (): Promise<
  Array<MusicianWithInstruments>
> => {
  const { data } = await instance.get(`/api/${routes.musicians}`);
  return data;
};
