import React, { MouseEventHandler } from "react";
import { BiSave } from "react-icons/bi";

export const SubmitButton: React.FC<{
  handleClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ handleClick }) => (
  <button
    type="button"
    onClick={handleClick}
    aria-label="submit"
    title="submit"
  >
    <BiSave size={30} />
  </button>
);
