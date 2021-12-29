/* eslint-disable react/jsx-props-no-spreading */

import { Formik, FormikConfig, FormikProps } from "formik";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";

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
  const ButtonIcon = buttonType === "edit" ? FiEdit : IoMdAdd;
  return (
    <>
      <Button clickHandler={() => setShowModal(true)} aria-label={title} round>
        <ButtonIcon size={20} />
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
                    clickHandler={() => {
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
