/* eslint-disable jsx-a11y/anchor-is-valid */
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { tw } from "twind";

import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { PhotoWithShowAndVenue } from "@/lib/photos/types";
import { getSupabaseStorageLink } from "@/lib/supabase/utils";

import { DeletePhotoModal } from "./DeletePhotoModal";
import { EditPhotoModal } from "./EditPhotoModal";

export const PhotoThumbnail: React.FC<{
  photo: PhotoWithShowAndVenue;
  photoDate: Date;
}> = ({ photo, photoDate }) => {
  const { user } = useWhitelistUser();
  const imgSrc = getSupabaseStorageLink(photo.imagePath);
  return (
    <div className={tw(["m-5", "flex", "flex-col", "items-center"])}>
      <Link href={`/photos/${photo.id}`}>
        <a>
          <Image
            className={tw([
              "border-solid",
              "border-4",
              "border-black",
              "object-contain",
              "hover:border-aqua-600",
              "hover:cursor-pointer",
            ])}
            src={imgSrc}
            alt={photo.description ?? "Ten-cent Teacakes"}
            width={240}
            height={240}
          />
        </a>
      </Link>
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
