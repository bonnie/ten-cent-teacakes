import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { tw } from "twind";

import { Button } from "@/components/lib/Button";
import { Popover } from "@/components/lib/Popover";

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
  const button = (
    <Button
      handleClick={() => setShowModal(true)}
      label={title}
      round
      disabled={disabled}
    >
      <RiDeleteBinLine size={20} />
    </Button>
  );
  return (
    <>
      {disabled ? (
        <Popover message={disabled ? description : title}>{button}</Popover>
      ) : (
        button
      )}
      {showModal ? (
        <ModalContainer title={title}>
          <div className={tw(["m-5"])}>{description}</div>
          <ModalFooter>
            <ModalCancelButton setShowModal={setShowModal} />
            <Button
              handleClick={() => {
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
