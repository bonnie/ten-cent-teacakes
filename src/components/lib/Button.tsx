import React, { MouseEventHandler } from "react";

export type ButtonProps = {
  contents: string | React.ReactElement;
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
  additionalClasses?: Array<string>;
  type?: "button" | "submit";
  disabled?: boolean;
  round?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  contents,
  clickHandler,
  additionalClasses = [],
  type = "button",
  disabled = false,
  round = false,
}) => {
  const classes = [
    "bg-aqua-500",
    "text-white",
    "active:bg-aqua-600",
    "font-bold",
    "uppercase",
    "text-sm",
    round ? "px-2" : "px-6",
    round ? "py-2" : "py-3",
    round ? "rounded-full" : "rounded",
    "shadow",
    "hover:shadow-lg",
    "outline-none",
    "focus:outline-none",
    "mr-1",
    "mb-1",
    "ease-linear",
    "transition-all",
    "duration-150",
    ...additionalClasses,
  ];

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={clickHandler}
      disabled={disabled}
      className={classes.join(" ")}
    >
      <span>{contents}</span>
    </button>
  );
};
