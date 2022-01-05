/* eslint-disable react/jsx-props-no-spreading */
import { Photo } from "@prisma/client";

import { FormikProps } from "formik";
import React from "react";

import { PhotoUpload } from "@/components/lib/form/PhotoUpload";
import { TextInput } from "@/components/lib/form/TextInput";
import { EditItemModal } from "@/components/lib/modals/EditItemModal";
import { PhotoFormData, PhotoPatchData } from "@/lib/photos/types";
import { EditableShow } from "@/pages/shows/components/EditableShow";

import { usePhotos } from "../hooks/usePhotos";

const editFields = (
  <>
    <EditableShow required={false} />
    <TextInput name="name" label="Phototographer" required={false} />
  </>
);

export const EditPhotoForm: React.FC<{
  props: FormikProps<PhotoPatchData>;
}> = ({ props }) => <form onSubmit={props.handleSubmit}>{editFields}</form>;

export const AddPhotoForm: React.FC<{
  props: FormikProps<PhotoFormData>;
}> = ({ props }) => (
  <form onSubmit={props.handleSubmit}>
    {editFields}
    <PhotoUpload name="photoFile" />
  </form>
);

const photoFormValidation = (values: PhotoFormData) => {
  const errors: { file?: string } = {};
  if (!values.file) {
    errors.file = "File is required";
  }
  return errors;
};

export const AddPhotoModal: React.FC = () => {
  const { addPhoto } = usePhotos();

  const initialValues = {
    photographer: "",
    showId: undefined,
    file: undefined,
  };
  const onSubmit = (values: PhotoFormData) => {
    if (values.file)
      addPhoto({
        showId: values.showId,
        file: values.file,
        photographer: values.photographer,
      });
  };

  const formikConfig = {
    initialValues,
    validate: photoFormValidation,
    onSubmit,
  };

  return (
    <EditItemModal
      title="Add Photo"
      FormFields={AddPhotoForm}
      formikConfig={formikConfig}
      buttonType="add"
    />
  );
};

export const EditPhotoModal: React.FC<{ Photo: Photo }> = ({ Photo }) => {
  const { updatePhoto } = usePhotos();

  const initialValues: PhotoPatchData = {
    photographer: Photo.photographer ?? undefined,
    showId: Photo.showId ?? undefined,
  };

  const onSubmit = (values: PhotoPatchData) => {
    updatePhoto({
      id: Photo.id,
      data: values,
    });
  };

  const formikConfig = {
    initialValues,
    validate: photoFormValidation,
    onSubmit,
  };

  return (
    <EditItemModal
      title="Edit Photo"
      FormFields={EditPhotoForm}
      formikConfig={formikConfig}
      buttonType="edit"
    />
  );
};
