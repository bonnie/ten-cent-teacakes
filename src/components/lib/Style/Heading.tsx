import React from "react";
import { tw } from "twind";

type HeadingProps = {
  textSize?: string;
  align?: "left" | "right" | "center";
  margin?: number;
};

export const Heading: React.FC<React.PropsWithChildren<HeadingProps>> = ({
  children,
  textSize,
  align,
  margin,
}) => {
  const classes = tw`font-delfina text-${textSize} m-${margin} text-${align}`;
  return <h1 className={classes}>{children}</h1>;
};

Heading.defaultProps = {
  textSize: "6xl",
  align: "center",
  margin: 5,
};
