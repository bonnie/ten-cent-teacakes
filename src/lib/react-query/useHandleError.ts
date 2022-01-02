import React from "react";

import { useToastDispatchContext } from "@/components/toasts/ToastContext";
import { useToast } from "@/components/toasts/useToast";

const getErrorMessage = (error: unknown): string =>
  error instanceof Error
    ? // remove the initial 'Error: ' that accompanies many errors
      error.message
    : "error connecting to server";

export const useHandleError = () => {
  const { showToast } = useToast();
  const [currentErrorToastId, setCurrentErrorToastId] =
    React.useState<string>("");
  const dispatch = useToastDispatchContext();

  const handleQueryError = (error: unknown) => {
    const message = getErrorMessage(error);
    // remove previous error toast to prevent duplicates
    if (currentErrorToastId)
      dispatch({ type: "DELETE_TOAST", id: currentErrorToastId });
    const id = showToast("error", message);
    setCurrentErrorToastId(id);
  };

  const handleMutateError = (error: unknown, action: string) => {
    showToast("error", getErrorMessage(error));
  };

  return { handleQueryError, handleMutateError };
};
