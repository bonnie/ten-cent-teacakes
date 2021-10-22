import React, {
  Dispatch,
  MouseEvent as ReactMouseEvent,
  MouseEventHandler,
  SetStateAction,
} from "react";
import { IconType } from "react-icons";
import { AiOutlineStop } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
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
  editing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
  handleDelete: MouseEventHandler<HTMLButtonElement>;
  handleSave: MouseEventHandler<HTMLButtonElement>;
};
export const EditButtons: React.FC<EditButtonProps> = ({
  editing,
  setEditing,
  handleDelete,
  handleSave,
}) => {
  const handleCancel = () => {
    setEditing(false);
  };
  return editing ? (
    <>
      <IconButton
        Icon={AiOutlineStop}
        label="cancel"
        handleClick={handleCancel}
      />
      <IconButton Icon={HiOutlineSave} label="save" handleClick={handleSave} />
      <IconButton
        Icon={RiDeleteBinLine}
        label="delete"
        handleClick={handleDelete}
      />
    </>
  ) : (
    <IconButton
      Icon={FiEdit}
      label="edit"
      handleClick={() => setEditing(true)}
    />
  );
};
