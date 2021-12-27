import { Show, Venue } from ".prisma/client";

import { AxiosError, AxiosResponse } from "axios";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { axiosInstance } from "../axios/axiosInstance";
import { routes } from "../axios/constants";

dayjs.extend(utc);
dayjs.extend(timezone);

/* * types * */
export type ShowWithVenue = Show & {
  venue: Venue;
};

export type ShowResponse = { show: Show };

export type ShowFormData = {
  venueId: number | undefined;
  performDate: string;
  performTime: string;
  url?: string;
};

export type ShowPutData = { performAt: Date; venueId?: number; url?: string };

export type ShowPatchData = {
  performAt?: Date;
  venueId?: number;
  url?: string;
};
export type ShowPatchArgs = {
  id: number;
  data: ShowPatchData;
};

/* * methods * */
export const fetchShows = async (): Promise<Array<ShowWithVenue>> => {
  const { data } = await axiosInstance.get(`/api/${routes.shows}`);
  return data;
};

export const addShow = async (data: ShowPutData): Promise<ShowResponse> => {
  // try {
  const { data: show } = await axiosInstance.put<
    { body: ShowPutData },
    AxiosResponse<Show>
  >(`/api/${routes.shows}`, { body: data });
  return { show };
  // } catch (error: AxiosResponse) {
  //   console.log(error.response.data.message);
  // }
};

export const patchShow = async ({
  id,
  data,
}: ShowPatchArgs): Promise<ShowResponse> => {
  const { data: show } = await axiosInstance.patch<
    { body: ShowPatchData },
    AxiosResponse<Show>
  >(`/api/${routes.shows}/${id}`, { body: data });
  return { show };
};

export const deleteShow = async (id: number): Promise<void> =>
  axiosInstance.delete(`/api/${routes.shows}/${id}`);

/* *form helpers */
export const getShowDateFieldValues = (
  performAt: Date,
): { performDate: string; performTime: string } => ({
  performDate: dayjs(performAt).format("YYYY-MM-DD"),
  performTime: dayjs(performAt).format("HH:MM"),
});

export const getShowDateTimeFromForm = (values: ShowFormData): Date => {
  const timeZone = "America/Los_Angeles";

  return dayjs
    .tz(`${values.performDate} ${values.performTime}`, timeZone)
    .toDate();
};
