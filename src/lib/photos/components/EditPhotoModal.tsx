/* eslint-disable react/jsx-props-no-spreading */
import dayjs from "dayjs";
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
import { EditableShow } from "@/lib/shows/components/EditableShow";
import { PHOTOS_DIRNAME } from "@/lib/supabase/constants";

import { usePhotos } from "../hooks/usePhotos";

const editFields = (
  <>
    <EditableShow required={false} />
    <TextInput name="photographer" label="Photographer" required={false} />
    <TextInput name="description" label="Description" required={false} />
    <TextInput name="takenAt" label="Photo date" type="date" required={false} />
  </>
);

export const EditPhotoForm: React.FC<{
  props: FormikProps<PhotoPatchData>;
}> = ({ props }) => <form onSubmit={props.handleSubmit}>{editFields}</form>;

export const AddPhotoForm: React.FC<{
  props: FormikProps<PhotoFormData>;
}> = ({ props }) => (
  <form onSubmit={props.handleSubmit}>
    <PhotoUpload
      name="photoFile"
      required
      uploadDirname={PHOTOS_DIRNAME}
      maxThumbnailDimension={300}
      maxDimension={1000}
    />
    {editFields}
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
  const { addUploadedPhoto } = usePhotos();

  const initialValues = {
    photographer: "",
    showId: 0,
    photoFile: undefined,
    description: "",
    takenAt: dayjs().format("YYYY-MM-DD"),
  };

  const onSubmit = (values: PhotoFormData) => {
    if (values.photoFile)
      addUploadedPhoto({
        showId: values.showId,
        imagePath: values.imagePath,
        photographer: values.photographer,
        description: values.description,
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
      itemName="photo"
      FormFields={AddPhotoForm}
      // I'm tired of trying to find values that both satisfy typescript **and**
      // don't lead to an "uncontrolled to controlled field" error T.T
      // @ts-expect-error
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
    photographer: photo.photographer ?? "",
    showId: photo.showId ?? 0,
    description: photo.description ?? "",
    takenAt: photo.takenAt
      ? dayjs(photo.takenAt).format("YYYY-MM-DD")
      : dayjs(photo.createdAt).format("YYYY-MM-DD"),
  };

  const onSubmit = (values: PhotoPatchData) => {
    updatePhoto({
      id: photo.id,
      data: values,
    });
  };

  const formikConfig = {
    initialValues,
    validate: () => {},
    onSubmit,
  };

  const title =
    photo.description && photo.description.length > 0
      ? photo.description
      : photo.imagePath;

  return (
    <EditItemModal
      title={`Edit Photo ${title}`}
      itemName="photo"
      FormFields={EditPhotoForm}
      formikConfig={formikConfig}
      buttonType="edit"
    />
  );
};
