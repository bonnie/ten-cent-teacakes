/* eslint-disable react/jsx-props-no-spreading */
import dayjs from "dayjs";
import { FormikProps } from "formik";
import React from "react";

import { PhotoUpload } from "@/components/lib/form/PhotoUpload";
import { TextInput } from "@/components/lib/form/TextInput";
import { EditItemModal } from "@/components/lib/modals/EditItemModal";
import {
  MusicianFormData,
  MusicianWithInstruments,
} from "@/lib/musicians/types";
import { EditableInstrumentsList } from "@/pages/band/components/instruments/EditableInstrumentsList";

import { useMusicians } from "../hooks/useMusicians";
import { Musicians } from "./Musicians";

export const EditMusicianForm: React.FC<{
  props: FormikProps<MusicianFormData>;
}> = ({ props }) => (
  <form onSubmit={props.handleSubmit}>
    <TextInput name="firstName" label="First name" required />
    <TextInput name="lastName" label="Last name" required />
    <TextInput name="bio" label="Bio" type="textarea" required />
    <PhotoUpload name="imageFile" label="Select musician image" />
    <EditableInstrumentsList />
  </form>
);

type MusicianFormErrors = {
  firstName?: string;
  lastName?: string;
  imageFile?: string;
  bio?: string;
};

const musicianFormValidation = (values: MusicianFormData) => {
  const errors: MusicianFormErrors = {};
  if (!values.firstName) {
    errors.firstName = "First name is required";
  }
  if (!values.lastName) {
    errors.lastName = "Last name is required";
  }
  if (!values.imageFile) {
    errors.imageFile = "Photo is required";
  }
  if (!values.bio) {
    errors.bio = "Bio is required";
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
    addMusician(values);
  };

  const formikConfig = {
    initialValues,
    validate: musicianFormValidation,
    onSubmit,
  };

  return (
    <EditItemModal
      title="Add Musician"
      FormFields={EditMusicianForm}
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
    instrumentIds: musician.instruments.map((i) => i.id),
  };

  const onSubmit = (values: MusicianFormData) => {
    updateMusician({
      id: musician.id,
      data: values,
    });
  };

  const formikConfig = {
    initialValues,
    validate: musicianFormValidation,
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
