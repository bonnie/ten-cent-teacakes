/* eslint-disable react/jsx-props-no-spreading */

import { Formik, FormikConfig, FormikProps } from "formik";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";

import { Button } from "@/components/lib/Button";
import { ShowFormData } from "@/lib/shows";

import {
  ModalCancelButton,
  ModalContainer,
  ModalFooter,
} from "./ModalElements";

type Values = ShowFormData;

type EditItemModalProps = {
  title: string;
  FormFields: React.FC<{ props: FormikProps<Values> }>;
  formikConfig: FormikConfig<Values>;
  buttonType?: "edit" | "add";
};

export const EditItemModal: React.FC<EditItemModalProps> = ({
  title,
  FormFields,
  formikConfig,
  buttonType = "edit",
}) => {
  const [showModal, setShowModal] = React.useState(false);
  const ButtonIcon = buttonType === "edit" ? FiEdit : IoMdAdd;
  return (
    <>
      <Button clickHandler={() => setShowModal(true)} aria-label={title} round>
        <ButtonIcon size={20} />
      </Button>
      {showModal ? (
        <ModalContainer title={title}>
          {/* body */}
          <Formik {...formikConfig}>
            {(props) => (
              <div className="mt-5 md:mt-0 md:col-span-2">
                <FormFields props={props} />
                {/* footer */}
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
              </div>
            )}
          </Formik>
        </ModalContainer>
      ) : null}
    </>
  );
};

EditItemModal.defaultProps = {
  buttonType: "edit",
};
