import { Venue } from ".prisma/client";

import { AxiosResponse } from "axios";

import { axiosInstance } from "../axios/axiosInstance";
import { routes } from "../axios/constants";
import {
  VenuePatchArgs,
  VenuePatchResponse,
  VenuePutData,
  VenueResponse,
  VenueWithShowCount,
} from "./types";

/* * methods * */
export const fetchVenues = async (): Promise<Array<VenueWithShowCount>> => {
  const { data } = await axiosInstance.get(`/api/${routes.venues}`);
  return data;
};

export const addVenue = async (data: VenuePutData): Promise<VenueResponse> => {
  const { data: venue } = await axiosInstance.put<
    { body: VenuePutData },
    AxiosResponse<VenueWithShowCount>
  >(`/api/${routes.venues}`, { body: data });
  return { venue };
};

export const patchVenue = async ({
  id,
  data,
}: VenuePatchArgs): Promise<VenuePatchResponse> => {
  const { data: venue } = await axiosInstance.patch<
    { body: VenuePutData },
    AxiosResponse<Venue>
  >(`/api/${routes.venues}/${id}`, { body: data });
  return { venue };
};

export const deleteVenue = async (id: number): Promise<void> =>
  axiosInstance.delete(`/api/${routes.venues}/${id}`);
