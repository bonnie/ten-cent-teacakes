import React from "react";
import { tw } from "twind";

import { PhotoWithShowAndVenue } from "@/lib/photos/types";

import { usePhotos } from "../hooks/usePhotos";

const Photo: React.FC<{ photo: PhotoWithShowAndVenue }> = ({ photo }) => (
  <div className={tw(["m-5"])}>
    <img
      className={tw(["max-w-48 max-h-48 border-solid border-4 border-black"])}
      src={photo.imagePath}
      alt="Ten-cent Teacakes"
    />
    <p className="text-center text-sm">
      {photo.showVenue ? photo.showVenue.name : null}
    </p>
  </div>
);

export const Photos: React.FC = () => {
  const { photos } = usePhotos();
  console.log(photos);

  return (
    <div className="flex flex-wrap justify-center items-center">
      {photos.map((photo) => (
        <Photo key={photo.id} photo={photo} />
      ))}
    </div>
  );
};
