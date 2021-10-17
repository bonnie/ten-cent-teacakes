// adapted from https://adamrichardson.dev/blog/custom-tailwind-toast-component
import Toast from "./Toast";
import { useToastStateContext } from "./ToastContext";

export function ToastContainer() {
  const { toasts } = useToastStateContext();

  return (
    <div className="absolute bottom-10 w-full z-50">
      <div className="max-w-xl mx-auto">
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
