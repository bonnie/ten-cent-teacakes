/* eslint-disable react/jsx-props-no-spreading */

import { Formik, FormikConfig, FormikProps } from "formik";
import React from "react";
import { FiEdit } from "react-icons/fi";

// import { IoMdAdd } from "react-icons/io";
import { Button } from "@/components/lib/Button";
import { useToast } from "@/components/toasts/useToast";

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
  const { showToast } = useToast();
  const [showModal, setShowModal] = React.useState(false);
  const buttonContents =
    buttonType === "edit" ? <FiEdit size={20} /> : "Add new";
  return (
    <>
      <Button
        handleClick={() => setShowModal(true)}
        aria-label={title}
        round={buttonType === "edit"}
      >
        {buttonContents}
      </Button>
      {showModal ? (
        <ModalContainer title={title}>
          <Formik {...formikConfig}>
            {(props) => (
              <>
                <FormFields props={props} />
                <ModalFooter>
                  <ModalCancelButton setShowModal={setShowModal} />
                  <Button
                    type="submit"
                    disabled={Object.keys(props.errors).length > 0}
                    handleClick={async () => {
                      const errors = await props.validateForm(props.values);
                      if (Object.keys(errors).length === 0) {
                        await props.submitForm();
                        setShowModal(false);
                      } else {
                        const errorString = Object.values(errors).join("; ");
                        showToast("error", errorString);
                      }
                    }}
                  >
                    Save
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
