// adapted from https://adamrichardson.dev/blog/custom-tailwind-toast-component

import { useToastDispatchContext } from "./ToastContext";
import { ToastStatus } from "./types";

// eslint-disable-next-line no-unused-vars
export type ToastFunction = (status: ToastStatus, message: string) => string;

export function useToast(delayInMs: number = 5000) {
  const dispatch = useToastDispatchContext();
  const showToast: ToastFunction = (status, message) => {
    const id = Math.random().toString(36).substr(2, 9);
    dispatch({
      type: "ADD_TOAST",
      toast: {
        status,
        message,
        id,
      },
    });

    setTimeout(() => {
      dispatch({ type: "DELETE_TOAST", id });
    }, delayInMs);

    return id;
  };

  return { showToast };
}
