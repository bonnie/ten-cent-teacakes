// adapted from https://adamrichardson.dev/blog/custom-tailwind-toast-component

import {
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from "react-icons/ai";
import { MdOutlineSmsFailed } from "react-icons/md";
import { tw } from "twind";

import { useToastDispatchContext } from "./ToastContext";
import { Toast as ToastType, ToastStatus } from "./types";

const getToastDetailsByStatus = (status: ToastStatus) => {
  switch (status) {
    case "info":
      return { color: "blue", Icon: AiOutlineInfoCircle };
    case "success":
      return { color: "green", Icon: AiOutlineCheckCircle };
    case "warning":
      return { color: "yellow", Icon: AiOutlineWarning };
    case "error":
      return { color: "red", Icon: MdOutlineSmsFailed };
    default:
      return { color: "blue", Icon: AiOutlineInfoCircle };
  }
};

export default function Toast({ status, message, id }: ToastType) {
  const dispatch = useToastDispatchContext();
  const { color, Icon } = getToastDetailsByStatus(status);
  const classes = tw([
    "rounded-r-md",
    `bg(${color}-50)`,
    `border(${color}-800 solid l-4)`,
    "p-4",
    "m-3",
  ]);
  return (
    <>
      <div className={classes} role="alert">
        <div className={tw(["flex"])}>
          <div className={tw(["flex-shrink-0"])}>
            <svg
              className={tw(["h-5", "w-5", `text-${color}-400`])}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <Icon />
            </svg>
          </div>
          <div className={tw(["ml-3"])}>
            <p className={tw(["text-sm", "font-medium", `text-${color}-800`])}>
              {message}
            </p>
          </div>
          <div className={tw(["ml-auto", "pl-3"])}>
            <div className={tw(["-mx-1.5", "-my-1.5"])}>
              <button
                aria-label="dismiss alert"
                type="button"
                onClick={() => {
                  dispatch({ type: "DELETE_TOAST", id });
                }}
                className={tw([
                  "inline-flex",
                  `bg-${color}-50`,
                  "rounded-md",
                  "p-1.5",
                  `text-${color}-500`,
                  `hover:bg-${color}-100`,
                  "focus:outline-none",
                  "focus:ring-2",
                  "focus:ring-offset-2",
                  `focus:ring-offset-${color}-50`,
                  `focus:ring-${color}-600`,
                ])}
              >
                <svg
                  className={tw(["h-5", "w-5"])}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
