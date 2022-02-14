import { Photo } from ".prisma/client";

import { AxiosResponse } from "axios";

import { axiosInstance } from "../axios/axiosInstance";
import { routes } from "../axios/constants";
import {
  PhotoPatchArgs,
  PhotoPatchData,
  PhotoWithShowAndVenue,
  UploadedPhotoFormData,
} from "./types";

export type PhotoResponse = { photo: Photo };

/* * methods * */
export const fetchPhotos = async (
  signal?: AbortSignal,
): Promise<Array<PhotoWithShowAndVenue>> => {
  const { data } = await axiosInstance.get(`/api/${routes.photos}`, { signal });
  return data;
};

export const fetchPhoto = async (
  photoId: number,
): Promise<PhotoWithShowAndVenue> => {
  if (Number.isNaN(photoId))
    throw Error(`Could not get number from photoId ${photoId}`);
  const { data } = await axiosInstance.get(`/api/${routes.photos}/${photoId}`);
  return data;
};

export const addUploadedPhoto = async (
  data: UploadedPhotoFormData,
): Promise<PhotoResponse> => {
  if (!data.imagePath) throw new Error("Can't create; no photo path");
  const { data: photo } = await axiosInstance.put<
    UploadedPhotoFormData,
    AxiosResponse<Photo>
  >(`/api/${routes.photos}`, data);
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
  if (photo.takenAt) {
    return photo.takenAt;
  }
  return photo.createdAt;
};
