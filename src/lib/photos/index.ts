import { Photo } from ".prisma/client";

import { AxiosResponse } from "axios";
import dayjs from "dayjs";

import {
  axiosInstance,
  revalidationAxiosInstance,
} from "../axios/axiosInstance";
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
  const { data: photo } = await revalidationAxiosInstance.put<
    { data: UploadedPhotoFormData },
    AxiosResponse<Photo>
  >(`/api/${routes.photos}`, { data });
  return { photo };
};

export const patchPhoto = async ({
  id,
  data,
}: PhotoPatchArgs): Promise<PhotoResponse> => {
  const { data: photo } = await revalidationAxiosInstance.patch<
    { data: PhotoPatchData },
    AxiosResponse<Photo>
  >(`/api/${routes.photos}/${id}`, { data });
  return { photo };
};

export const deletePhoto = async (id: number): Promise<void> =>
  revalidationAxiosInstance.delete(`/api/${routes.photos}/${id}`);

export const getPhotoDate = (photo: PhotoWithShowAndVenue): Date => {
  if (photo.show) {
    return new Date(photo.show.performAt);
  }
  if (photo.takenAt) {
    return photo.takenAt;
  }
  return photo.createdAt;
};

export const sortPhotos = (photos: Array<PhotoWithShowAndVenue>) =>
  photos.sort((a, b) => {
    const photoDateA = dayjs(getPhotoDate(a)).unix();
    const photoDateB = dayjs(getPhotoDate(b)).unix();
    if (photoDateA === photoDateB) {
      // Filename is only important when dates are the same
      return a.imagePath.localeCompare(b.imagePath);
    }
    return photoDateA < photoDateB ? 1 : -1;
  });
