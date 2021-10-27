import React, { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { IconType } from "react-icons";
import { AiOutlineStop } from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

import { SubmitButton } from "@/components/lib/SubmitButton";

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
  // handleSave: MouseEventHandler<HTMLButtonElement>;
};
export const EditButtons: React.FC<EditButtonProps> = ({
  editing,
  setEditing,
  handleDelete,
  // handleSave,
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
      {/* <IconButton Icon={BiSave} label="save" handleClick={handleSave} /> */}
      <button type="submit" aria-label="save" title="save">
        <BiSave size={30} />
      </button>
      {/* <SubmitButton /> TODO: why can't I use submitbutton here? */}
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
