import React from "react";
import { CgSpinner } from "react-icons/cg";
import { useIsFetching, useIsMutating } from "react-query";
import { tw } from "twind";

export const LoadingSpinner: React.FC = () => {
  const isMutating = useIsMutating();
  const isFetching = useIsFetching();

  return (
    <div
      className={tw([
        "flex",
        "justify-between",
        "items-end",
        "z-100",
        "fixed",
        "w-screen",
        isMutating || isFetching ? null : "hidden",
      ])}
    >
      <div className={tw(["flex", "my-auto"])}>
        <CgSpinner className={tw(["animate-spin", "absolute"])} size={50} />
      </div>
    </div>
  );

  // return (
  //   <div className={tw(["flex", "justify-center", "items-center", "z-100"])}>
  //     <div className={tw(["flex-col", "justify-center", "items-center"])}>
  //       <CgSpinner className={tw(["animate-spin", "absolute"])} size={50} />
  //     </div>
  //   </div>
  // );
  //   <svg
  //     className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
  //     xmlns="http://www.w3.org/2000/svg"
  //     fill="none"
  //     viewBox="0 0 24 24"
  //   >
  //     <circle
  //       className="opacity-25"
  //       cx="12"
  //       cy="12"
  //       r="10"
  //       stroke="currentColor"
  //       strokeWidth="4"
  //     />
  //     <path
  //       className="opacity-75"
  //       fill="currentColor"
  //       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  //     />
  //   </svg>
  // );
  //   <div className={tw(["flex", "justify-center", "items-center"])}>
  //     <div
  //       className={tw([
  //         "spinner-border",
  //         "absolute",
  //         "animate-spin",
  //         "inline-block",
  //         "w-8",
  //         "h-8",
  //         "border-4",
  //         "rounded-full",
  //         isMutating || isFetching ? null : "hidden",
  //       ])}
  //       role="status"
  //     >
  //       <span className="sr-only">Loading...</span>
  //     </div>
  //   </div>
  // );
};
