import { useMemo } from "react";
import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

import { useToast } from "@/components/toasts/useToast";
import {
  addInstrument,
  deleteInstrument,
  fetchInstruments,
  patchInstrument,
} from "@/lib/instruments";
import {
  InstrumentPatchArgs,
  InstrumentPutData,
  InstrumentResponse,
  InstrumentWithMusicianCount,
} from "@/lib/instruments/types";
import { queryKeys } from "@/lib/react-query/query-keys";
import { useHandleError } from "@/lib/react-query/useHandleError";

type UseInstrumentsReturnValue = {
  instruments: Array<InstrumentWithMusicianCount>;
  instrumentFormValidation: (values: InstrumentPutData) => {
    name?: string;
  };
  addInstrument: UseMutateFunction<
    InstrumentResponse,
    unknown,
    InstrumentPutData,
    unknown
  >;
  deleteInstrument: UseMutateFunction<void, unknown, number, unknown>;
  updateInstrument: UseMutateFunction<
    InstrumentResponse,
    unknown,
    InstrumentPatchArgs,
    unknown
  >;
};

export const useInstruments = (): UseInstrumentsReturnValue => {
  const { showToast } = useToast();
  const { handleQueryError, handleMutateError } = useHandleError();
  const queryClient = useQueryClient();

  const invalidateInstruments = () =>
    queryClient.invalidateQueries([queryKeys.instruments]);

  const { data: instruments = [] } = useQuery<
    Array<InstrumentWithMusicianCount>
  >(queryKeys.instruments, fetchInstruments, {
    onError: handleQueryError,
  });

  const { mutate: addInstrumentMutate } = useMutation(
    queryKeys.instruments,
    addInstrument,
    {
      onSuccess: (data) => {
        invalidateInstruments();
        showToast(
          "success",
          `You have added the instrument "${data.instrument.name}"`,
        );
      },
      onError: (error) => handleMutateError(error, "add instrument"),
    },
  );

  const { mutate: deleteInstrumentMutate } = useMutation(
    queryKeys.instruments,
    deleteInstrument,
    {
      onSuccess: () => {
        invalidateInstruments();
        showToast("success", "You have deleted the instrument");
      },
      onError: (error) => handleMutateError(error, "delete instrument"),
    },
  );

  const { mutate: updateInstrument } = useMutation(
    queryKeys.instruments,
    patchInstrument,
    {
      onSuccess: (data) => {
        invalidateInstruments();
        showToast(
          "success",
          `You have updated the instrument "${data.instrument.name}"`,
        );
      },
      onError: (error) => handleMutateError(error, "update instrument"),
    },
  );

  const instrumentNamesLower = useMemo(
    () => instruments.map((instrument) => instrument.name.toLowerCase()),
    [instruments],
  );

  const instrumentFormValidation = (values: InstrumentPutData) => {
    const errors: { name?: string; url?: string } = {};
    if (!values.name) {
      errors.name = "Instrument name is required";
    } else if (
      values.name &&
      instrumentNamesLower.includes(values.name.toLowerCase())
    ) {
      errors.name = `Instrument "${values.name}" already exists`;
    }
    return errors;
  };

  return {
    instruments,
    instrumentFormValidation,
    addInstrument: addInstrumentMutate,
    deleteInstrument: deleteInstrumentMutate,
    updateInstrument,
  };
};
