import { Musician } from "@prisma/client";

import { AxiosResponse } from "axios";

import {
  axiosInstance,
  revalidationAxiosInstance,
} from "../axios/axiosInstance";
import { routes } from "../axios/constants";
import {
  MusicianPatchArgs,
  MusicianPutData,
  MusicianResponse,
  MusicianWithInstruments,
} from "./types";

/* * methods * */
export const fetchMusiciansWithInstruments = async (
  signal?: AbortSignal,
): Promise<Array<MusicianWithInstruments>> => {
  const { data } = await axiosInstance.get(`/api/${routes.musicians}`, {
    signal,
  });
  return data;
};

export const addMusician = async (
  data: MusicianPutData,
): Promise<MusicianResponse> => {
  const { data: musician } = await revalidationAxiosInstance.put<
    { data: MusicianPutData },
    AxiosResponse<Musician>
  >(`/api/${routes.musicians}`, { data });

  return { musician };
};

export const patchMusician = async ({
  id,
  data,
}: MusicianPatchArgs): Promise<MusicianResponse> => {
  const { data: musician } = await revalidationAxiosInstance.patch<
    { data: MusicianPutData },
    AxiosResponse<Musician>
  >(`/api/${routes.musicians}/${id}`, { data });

  return { musician };
};

export const deleteMusician = async (id: number): Promise<void> =>
  revalidationAxiosInstance.delete(`/api/${routes.musicians}/${id}`);
