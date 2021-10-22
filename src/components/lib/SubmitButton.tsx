import React, { MouseEventHandler } from "react";
import { HiOutlineSave } from "react-icons/hi";

export const SubmitButton: React.FC<{
  handleClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ handleClick }) => (
  <button
    type="button"
    onClick={handleClick}
    aria-label="submit"
    title="submit"
  >
    <HiOutlineSave size={30} />
  </button>
);
