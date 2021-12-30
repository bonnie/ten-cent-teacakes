import dayjs from "dayjs";
import React from "react";

export const ShowDate: React.FC<{ performAt: Date }> = ({ performAt }) => (
  <div className="flex flex-col items-end">
    <div className="text-lg">{dayjs(performAt).format("MMM D, YYYY")}</div>
    <div className="align-right">{dayjs(performAt).format("h:mm a")}</div>
  </div>
);
