import { Musician, Show, Venue } from ".prisma/client";

import { axiosInstance } from "./axiosInstance";
import { routes } from "./types";

export type ShowWithVenue = Show & {
  venue: Venue;
};

export const fetchShows = async (): Promise<Array<ShowWithVenue>> => {
  const { data } = await axiosInstance.get(`/api/${routes.shows}`);
  return data;
};

export const fetchVenues = async (): Promise<Array<Venue>> => {
  const { data } = await axiosInstance.get(`/api/${routes.venues}`);
  return data;
};

export type InstrumentName = { name: string };
export type MusicianWithInstruments = Musician & {
  instruments: Array<InstrumentName>;
};
export const fetchMusiciansWithInstruments = async (): Promise<
  Array<MusicianWithInstruments>
> => {
  const { data } = await axiosInstance.get(`/api/${routes.musicians}`);
  return data;
};
