import dayjs from "dayjs";
import React from "react";
import { tw } from "twind";

import { getPhotoDate } from "@/lib/photos";
import { PhotoWithShowAndVenue } from "@/lib/photos/types";

import { usePhotos } from "../hooks/usePhotos";

const Photo: React.FC<{ photo: PhotoWithShowAndVenue; photoDate: Date }> = ({
  photo,
  photoDate,
}) => (
  <div className={tw(["m-5", "flex", "flex-col", "items-center"])}>
    <img
      className={tw(["max-w-48 max-h-48 border-solid border-4 border-black"])}
      src={photo.imagePath}
      alt="Ten-cent Teacakes"
    />
    <p className="text-center text-sm">
      {dayjs(photoDate).format("MMM DD YYYY")}
      {photo.showVenue ? ` at ${photo.showVenue.name}` : null}
    </p>
  </div>
);

export const Photos: React.FC = () => {
  const { photos } = usePhotos();

  return (
    <div className="flex flex-wrap justify-center items-center">
      {photos.map((photo) => (
        <Photo key={photo.id} photo={photo} photoDate={getPhotoDate(photo)} />
      ))}
    </div>
  );
};
