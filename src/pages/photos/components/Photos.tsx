import { Photo as PhotoType } from "@prisma/client";

import React from "react";

import { usePhotos } from "../hooks/usePhotos";

const Photo: React.FC<{ photo: PhotoType }> = ({ photo }) => (
  <div>{photo.imagePath}</div>
);

export const Photos: React.FC = () => {
  const { photos } = usePhotos();

  return (
    <div className="flex">
      {photos.map((photo) => (
        <Photo key={photo.id} photo={photo} />
      ))}
    </div>
  );
};
