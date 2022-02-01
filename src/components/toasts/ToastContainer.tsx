// adapted from https://adamrichardson.dev/blog/custom-tailwind-toast-component
import { tw } from "twind";

import Toast from "./Toast";
import { useToastStateContext } from "./ToastContext";

export function ToastContainer() {
  const { toasts } = useToastStateContext();

  return (
    <div className={tw(["fixed", "bottom-4", "w-full", "z-50"])}>
      <div className={tw(["max-w-xl", "mx-auto"])}>
        {toasts &&
          toasts.map((toast) => (
            <Toast
              id={toast.id}
              key={toast.id}
              status={toast.status}
              message={toast.message}
            />
          ))}
      </div>
    </div>
  );
}
