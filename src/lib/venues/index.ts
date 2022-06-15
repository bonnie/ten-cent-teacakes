import { Venue } from ".prisma/client";

import { AxiosResponse } from "axios";

import {
  axiosInstance,
  revalidationAxiosInstance,
} from "../axios/axiosInstance";
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
  const { data: venue } = await revalidationAxiosInstance.put<
    { data: VenuePutData },
    AxiosResponse<VenueWithShowCount>
  >(`/api/${routes.venues}`, {
    data,
  });
  return { venue };
};

export const patchVenue = async ({
  id,
  data,
}: VenuePatchArgs): Promise<VenuePatchResponse> => {
  const { data: venue } = await revalidationAxiosInstance.patch<
    { data: VenuePutData },
    AxiosResponse<Venue>
  >(`/api/${routes.venues}/${id}`, {
    data,
  });
  return { venue };
};

export const deleteVenue = async (id: number): Promise<void> =>
  revalidationAxiosInstance.delete(`/api/${routes.venues}/${id}`);
