import dayjs from "dayjs";
import React from "react";
import { tw } from "twind";

export const ShowDate: React.FC<{ performAt: Date }> = ({ performAt }) => (
  <div
    className={tw([
      "flex",
      "sm:flex-col",
      "flex-row",
      "sm:items-end",
      "items-baseline",
    ])}
  >
    <div className={tw(["text-lg", "mr-2", "sm:mr-0"])}>
      {dayjs(performAt).format("MMM D, YYYY")}
    </div>
    <div className={tw(["align-right"])}>
      {dayjs(performAt).format("h:mm a")}
    </div>
  </div>
);
