import { Musician, Show, Venue } from ".prisma/client";

import { AxiosResponse } from "axios";

import { VenuePatchData, VenuePutData } from "@/pages/api/venues/queries";

import { axiosInstance } from "./axiosInstance";
import { routes } from "./types";

export type ShowWithVenue = Show & {
  venue: Venue;
};

export type VenueResponse = { venue: Venue };

export const fetchShows = async (): Promise<Array<ShowWithVenue>> => {
  const { data } = await axiosInstance.get(`/api/${routes.shows}`);
  return data;
};

export const fetchVenues = async (): Promise<Array<Venue>> => {
  const { data } = await axiosInstance.get(`/api/${routes.venues}`);
  return data;
};

export const addVenue = async (data: VenuePutData): Promise<VenueResponse> => {
  const { data: venue } = await axiosInstance.put<
    { body: VenuePutData },
    AxiosResponse<Venue>
  >(`/api/${routes.venues}`, { body: data });
  return { venue };
};

export const deleteVenue = async (id: number): Promise<void> =>
  axiosInstance.delete(`/api/${routes.venues}/${id}`);

export type VenuePatchArgs = {
  id: number;
  data: VenuePatchData;
};

export const patchVenue = async ({
  id,
  data,
}: VenuePatchArgs): Promise<VenueResponse> => {
  const { data: venue } = await axiosInstance.patch<
    { body: VenuePatchData },
    AxiosResponse<Venue>
  >(`/api/${routes.venues}/${id}`, { body: data });
  return { venue };
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
