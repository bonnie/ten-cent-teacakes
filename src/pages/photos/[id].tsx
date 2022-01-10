import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { tw } from "twind";

import { Button } from "@/components/lib/Button";
import { Heading } from "@/components/lib/Heading";
import { useToast } from "@/components/toasts/useToast";
import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { getPhotoDate } from "@/lib/photos";
import { PhotoWithShowAndVenue } from "@/lib/photos/types";

import { DeletePhotoModal } from "./components/DeletePhotoModal";
import { EditPhotoModal } from "./components/EditPhotoModal";
import { usePhoto } from "./hooks/usePhoto";
import { usePhotos } from "./hooks/usePhotos";

const Photo = () => {
  const router = useRouter();
  const { id } = router.query;
  const photoId = Number(id);
  const { photo } = usePhoto({ photoId });
  const { nextAndPrevIndexes } = usePhotos();

  if (Number.isNaN(photoId)) {
    return <Heading>Photo not found</Heading>;
  }
  let nextIndex;
  let prevIndex;
  if (nextAndPrevIndexes[photoId]) {
    nextIndex = nextAndPrevIndexes[photoId].next;
    prevIndex = nextAndPrevIndexes[photoId].prev;
  }

  const photoDate = photo ? getPhotoDate(photo) : undefined;

  const contents = photo ? (
    <div
      className={tw([
        "flex",
        "flex-col",
        "items-center",
        "w-100",
        "mx-0",
        "h-100",
      ])}
    >
      <div className={tw(["flex", "items-start", "justify-around", "w-100"])}>
        <button type="button" className={tw(["hover:text-aqua-600 basis-1/8"])}>
          {prevIndex ? (
            <Link href={`/photos/${prevIndex}`}>
              <FaArrowLeft size={40} />
            </Link>
          ) : null}
        </button>
        <Heading>
          {dayjs(photoDate).format("MMM DD, YYYY")}
          {photo.showVenue ? ` at ${photo.showVenue.name}` : null}
        </Heading>
        <button type="button" className={tw(["hover:text-aqua-600 basis-1/8"])}>
          {nextIndex ? (
            <Link href={`/photos/${nextIndex}`}>
              <FaArrowRight size={40} />
            </Link>
          ) : null}
        </button>
      </div>
      <img
        className={tw([
          "border-black",
          "border-solid",
          "border-8",
          "basis-3/4",
          "mt-5",
          "max-h-100",
        ])}
        src={`/${photo.imagePath}`}
        alt={photo.description ?? "Ten-Cent Teacakes"}
      />
      {photo.photographer ? (
        <p className="text-lg">Photo by {photo.photographer}</p>
      ) : null}
    </div>
  ) : null;

  return contents;
};

export default Photo;
