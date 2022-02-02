import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

import { useToast } from "@/components/toasts/useToast";
import {
  addMusician,
  deleteMusician,
  fetchMusiciansWithInstruments,
  patchMusician,
} from "@/lib/musicians";
import {
  MusicianPatchArgs,
  MusicianPutData,
  MusicianResponse,
  MusicianWithInstruments,
} from "@/lib/musicians/types";
import { queryKeys } from "@/lib/react-query/query-keys";
import { useHandleError } from "@/lib/react-query/useHandleError";

type UseMusiciansReturnValue = {
  musicians: Array<MusicianWithInstruments>;
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
  const { handleQueryError, handleMutateError } = useHandleError();
  const queryClient = useQueryClient();

  const { data: musicians = [] } = useQuery<Array<MusicianWithInstruments>>(
    queryKeys.musicians,
    ({ signal }) => fetchMusiciansWithInstruments(signal),
    {
      onError: handleQueryError,
    },
  );

  const invalidateMusicians = () =>
    queryClient.invalidateQueries([queryKeys.musicians]);

  const { mutate: addMusicianMutate } = useMutation(
    queryKeys.musicians,
    addMusician,
    {
      onSuccess: () => {
        invalidateMusicians();
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
        invalidateMusicians();
        // invalidate instruments since musician counts will have changed
        queryClient.invalidateQueries(queryKeys.instruments);
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
        invalidateMusicians();
        showToast("success", "You have updated the musician");
      },
      onError: (error) => handleMutateError(error, "update musician"),
    },
  );

  return {
    musicians,
    addMusician: addMusicianMutate,
    updateMusician,
    deleteMusician: deleteMusicianMutate,
  };
};
