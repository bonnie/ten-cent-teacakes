import dayjs from "dayjs";
import React from "react";

export const Footer: React.FC = () => (
  <div className="flex justify-end items-center position-fixed bottom-0 mb-10">
    <p>&0169; {dayjs().year()}</p>
  </div>
);
