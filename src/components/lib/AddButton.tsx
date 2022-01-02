// TODO: Delete

import React, { MouseEventHandler } from "react";
import { MdAddCircleOutline } from "react-icons/md";

import { Button } from "./Button";

type AddButtonProps = {
  handleClick: MouseEventHandler<HTMLButtonElement>;
};

export const AddButton: React.FC<AddButtonProps> = ({ handleClick }) => (
  <Button
    // contents={<MdAddCircleOutline size="2em" />}
    handleClick={handleClick}
    additionalClasses={["mb-2"]}
  />
);
