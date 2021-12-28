import React from "react";

import { Button } from "@/components/lib/Button";

type FormModalButtonsProps = {
  closeModal: () => void;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
};

export const FormModalButtons: React.FC<FormModalButtonsProps> = ({
  closeModal,
  handleSubmit,
}) => (
  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
    <button
      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
      onClick={closeModal}
    >
      Close
    </button>
    <Button
      type="submit"
      clickHandler={() => {
        handleSubmit();
        closeModal();
      }}
      contents="Save Changes"
    />
  </div>
);
