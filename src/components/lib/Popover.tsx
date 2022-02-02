import React, { useState } from "react";
import { tw } from "twind";

export const Popover: React.FC<{
  message: string;
}> = ({ message, children }) => {
  const [popoverHidden, setPopoverHidden] = useState(true);
  const showPopover = () => setPopoverHidden(false);
  const hidePopover = () => setPopoverHidden(true);

  const classes = tw([
    popoverHidden ? "hidden" : "",
    "px-6",
    "py-2.5",
    "bg-white",
    "text-aqua-800",
    "font-medium",
    "leading-tight",
    "rounded",
    "shadow-lg",
    "focus:outline-none",
    "focus:ring-0",
    "transition",
    "duration-150",
    "ease-in-out",
    "overflow-x-hidden",
    "overflow-y-auto",
    "absolute",
    "z-50",
    "outline-none",
    "focus:outline-none",
    "text-lg",
  ]);

  return (
    <>
      <span
        onMouseOver={showPopover}
        onFocus={showPopover}
        onMouseOut={hidePopover}
        onBlur={hidePopover}
      >
        {children}
      </span>
      <button type="button" className={classes} onClick={hidePopover}>
        {message}
      </button>
    </>
  );
};
