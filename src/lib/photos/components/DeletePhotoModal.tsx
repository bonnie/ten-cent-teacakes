import dayjs from "dayjs";
import React from "react";

import { DeleteItemModal } from "@/components/lib/modals/DeleteItemModal";
import { getPhotoDate } from "@/lib/photos";
import { PhotoWithShowAndVenue } from "@/lib/photos/types";

import { usePhotos } from "../hooks/usePhotos";

export const DeletePhotoModal: React.FC<{ photo: PhotoWithShowAndVenue }> = ({
  photo,
}) => {
  const { deletePhoto } = usePhotos();
  const description = `Delete photo from ${dayjs(getPhotoDate(photo)).format(
    "MMM DD YYYY",
  )}?`;
  return (
    <DeleteItemModal
      title="Delete Photo"
      description={description}
      handleDelete={() => deletePhoto(photo.id)}
    />
  );
};
