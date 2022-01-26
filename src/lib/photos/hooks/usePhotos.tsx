import { useMemo } from "react";
import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

import { useToast } from "@/components/toasts/useToast";
import {
  addPhoto,
  deletePhoto,
  fetchPhotos,
  getPhotoDate,
  patchPhoto,
  PhotoResponse,
} from "@/lib/photos";
import {
  PhotoFormData,
  PhotoPatchArgs,
  PhotoWithShowAndVenue,
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
  addPhoto: UseMutateFunction<PhotoResponse, unknown, PhotoFormData, unknown>;
  deletePhoto: UseMutateFunction<void, unknown, number, unknown>;
  updatePhoto: UseMutateFunction<
    PhotoResponse,
    unknown,
    PhotoPatchArgs,
    unknown
  >;
  nextAndPrevIndexes: NextAndPrevObject;
};

export const usePhotos = (): UsePhotosReturnValue => {
  const { showToast } = useToast();
  const { handleQueryError, handleMutateError } = useHandleError();
  const { data: photos = [] } = useQuery<Array<PhotoWithShowAndVenue>>(
    queryKeys.photos,
    fetchPhotos,
    {
      onError: handleQueryError,
      select: (photos) =>
        photos.sort((a, b) => (getPhotoDate(a) > getPhotoDate(b) ? -1 : 1)),
    },
  );

  // got inconsistent results in Firefox vs. Chrome calculating this using
  // onSuccess in useQuery; one used sorted data, the other didn't.
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

  const { mutate: addPhotoMutate } = useMutation(queryKeys.photos, addPhoto, {
    onSuccess: () => {
      invalidatePhotos();
      showToast("success", "You have added a photo");
    },
    onError: (error) => handleMutateError(error, "add photo"),
  });

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
    addPhoto: addPhotoMutate,
    updatePhoto,
    deletePhoto: deletePhotoMutate,
    nextAndPrevIndexes,
  };
};
