import React, { MouseEventHandler } from "react";
import { IconType } from "react-icons";
import { AiOutlineStop } from "react-icons/ai";
import { HiOutlineSave } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";

type IconButtonProps = {
  Icon: IconType;
  label: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
};
const IconButton: React.FC<IconButtonProps> = ({
  Icon,
  label,
  handleClick,
}) => (
  <button type="button" aria-label={label} onClick={handleClick} title={label}>
    <Icon size={30} />
  </button>
);

type EditButtonProps = {
  onDelete: MouseEventHandler<HTMLButtonElement>;
  onSave: MouseEventHandler<HTMLButtonElement>;
  onCancel: MouseEventHandler<HTMLButtonElement>;
};
export const EditButtons: React.FC<EditButtonProps> = ({
  onDelete,
  onSave,
  onCancel,
}) => (
  <>
    <IconButton Icon={AiOutlineStop} label="cancel" handleClick={onCancel} />
    <IconButton Icon={HiOutlineSave} label="save" handleClick={onSave} />
    <IconButton Icon={RiDeleteBinLine} label="delete" handleClick={onDelete} />
  </>
);
