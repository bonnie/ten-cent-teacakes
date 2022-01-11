import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { tw } from "twind";

import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { getPhotoDate } from "@/lib/photos";
import { PhotoWithShowAndVenue } from "@/lib/photos/types";

import { usePhotos } from "../hooks/usePhotos";
import { DeletePhotoModal } from "./DeletePhotoModal";
import { EditPhotoModal } from "./EditPhotoModal";

export type NextAndPrev = {
  next: number | null;
  prev: number | null;
};
export type NextAndPrevObject = Record<number, NextAndPrev>;

const PhotoThumbnail: React.FC<{
  photo: PhotoWithShowAndVenue;
  photoDate: Date;
  // nextId: number;
  // prevId: number;
}> = ({
  photo,
  photoDate,
  // nextId, prevId
}) => {
  const { user } = useWhitelistUser();
  return (
    <div className={tw(["m-5", "flex", "flex-col", "items-center"])}>
      <Link href={`/photos/${photo.id}`}>
        <img
          className={tw([
            "max-w-48",
            "max-h-48",
            "border-solid",
            "border-4",
            "border-black",
            "object-contain",
            "hover:border-aqua-600",
          ])}
          src={`/${photo.imagePath}`}
          alt={photo.description ?? "Ten-cent Teacakes"}
        />
      </Link>
      <p className="text-center text-md">
        {dayjs(photoDate).format("MMM DD, YYYY")}
        {photo.showVenue ? ` at ${photo.showVenue.name}` : null}
      </p>
      <p className="text-sm">
        {photo.photographer ? `taken by ${photo.photographer}` : <br />}
      </p>
      {user ? (
        <div>
          <EditPhotoModal photo={photo} />
          <DeletePhotoModal photo={photo} />
        </div>
      ) : null}
    </div>
  );
};

export const Photos: React.FC = () => {
  const { photos } = usePhotos();

  // got inconsistent results in Firefox vs. Chrome calculating this using
  // onSuccess in useQuery; one used sorted data, the other didn't.
  // const nextAndPrevIndexes = useMemo(() => {
  //   const tempNextAndPrev: NextAndPrevObject = [];
  //   photos.forEach((photo, index) => {
  //     tempNextAndPrev[photo.id] = {
  //       next: photos[index + 1] ? photos[index + 1].id : null,
  //       prev: photos[index - 1] ? photos[index - 1].id : null,
  //     };
  //   });
  //   return tempNextAndPrev;
  // }, [photos]);

  return (
    <div className="flex flex-wrap justify-center items-baseline">
      {photos.map((photo, index, arr) => (
        <PhotoThumbnail
          key={photo.id}
          photo={photo}
          photoDate={getPhotoDate(photo)}
          // nextId={arr[index + 1] ? arr[index + 1].id : null}
          // prevId={arr[index - 1] ? arr[index - 1].id : null}
        />
      ))}
    </div>
  );
};
