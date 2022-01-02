import React, { MouseEventHandler } from "react";
import { tw } from "twind";

export type ButtonProps = {
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  additionalClasses?: Array<string>;
  type?: "button" | "submit";
  disabled?: boolean;
  round?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  handleClick,
  additionalClasses = [],
  type = "button",
  disabled = false,
  round = false,
}) => {
  const classes = tw([
    disabled ? "bg-aqua-300" : "bg-aqua-500",
    "text-white",
    "active:bg-aqua-600",
    "font-bold",
    "uppercase",
    "text-sm",
    round ? "px-2" : "px-6",
    round ? "py-2" : "py-3",
    round ? "rounded-full" : "rounded",
    "shadow",
    disabled ? null : "hover:shadow-lg",
    "outline-none",
    disabled ? null : "focus:outline-none",
    "mr-1",
    "mb-1",
    "ease-linear",
    "transition-all",
    "duration-150",
    ...additionalClasses,
  ]);

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
};
