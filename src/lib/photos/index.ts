import { Photo } from ".prisma/client";

import { AxiosResponse } from "axios";

import { axiosInstance } from "../axios/axiosInstance";
import { routes } from "../axios/constants";
import {
  PhotoFormData,
  PhotoPatchArgs,
  PhotoPatchData,
  PhotoWithShowAndVenue,
} from "./types";

export type PhotoResponse = { photo: Photo };

/* * methods * */
export const fetchPhotos = async (): Promise<Array<PhotoWithShowAndVenue>> => {
  const { data } = await axiosInstance.get(`/api/${routes.photos}`);
  return data;
};

export const addPhoto = async (data: PhotoFormData): Promise<PhotoResponse> => {
  const formData = new FormData();
  if (!data.photoFile) throw new Error("Can't create; no photo file");
  formData.set("photoFile", data.photoFile);
  if (data.showId) formData.set("showId", data.showId.toString());
  if (data.photographer) formData.set("photographer", data.photographer);
  const { data: photo } = await axiosInstance.put<
    FormData,
    AxiosResponse<Photo>
  >(`/api/${routes.photos}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return { photo };
};

export const patchPhoto = async ({
  id,
  data,
}: PhotoPatchArgs): Promise<PhotoResponse> => {
  const { data: photo } = await axiosInstance.patch<
    { data: PhotoPatchData },
    AxiosResponse<Photo>
  >(`/api/${routes.photos}/${id}`, { data });
  return { photo };
};

export const deletePhoto = async (id: number): Promise<void> =>
  axiosInstance.delete(`/api/${routes.photos}/${id}`);

export const getPhotoDate = (photo: PhotoWithShowAndVenue): Date => {
  if (photo.show) {
    return new Date(photo.show.performAt);
  }
  return photo.createdAt;
};