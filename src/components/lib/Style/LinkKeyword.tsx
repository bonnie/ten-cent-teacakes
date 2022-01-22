import React from "react";

import {
  mergeClasses,
  styleComponentDefaultProps,
  StyleComponentProps,
} from ".";
import { Keyword } from "./Keyword";

type LinkKeywordProps = StyleComponentProps & {
  href: string;
};

export const LinkKeyword: React.FC<LinkKeywordProps> = ({
  children,
  className = "",
  href,
}) => {
  const baseClasses = ["hover:text-aqua-500", "hover:cursor-pointer"];
  return (
    <a target="_blank" href={href} rel="noreferrer">
      <Keyword className={mergeClasses(baseClasses, className)}>
        {children}
      </Keyword>
    </a>
  );
};

LinkKeyword.defaultProps = styleComponentDefaultProps;
