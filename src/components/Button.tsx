import React, { MouseEventHandler } from "react";

type ButtonProps = {
  contents: string | React.ReactElement;
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
};

export const Button: React.FC<ButtonProps> = ({ contents, clickHandler }) => (
  <button
    type="button"
    onClick={clickHandler}
    className="px-4 py-3 bg-aqua-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform text-center"
  >
    <span>{contents}</span>
  </button>
);

Button.defaultProps = {
  clickHandler() {},
};
