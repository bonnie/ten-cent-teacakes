import Link from "next/link";
import React from "react";

import { styleComponentDefaultProps, StyleComponentProps } from ".";
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
    <Link href={href}>
      <Keyword className={baseClasses}>{children}</Keyword>
    </Link>
  );
};

InternalLinkKeyword.defaultProps = styleComponentDefaultProps;
