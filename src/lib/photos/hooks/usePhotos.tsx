import dayjs from "dayjs";
import { useMemo } from "react";
import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

import { useToast } from "@/components/toasts/useToast";
import {
  addUploadedPhoto,
  deletePhoto,
  fetchPhotos,
  getPhotoDate,
  patchPhoto,
  PhotoResponse,
} from "@/lib/photos";
import {
  PhotoPatchArgs,
  PhotoWithShowAndVenue,
  UploadedPhotoFormData,
} from "@/lib/photos/types";
import { queryKeys } from "@/lib/react-query/query-keys";
import { useHandleError } from "@/lib/react-query/useHandleError";

export type NextAndPrev = {
  next: number | null;
  prev: number | null;
};
export type NextAndPrevObject = Record<number, NextAndPrev>;

type UsePhotosReturnValue = {
  photos: Array<PhotoWithShowAndVenue>;
  addUploadedPhoto: UseMutateFunction<
    PhotoResponse,
    unknown,
    UploadedPhotoFormData,
    unknown
  >;
  deletePhoto: UseMutateFunction<void, unknown, number, unknown>;
  updatePhoto: UseMutateFunction<
    PhotoResponse,
    unknown,
    PhotoPatchArgs,
    unknown
  >;
  nextAndPrevIndexes: NextAndPrevObject;
};

const sortPhotos = (photos: Array<PhotoWithShowAndVenue>) =>
  photos.sort((a, b) => {
    const photoDateA = dayjs(getPhotoDate(a)).unix();
    const photoDateB = dayjs(getPhotoDate(b)).unix();
    if (photoDateA === photoDateB) {
      // Filename is only important when dates are the same
      return a.imagePath.localeCompare(b.imagePath);
    }
    return photoDateA < photoDateB ? 1 : -1;
  });

export const usePhotos = (): UsePhotosReturnValue => {
  const { showToast } = useToast();
  const { handleQueryError, handleMutateError } = useHandleError();
  const { data: photos = [] } = useQuery<Array<PhotoWithShowAndVenue>>(
    queryKeys.photos,
    ({ signal }) => fetchPhotos(signal),
    {
      onError: handleQueryError,
      select: sortPhotos,
    },
  );

  const nextAndPrevIndexes = useMemo(() => {
    const tempNextAndPrev: NextAndPrevObject = [];
    photos.forEach((photo, index) => {
      tempNextAndPrev[photo.id] = {
        next: photos[index + 1] ? photos[index + 1].id : null,
        prev: photos[index - 1] ? photos[index - 1].id : null,
      };
    });
    return tempNextAndPrev;
  }, [photos]);

  const queryClient = useQueryClient();
  const invalidatePhotos = () =>
    queryClient.invalidateQueries([queryKeys.photos]);

  const { mutate: addUploadedPhotoMutate } = useMutation(
    queryKeys.photos,
    addUploadedPhoto,
    {
      onSuccess: () => {
        invalidatePhotos();
        showToast("success", "You have added a photo");
      },
      onError: (error) => handleMutateError(error, "add photo"),
    },
  );

  const { mutate: deletePhotoMutate } = useMutation(
    queryKeys.photos,
    deletePhoto,
    {
      onSuccess: () => {
        invalidatePhotos();
        showToast("success", `You have deleted the photo`);
      },
      onError: (error) => handleMutateError(error, "delete photo"),
    },
  );

  const { mutate: updatePhoto } = useMutation(queryKeys.photos, patchPhoto, {
    onSuccess: () => {
      invalidatePhotos();
      showToast("success", "You have updated the photo");
    },
    onError: (error) => handleMutateError(error, "update photo"),
  });

  return {
    photos,
    addUploadedPhoto: addUploadedPhotoMutate,
    updatePhoto,
    deletePhoto: deletePhotoMutate,
    nextAndPrevIndexes,
  };
};
