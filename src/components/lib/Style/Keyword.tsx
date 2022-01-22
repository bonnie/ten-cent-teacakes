import React from "react";

import {
  StyleComponent,
  styleComponentDefaultProps,
  StyleComponentType,
} from ".";

export const Keyword: StyleComponentType = ({ children, className = "" }) => {
  const baseClasses = ["font-bold", "text-aqua-700", "inline"];

  return (
    <StyleComponent baseClasses={baseClasses} extraClasses={className}>
      {children}
    </StyleComponent>
  );
};

Keyword.defaultProps = styleComponentDefaultProps;
