import React from "react";
import { BiSave } from "react-icons/bi";

export const SubmitButton: React.FC<{ disabled: boolean }> = ({ disabled }) => (
  <button
    className={disabled ? "text-gray-500" : "text-black"}
    disabled={disabled}
    type="submit"
    aria-label="submit"
    title="submit"
  >
    <BiSave size={30} />
  </button>
);
