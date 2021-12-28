// TODO: delete

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
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  submit?: boolean;
};
const IconButton: React.FC<IconButtonProps> = ({
  Icon,
  label,
  handleClick,
  submit,
}) => (
  <button
    type={submit ? "submit" : "button"}
    aria-label={label}
    title={label}
    onClick={handleClick}
  >
    <Icon size={30} />
  </button>
);
IconButton.defaultProps = {
  submit: false,
  handleClick: undefined,
};

// NOTE: intented to be declared from within a form
type EditButtonProps = {
  editing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
  handleDelete: MouseEventHandler<HTMLButtonElement>;
  // handleSave: MouseEventHandler<HTMLButtonElement>;
  // eslint-disable-next-line no-unused-vars
  // handleSave: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
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
      {/* <SubmitButton disabled={false} /> */}
      <IconButton
        Icon={RiDeleteBinLine}
        label="delete"
        handleClick={handleDelete}
      />
      <IconButton Icon={BiSave} label="save" submit />
    </>
  ) : (
    <IconButton
      Icon={FiEdit}
      label="edit"
      handleClick={() => setEditing(true)}
    />
  );
};
