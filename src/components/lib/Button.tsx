import React, { MouseEventHandler } from "react";

export type ButtonProps = {
  contents: string | React.ReactElement;
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
  additionalClasses?: Array<string>;
};

export const Button: React.FC<ButtonProps> = ({
  contents,
  clickHandler,
  additionalClasses = [],
}) => {
  const classes = [
    "px-4",
    "py-3",
    "bg-aqua-600",
    "rounded-md",
    "text-white",
    "outline-none",
    "focus:ring-4",
    "shadow-lg",
    "transform",
    "active:scale-75",
    "transition-transform",
    "text-center",
    ...additionalClasses,
  ];

  return (
    <button type="button" onClick={clickHandler} className={classes.join(" ")}>
      <span>{contents}</span>
    </button>
  );
};
