import React from "react";
import { tw } from "twind";

export type StyleComponentProps = {
  children: React.ReactNode;
  className?: string | Array<string>;
};

export type StyleComponentType = React.FC<StyleComponentProps>;

export const styleComponentDefaultProps = { className: "" };

export const mergeClasses = (
  baseClasses: Array<string>,
  extraClasses: string | Array<string>,
): Array<string> => {
  const classes = baseClasses;
  if (typeof extraClasses === "string") {
    classes.push(extraClasses);
  } else {
    classes.push(...extraClasses);
  }
  return classes;
};

export const StyleComponent: React.FC<{
  children: React.ReactNode;
  baseClasses: Array<string>;
  extraClasses: string | Array<string>;
}> = ({ children, baseClasses, extraClasses }) => (
  <span className={tw(mergeClasses(baseClasses, extraClasses))}>
    {children}
  </span>
);
