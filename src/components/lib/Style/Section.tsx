import React from "react";
import { tw } from "twind";

import { mergeClasses, StyleComponentType } from ".";

export const Section: StyleComponentType = ({ children, className = "" }) => {
  const baseClasses = [
    "mt-10",
    "w-screen",
    "pt-4",
    "border-t-8",
    "border-dotted",
  ];
  return (
    <div className={tw(mergeClasses(baseClasses, className))}>{children}</div>
  );
};
