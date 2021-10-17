// adapted from https://adamrichardson.dev/blog/custom-tailwind-toast-component

import React, { createContext, Dispatch, useContext, useReducer } from "react";

import { Toast, ToastAction } from "./types";

type ToastState = {
  toasts: Array<Toast>;
};

const ToastStateContext = createContext<ToastState>({ toasts: [] });
const ToastDispatchContext = createContext<Dispatch<ToastAction> | null>(null);

function ToastReducer(state: ToastState, action: ToastAction) {
  switch (action.type) {
    case "ADD_TOAST": {
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      };
    }
    case "DELETE_TOAST": {
      const updatedToasts = state.toasts.filter((e) => e.id !== action.id);
      return {
        ...state,
        toasts: updatedToasts,
      };
    }
    default: {
      throw new Error("unhandled action");
    }
  }
}

export const ToastProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(ToastReducer, {
    toasts: [],
  });

  return (
    <ToastStateContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>
        {children}
      </ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  );
};

export const useToastStateContext = () => useContext(ToastStateContext);
export const useToastDispatchContext = () => useContext(ToastDispatchContext);
