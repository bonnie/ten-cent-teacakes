/* eslint-disable react/jsx-props-no-spreading */
import { FormikProps } from "formik";
import React from "react";

import { PhotoUpload } from "@/components/lib/form/PhotoUpload";
import { TextArea } from "@/components/lib/form/TextArea";
import { TextInput } from "@/components/lib/form/TextInput";
import { EditItemModal } from "@/components/lib/modals/EditItemModal";
import { InstrumentMultiSelect } from "@/lib/musicians/components/instruments/InstrumentMultiSelect";
import {
  MusicianFormData,
  MusicianWithInstruments,
} from "@/lib/musicians/types";
import { MUSICIANS_DIRNAME } from "@/lib/supabase/constants";

import { useMusicians } from "../hooks/useMusicians";

const commonFormFields = (
  <>
    <TextInput name="firstName" label="First name" required />
    <TextInput name="lastName" label="Last name" required />
    <TextArea name="bio" label="Bio" required />
    {/* TODO add instrument when new instrument is added (not simple) */}
    <InstrumentMultiSelect />
  </>
);

const squareWarn = "NOTE: Image will be cropped if not square";

const AddMusicianForm: React.FC<{
  props: FormikProps<MusicianFormData>;
}> = ({ props }) => (
  <form onSubmit={props.handleSubmit}>
    {commonFormFields}
    <PhotoUpload
      name="imageFile"
      label="Select musician image"
      required
      uploadDirname={MUSICIANS_DIRNAME}
      warningText={squareWarn}
    />
  </form>
);

const EditMusicianForm: React.FC<{
  props: FormikProps<MusicianFormData>;
}> = ({ props }) => (
  <form onSubmit={props.handleSubmit}>
    {commonFormFields}
    <PhotoUpload
      name="imageFile"
      label="Select new musician image"
      required={false}
      uploadDirname={MUSICIANS_DIRNAME}
      warningText={squareWarn}
    />
  </form>
);

type MusicianFormErrors = {
  firstName?: string;
  lastName?: string;
  imageFile?: string;
  bio?: string;
};

const commonFormValidation = (values: MusicianFormData) => {
  const errors: MusicianFormErrors = {};

  if (!values.firstName) {
    errors.firstName = "First name is required";
  }
  if (!values.lastName) {
    errors.lastName = "Last name is required";
  }
  if (!values.bio) {
    errors.bio = "Bio is required";
  }
  return errors;
};

const addMusicianFormValidation = (values: MusicianFormData) => {
  const errors = commonFormValidation(values);
  if (!values.imageFile) {
    errors.imageFile = "Photo is required";
  }
  return errors;
};

export const AddMusicianModal: React.FC = () => {
  const { addMusician } = useMusicians();

  const initialValues = {
    firstName: undefined,
    lastName: undefined,
    bio: undefined,
    instrumentIds: [],
    imageFile: undefined,
  };
  const onSubmit = (values: MusicianFormData) => {
    addMusician({
      firstName: values.firstName,
      lastName: values.lastName,
      bio: values.bio,
      instrumentIds: values.instrumentIds,
      imagePath: values.photoPath,
    });
  };

  const formikConfig = {
    initialValues,
    validate: addMusicianFormValidation,
    onSubmit,
  };

  return (
    <EditItemModal
      title="Add Musician"
      FormFields={AddMusicianForm}
      formikConfig={formikConfig}
      buttonType="add"
    />
  );
};

export const EditMusicianModal: React.FC<{
  musician: MusicianWithInstruments;
}> = ({ musician }) => {
  const { updateMusician } = useMusicians();

  const initialValues: MusicianFormData = {
    firstName: musician.firstName,
    lastName: musician.lastName,
    bio: musician.bio,
    imageFile: undefined,
    instrumentIds: musician.instruments
      ? musician.instruments.map((i) => i.id)
      : [],
  };

  const onSubmit = (values: MusicianFormData) => {
    updateMusician({
      id: musician.id,
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
        bio: values.bio,
        imagePath: values.photoPath,
        instrumentIds: values.instrumentIds,
      },
    });
  };

  const formikConfig = {
    initialValues,
    validate: commonFormValidation,
    onSubmit,
  };

  return (
    <EditItemModal
      title="Edit Musician"
      FormFields={EditMusicianForm}
      formikConfig={formikConfig}
      buttonType="edit"
    />
  );
};
