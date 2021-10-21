import React, { MouseEventHandler } from "react";
import { MdAddCircleOutline } from "react-icons/md";

import { Button } from "./Button";

type AddButtonProps = {
  clickHandler: MouseEventHandler<HTMLButtonElement>;
};

export const AddButton: React.FC<AddButtonProps> = ({ clickHandler }) => (
  <Button
    contents={<MdAddCircleOutline size="2em" />}
    clickHandler={clickHandler}
    additionalClasses={["mb-2"]}
  />
);
