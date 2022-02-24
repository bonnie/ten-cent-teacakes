/* eslint-disable react/jsx-props-no-spreading */
import { Instrument } from "@prisma/client";

import { FormikProps } from "formik";
import React from "react";

import { TextInput } from "@/components/lib/form/TextInput";
import { EditItemModal } from "@/components/lib/modals/EditItemModal";
import { InstrumentPutData } from "@/lib/instruments/types";

import { useInstruments } from "../../hooks/useInstruments";

export const EditInstrumentForm: React.FC<{
  props: FormikProps<InstrumentPutData>;
}> = ({ props }) => (
  <form onSubmit={props.handleSubmit}>
    <TextInput name="name" label="Instrument name" required />
  </form>
);

export const AddInstrumentModal: React.FC = () => {
  const { addInstrument, instrumentFormValidation } = useInstruments();

  const initialValues: InstrumentPutData = { name: "" };
  const onSubmit = (values: InstrumentPutData) => {
    addInstrument(values);
  };

  const formikConfig = {
    initialValues,
    validate: instrumentFormValidation,
    onSubmit,
  };

  return (
    <EditItemModal
      title="Add Instrument"
      FormFields={EditInstrumentForm}
      formikConfig={formikConfig}
      buttonType="add"
    />
  );
};

export const EditInstrumentModal: React.FC<{ instrument: Instrument }> = ({
  instrument,
}) => {
  const { updateInstrument, instrumentFormValidation } = useInstruments();

  const initialValues: InstrumentPutData = {
    name: instrument.name,
  };

  const onSubmit = (values: InstrumentPutData) => {
    updateInstrument({
      id: instrument.id,
      data: values,
    });
  };

  const formikConfig = {
    initialValues,
    validate: instrumentFormValidation,
    onSubmit,
  };

  return (
    <EditItemModal
      title={`Edit Instrument ${instrument.name}`}
      FormFields={EditInstrumentForm}
      formikConfig={formikConfig}
      buttonType="edit"
    />
  );
};
