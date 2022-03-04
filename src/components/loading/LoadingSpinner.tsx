import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import { CgSpinner } from "react-icons/cg";
import { useIsFetching, useIsMutating } from "react-query";
import { tw } from "twind";

export const LoadingSpinner: React.FC = () => {
  const isMutating = useIsMutating();
  const isFetching = useIsFetching();
  const { isLoading } = useUser();

  return (
    <div
      className={tw([
        "flex",
        "justify-between",
        "items-end",
        "z-50",
        "fixed",
        "w-screen",
        isMutating || isFetching || isLoading ? null : "hidden",
      ])}
    >
      <div className={tw(["flex", "my-auto"])}>
        <CgSpinner
          aria-label="loading"
          className={tw(["animate-spin", "absolute"])}
          size={50}
        />
      </div>
    </div>
  );
};
