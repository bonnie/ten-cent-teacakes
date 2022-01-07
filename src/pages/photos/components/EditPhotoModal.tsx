/* eslint-disable react/jsx-props-no-spreading */
import { FormikProps } from "formik";
import React from "react";

import { PhotoUpload } from "@/components/lib/form/PhotoUpload";
import { TextInput } from "@/components/lib/form/TextInput";
import { EditItemModal } from "@/components/lib/modals/EditItemModal";
import {
  PhotoFormData,
  PhotoPatchData,
  PhotoWithShowAndVenue,
} from "@/lib/photos/types";
import { EditableShow } from "@/pages/shows/components/EditableShow";

import { usePhotos } from "../hooks/usePhotos";

const editFields = (
  <>
    <EditableShow required={false} />
    <TextInput name="photographer" label="Phototographer" required={false} />
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
  const errors: { photoFile?: string } = {};
  if (!values.photoFile) {
    errors.photoFile = "File is required";
  }
  return errors;
};

export const AddPhotoModal: React.FC = () => {
  const { addPhoto } = usePhotos();

  const initialValues = {
    photographer: "",
    showId: undefined,
    photoFile: undefined,
  };
  const onSubmit = (values: PhotoFormData) => {
    if (values.photoFile)
      addPhoto({
        showId: values.showId,
        photoFile: values.photoFile,
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

export const EditPhotoModal: React.FC<{ photo: PhotoWithShowAndVenue }> = ({
  photo,
}) => {
  const { updatePhoto } = usePhotos();

  const initialValues: PhotoPatchData = {
    photographer: photo.photographer ?? undefined,
    showId: photo.showId ?? undefined,
  };

  const onSubmit = (values: PhotoPatchData) => {
    updatePhoto({
      id: photo.id,
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
