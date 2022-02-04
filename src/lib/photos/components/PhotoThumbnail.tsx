/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { tw } from "twind";

import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { getPhotoDate } from "@/lib/photos";
import { PhotoWithShowAndVenue } from "@/lib/photos/types";
import { useSupabasePhoto } from "@/lib/supabase/hooks/useSupabasePhoto";

import { DeletePhotoModal } from "./DeletePhotoModal";
import { EditPhotoModal } from "./EditPhotoModal";

export const PhotoThumbnail: React.FC<{
  photo: PhotoWithShowAndVenue;
}> = ({ photo }) => {
  const { user } = useWhitelistUser();
  const { imgSrc } = useSupabasePhoto(photo.imagePath);
  const photoDate = getPhotoDate(photo);

  return (
    <div
      className={tw([
        "m-5",
        "flex",
        "flex-col",
        "items-center",
        "justify-self-start",
        "self-start",
      ])}
    >
      <Link href={`/photos/${photo.id}`} passHref>
        <div
          style={{ height: "240px", width: "240px" }}
          className={tw([
            "text-aqua-100",
            "bg-aqua-200",
            "rounded-lg",
            "p-4",
            "hover:border-aqua-300",
            "hover:cursor-pointer",
            "border-solid",
            "border-8",
            "border-aqua-200",
            "flex",
            "items-center",
            "justify-items-center",
            "justify-baseline",
          ])}
        >
          <img
            style={{ maxHeight: "200px", maxWidth: "200px" }}
            className={tw(["mx-auto", "my-auto", "align-center"])}
            src={imgSrc ?? "/logo/tencent-tag.svg"}
            alt={photo.description ?? "Ten-cent Teacakes"}
          />
        </div>
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
