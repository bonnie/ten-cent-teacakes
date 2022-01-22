import React from "react";

import {
  StyleComponent,
  styleComponentDefaultProps,
  StyleComponentType,
} from ".";

export const Section: StyleComponentType = ({ children, className = "" }) => {
  const baseClasses = [
    "mt-10",
    "w-screen",
    "pt-4",
    "border-t-8",
    "border-dotted",
  ];
  return (
    <StyleComponent baseClasses={baseClasses} extraClasses={className}>
      {children}
    </StyleComponent>
  );
};

Section.defaultProps = styleComponentDefaultProps;
