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
  addUploadedPhoto,
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
  addPhoto: UseMutateFunction<PhotoResponse, unknown, PhotoFormData, unknown>;
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

export const usePhotos = (): UsePhotosReturnValue => {
  const { showToast } = useToast();
  const { handleQueryError, handleMutateError } = useHandleError();
  const { data: photos = [] } = useQuery<Array<PhotoWithShowAndVenue>>(
    queryKeys.photos,
    ({ signal }) => fetchPhotos(signal),
    {
      // onSuccess: (data) => {
      //   console.log("PHOTOS DATA", data);
      //   // TODO: figure out why react query gets confused if you switch
      //   // back and forth too quickly between "photos" and "band"
      //   if (data.length > 0 && data[0].bio) {
      //     // queryClient.fetchQuery(queryKeys.photos, fetchPhotos);
      //     // queryClient.invalidateQueries(queryKeys.photos);
      //     // queryClient.invalidateQueries(queryKeys.musicians, {
      //     //   refetchInactive: true,
      //     // });
      //   }
      // },
      // onSuccess: (data) => {
      // console.log("REFRESHING PAGE FOM PHOT");
      // if (data[0] && data[0].bio) {
      //   throw Error("shit messed up");
      // setInterval(() => {
      //   console.log("INVALIDATING PHOTOS");
      //   // queryClient.invalidateQueries([
      //   //   queryKeys.photos,
      //   //   queryKeys.musicians,
      //   // ]);
      // }, 500);
      // onlineManager.setOnline(false);
      // onlineManager.setOnline(true);
      // console.log("CLEARING CLIENT");
      // queryClient.clear();
      //     window.location.reload();
      // }
      // },
      onError: handleQueryError,
      // TODO: this sort isn't working so well
      // or maybe display isn't working so well?
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
    addPhoto: addPhotoMutate,
    addUploadedPhoto: addUploadedPhotoMutate,
    updatePhoto,
    deletePhoto: deletePhotoMutate,
    nextAndPrevIndexes,
  };
};
