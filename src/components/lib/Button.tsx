import React, { MouseEventHandler } from "react";
import { tw } from "twind";

export type ButtonProps = {
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  additionalClasses?: Array<string>;
  type?: "button" | "submit";
  disabled?: boolean;
  round?: boolean;
  label?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  handleClick,
  additionalClasses = [],
  type = "button",
  disabled = false,
  round = false,
  label = undefined,
}) => {
  const classes = tw([
    disabled ? "bg-aqua-400" : "bg-aqua-700",
    "text-white",
    "active:bg-aqua-800",
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

  const ariaLabel = label ? { "aria-label": label } : {};

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={classes}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ariaLabel}
    >
      {children}
    </button>
  );
};
