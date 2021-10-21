import React from "react";

type EditButtonProps = {
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
  action: "add" | "edit";
  onAction: () => void;
};

export const EditButtons: React.FC<EditButtonProps> = ({
  setEditing,
  onDelete,
  action,
  onAction,
}) => <div />;
