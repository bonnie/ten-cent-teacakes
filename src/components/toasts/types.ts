export type ToastStatus = "success" | "info" | "warning" | "error";

export type Toast = {
  status: ToastStatus;
  message: string;
  id: number;
};

export type AddToastAction = {
  type: "ADD_TOAST";
  toast: Toast;
};

export type DeleteToastAction = {
  type: "DELETE_TOAST";
  id: number;
};

export type ToastAction = AddToastAction | DeleteToastAction;
