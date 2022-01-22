import Link from "next/link";
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

export const InternalLinkKeyword: React.FC<LinkKeywordProps> = ({
  children,
  className = "",
  href,
}) => {
  const baseClasses = ["hover:text-aqua-500", "hover:cursor-pointer"];
  return (
    <Keyword className={mergeClasses(baseClasses, className)}>
      <Link href={href}>{children}</Link>
    </Keyword>
  );
};

InternalLinkKeyword.defaultProps = styleComponentDefaultProps;
