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
      style={{ height: "80vh" }} /* TODO: standardize */
      className={tw(["flex", "flex-col", "items-center", "w-100", "mx-0"])}
    >
      <div className={tw(["grid", "grid-cols-8", "w-full", "basis-1/4"])}>
        <button
          type="button"
          className={tw(["hover:text-aqua-600", "place-self-center"])}
        >
          {prevIndex ? (
            <Link href={`/photos/${prevIndex}`}>
              <FaArrowLeft size={40} />
            </Link>
          ) : null}
        </button>
        <div className="col-span-6">
          <Heading>
            {dayjs(photoDate).format("MMM DD, YYYY")}
            {photo.showVenue ? ` at ${photo.showVenue.name}` : null}
          </Heading>
        </div>
        <button
          type="button"
          className={tw(["hover:text-aqua-600", "place-self-center"])}
        >
          {nextIndex ? (
            <Link href={`/photos/${nextIndex}`}>
              <FaArrowRight size={40} />
            </Link>
          ) : null}
        </button>
      </div>
      <div style={{ maxHeight: "75vh" }} className={tw(["mt-5"])}>
        <img
          style={{ maxHeight: "70vh" }}
          className={tw(["border-black", "border-solid", "border-8", "w-auto"])}
          src={`/${photo.imagePath}`}
          alt={photo.description ?? "Ten-Cent Teacakes"}
        />
        {photo.photographer ? (
          <p className="text-lg">Photo by {photo.photographer}</p>
        ) : null}
      </div>
    </div>
  ) : null;

  return contents;
};

export default Photo;
