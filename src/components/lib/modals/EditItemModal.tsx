/* eslint-disable react/jsx-props-no-spreading */

import { Formik, FormikConfig, FormikProps } from "formik";
import React from "react";
import { FiEdit } from "react-icons/fi";

// import { IoMdAdd } from "react-icons/io";
import { Button } from "@/components/lib/Button";

import {
  ModalCancelButton,
  ModalContainer,
  ModalFooter,
} from "./ModalElements";

type EditItemModalProps<Data> = {
  title: string;
  FormFields: React.FC<{ props: FormikProps<Data> }>;
  formikConfig: FormikConfig<Data>;
  buttonType?: "edit" | "add";
};

export function EditItemModal<Data>({
  title,
  FormFields,
  formikConfig,
  buttonType = "edit",
}: EditItemModalProps<Data>) {
  const [showModal, setShowModal] = React.useState(false);
  const butotnContents =
    buttonType === "edit" ? <FiEdit size={20} /> : "Add new";
  return (
    <>
      <Button
        handleClick={() => setShowModal(true)}
        aria-label={title}
        round={buttonType === "edit"}
      >
        {butotnContents}
      </Button>
      {showModal ? (
        <ModalContainer title={title}>
          <Formik {...formikConfig}>
            {(props) => (
              <>
                <FormFields props={props} />
                {/* TODO: errors */}
                <ModalFooter>
                  <ModalCancelButton setShowModal={setShowModal} />
                  <Button
                    type="submit"
                    handleClick={() => {
                      props.submitForm();
                      setShowModal(false);
                    }}
                  >
                    Save Changes
                  </Button>
                </ModalFooter>
              </>
            )}
          </Formik>
        </ModalContainer>
      ) : null}
    </>
  );
}

EditItemModal.defaultProps = {
  buttonType: "edit",
};
