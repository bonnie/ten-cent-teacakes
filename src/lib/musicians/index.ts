import { Musician } from "@prisma/client";

import { AxiosResponse } from "axios";

import { axiosInstance } from "../axios/axiosInstance";
import { routes } from "../axios/constants";
import {
  MusicianFormData,
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

const createFormData = (rawData: MusicianFormData): FormData => {
  const formData = new FormData();
  if (rawData.imageFile) formData.set("imageFile", rawData.imageFile);
  if (rawData.firstName) formData.set("firstName", rawData.firstName);
  if (rawData.lastName) formData.set("lastName", rawData.lastName);
  if (rawData.bio) formData.set("bio", rawData.bio);
  if (rawData.instrumentIds)
    formData.set("instrumentIds", JSON.stringify(rawData.instrumentIds));

  return formData;
};

export const addMusician = async (
  data: MusicianFormData,
): Promise<MusicianResponse> => {
  const formData = createFormData(data);
  const { data: musician } = await axiosInstance.put<
    FormData,
    AxiosResponse<Musician>
  >(`/api/${routes.musicians}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return { musician };
};

export const patchMusician = async ({
  id,
  data,
}: MusicianPatchArgs): Promise<MusicianResponse> => {
  const { data: musician } = await axiosInstance.patch<
    { data: MusicianPutData },
    AxiosResponse<Musician>
  >(`/api/${routes.musicians}/${id}`, { data });

  return { musician };
};

export const deleteMusician = async (id: number): Promise<void> =>
  axiosInstance.delete(`/api/${routes.musicians}/${id}`);
