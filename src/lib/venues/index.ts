import { Venue } from ".prisma/client";

import { AxiosResponse } from "axios";

import { axiosInstance } from "../axios/axiosInstance";
import { routes } from "../axios/constants";

/* * types * */
export type VenueResponse = { venue: Venue };

export type VenuePutData = { name: string; url?: string };

export type VenuePatchData = {
  body: VenuePutData;
  id: number;
};

export type VenuePatchArgs = {
  id: number;
  data: VenuePatchData;
};

/* * methods * */
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

export const deleteVenue = async (id: number): Promise<void> =>
  axiosInstance.delete(`/api/${routes.venues}/${id}`);
