import { UseMutateFunction, useMutation } from "react-query";

import { useToast } from "@/components/toasts/useToast";
import {
  addUploadedPhoto,
  deletePhoto,
  patchPhoto,
  PhotoResponse,
} from "@/lib/photos";
import { PhotoPatchArgs, UploadedPhotoFormData } from "@/lib/photos/types";
import { queryKeys } from "@/lib/react-query/query-keys";
import { useHandleError } from "@/lib/react-query/useHandleError";

type UsePhotosReturnValue = {
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
};

export const usePhotos = (): UsePhotosReturnValue => {
  const { showToast } = useToast();
  const { handleMutateError } = useHandleError();

  const { mutate: addUploadedPhotoMutate } = useMutation(
    queryKeys.photos,
    addUploadedPhoto,
    {
      onSuccess: () => {
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
        showToast("success", `You have deleted the photo`);
      },
      onError: (error) => handleMutateError(error, "delete photo"),
    },
  );

  const { mutate: updatePhoto } = useMutation(queryKeys.photos, patchPhoto, {
    onSuccess: () => {
      showToast("success", "You have updated the photo");
    },
    onError: (error) => handleMutateError(error, "update photo"),
  });

  return {
    addUploadedPhoto: addUploadedPhotoMutate,
    updatePhoto,
    deletePhoto: deletePhotoMutate,
  };
};
