import dayjs from "dayjs";
import React from "react";

export const Footer: React.FC = () => (
  <div className="text-center position-fixed bottom-0 mb-10">
    <p>© {dayjs().year()}</p>
  </div>
);
