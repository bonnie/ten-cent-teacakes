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
  };
};