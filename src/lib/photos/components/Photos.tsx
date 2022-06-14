import React from "react";
import { tw } from "twind";

import { PhotoWithShowAndVenue } from "@/lib/photos/types";

import { PhotoThumbnail } from "./PhotoThumbnail";

export const Photos: React.FC<{
  photos: Array<PhotoWithShowAndVenue>;
  count?: number;
}> = ({ photos, count = undefined }) => {
  const photosSlice = count ? photos.slice(0, count) : photos;

  return (
    <div
      className={tw([
        "flex",
        "flex-wrap",
        "align-items-start",
        "justify-center",
      ])}
    >
      {photosSlice.map((photo) => (
        <PhotoThumbnail key={photo.id} photo={photo} />
      ))}
    </div>
  );
};

Photos.defaultProps = { count: undefined };
