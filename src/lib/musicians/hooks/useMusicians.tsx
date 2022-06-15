import { UseMutateFunction, useMutation } from "react-query";

import { useToast } from "@/components/toasts/useToast";
import { addMusician, deleteMusician, patchMusician } from "@/lib/musicians";
import {
  MusicianPatchArgs,
  MusicianPutData,
  MusicianResponse,
} from "@/lib/musicians/types";
import { queryKeys } from "@/lib/react-query/query-keys";
import { useHandleError } from "@/lib/react-query/useHandleError";

type UseMusiciansReturnValue = {
  // musicians: Array<MusicianWithInstruments>;
  addMusician: UseMutateFunction<
    MusicianResponse,
    unknown,
    MusicianPutData,
    unknown
  >;
  deleteMusician: UseMutateFunction<void, unknown, number, unknown>;
  updateMusician: UseMutateFunction<
    MusicianResponse,
    unknown,
    MusicianPatchArgs,
    unknown
  >;
};

export const useMusicians = (): UseMusiciansReturnValue => {
  const { showToast } = useToast();
  const { handleMutateError } = useHandleError();

  const { mutate: addMusicianMutate } = useMutation(
    queryKeys.musicians,
    addMusician,
    {
      onSuccess: () => {
        showToast("success", "You have added a musician");
      },
      onError: (error) => handleMutateError(error, "add musician"),
    },
  );

  const { mutate: deleteMusicianMutate } = useMutation(
    queryKeys.musicians,
    deleteMusician,
    {
      onSuccess: () => {
        showToast("success", "You have deleted the musician");
      },
      onError: (error) => handleMutateError(error, "delete musician"),
    },
  );

  const { mutate: updateMusician } = useMutation(
    queryKeys.musicians,
    patchMusician,
    {
      onSuccess: () => {
        showToast("success", "You have updated the musician");
      },
      onError: (error) => handleMutateError(error, "update musician"),
    },
  );

  return {
    addMusician: addMusicianMutate,
    updateMusician,
    deleteMusician: deleteMusicianMutate,
  };
};
