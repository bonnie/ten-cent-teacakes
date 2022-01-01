import dayjs from "dayjs";
import React from "react";

export const ShowDate: React.FC<{ performAt: Date }> = ({ performAt }) => (
  <div className="flex sm:flex-col xs:flex-row xs:items-baseline sm:items-end sm:w-1/2 xs:w-full">
    <div className="text-lg xs:mr-2 sm:mr-0">
      {dayjs(performAt).format("MMM D, YYYY")}
    </div>
    <div className="align-right">{dayjs(performAt).format("h:mm a")}</div>
  </div>
);
