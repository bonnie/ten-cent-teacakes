import React from "react";
import { BiSave } from "react-icons/bi";

export const SubmitButton: React.FC = () => (
  <button type="submit" aria-label="submit" title="submit">
    <BiSave size={30} />
  </button>
);
