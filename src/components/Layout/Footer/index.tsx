import dayjs from "dayjs";
import React from "react";

// TODO: get this at the bottom of the page
export const Footer: React.FC = () => (
  <div className="text-center position-absolute h-full bottom-0 mb-10">
    <p>© {dayjs().year()}</p>
  </div>
);
