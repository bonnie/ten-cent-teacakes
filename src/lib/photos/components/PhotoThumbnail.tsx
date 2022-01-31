/* eslint-disable jsx-a11y/anchor-is-valid */
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { tw } from "twind";

import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { PhotoWithShowAndVenue } from "@/lib/photos/types";
import { useSupabasePhoto } from "@/lib/supabase/hooks/useSupabasePhoto";

import { DeletePhotoModal } from "./DeletePhotoModal";
import { EditPhotoModal } from "./EditPhotoModal";

export const PhotoThumbnail: React.FC<{
  photo: PhotoWithShowAndVenue;
  photoDate: Date;
}> = ({ photo, photoDate }) => {
  const { user } = useWhitelistUser();
  const { imgSrc } = useSupabasePhoto(photo.imagePath);

  return (
    <div className={tw(["m-5", "flex", "flex-col", "items-center"])}>
      <div
        className={tw([
          "text-aqua-100",
          "bg-black",
          "rounded-lg",
          "p-4",
          "hover:border-aqua-600",
          "hover:cursor-pointer",
          "border-solid",
          "border-4",
          "border-black",
        ])}
      >
        <Link href={`/photos/${photo.id}`}>
          <a>
            {imgSrc ? (
              <Image
                className={tw(["object-contain"])}
                src={imgSrc}
                alt={photo.description ?? "Ten-cent Teacakes"}
                width={photo.pixelWidth}
                height={photo.pixelHeight}
              />
            ) : null}
          </a>
        </Link>
      </div>
      <p className={tw(["text-center"])}>
        {dayjs(photoDate).format("MMM DD, YYYY")}
        {photo.showVenue ? ` at ${photo.showVenue.name}` : null}
      </p>
      <p className={tw(["text-sm"])}>
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
