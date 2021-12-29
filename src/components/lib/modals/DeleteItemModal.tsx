import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

import { Button } from "@/components/lib/Button";

import {
  ModalCancelButton,
  ModalContainer,
  ModalFooter,
} from "./ModalElements";

type DeleteItemModalProps = {
  title: string;
  description: string;
  handleDelete: () => void;
  disabled?: boolean;
};

export const DeleteItemModal: React.FC<DeleteItemModalProps> = ({
  title,
  description,
  handleDelete,
  disabled,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button
        clickHandler={() => setShowModal(true)}
        aria-label={title}
        round
        disabled={disabled}
      >
        <RiDeleteBinLine size={20} />
      </Button>
      {showModal ? (
        <ModalContainer title={title}>
          <div className="m-5">{description}</div>
          <ModalFooter>
            <ModalCancelButton setShowModal={setShowModal} />
            <Button
              clickHandler={() => {
                handleDelete();
                setShowModal(false);
              }}
              additionalClasses={["bg-red-700", "active:bg-red-800"]}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContainer>
      ) : null}
    </>
  );
};

DeleteItemModal.defaultProps = {
  disabled: false,
};
