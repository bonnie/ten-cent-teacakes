import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IconType } from "react-icons";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { tw } from "twind";

import { Heading } from "@/components/lib/Style/Heading";
import { InternalLinkKeyword } from "@/components/lib/Style/InternalLinkKeyword";
import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { getPhotoDate } from "@/lib/photos";

import { DeletePhotoModal } from "./components/DeletePhotoModal";
import { EditPhotoModal } from "./components/EditPhotoModal";
import { usePhoto } from "./hooks/usePhoto";
import { usePhotos } from "./hooks/usePhotos";

const AdvanceButton: React.FC<{
  Icon: IconType;
  linkIndex: number | null | undefined;
}> = ({ Icon, linkIndex }) => (
  <button
    type="button"
    className={tw([
      "hover:text-aqua-600",
      "place-self-center",
      "focus:outline-none",
    ])}
  >
    {linkIndex ? (
      <Link href={`/photos/${linkIndex}`}>
        <Icon size={25} />
      </Link>
    ) : null}
  </button>
);

const Photo: React.FC = () => {
  const { user } = useWhitelistUser();
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
      className={tw([
        "grid",
        "grid-cols-1",
        "grid-rows-6",
        "lg:grid-rows-8",
        "place-items-center",
        "w-full",
        "mx-0",
      ])}
    >
      <div className={tw(["grid", "grid-cols-8", "w-full"])}>
        <AdvanceButton Icon={FaArrowLeft} linkIndex={prevIndex} />
        <div className="col-span-6 flex justify-center items-center">
          {user ? (
            <div className="mr-5">
              <EditPhotoModal photo={photo} />
              <DeletePhotoModal photo={photo} />
            </div>
          ) : null}
          <Heading textSize="5xl">
            {dayjs(photoDate).format("MMM DD, YYYY")}
            {photo.showVenue ? ` at ${photo.showVenue.name}` : null}
          </Heading>
        </div>
        <AdvanceButton Icon={FaArrowRight} linkIndex={nextIndex} />
      </div>
      <div className={tw(["row-span-5", "lg:row-span-7", "h-full", "mb-3"])}>
        <img
          className={tw([
            "border-black",
            "border-solid",
            "border-8",
            "max-h-full",
            "w-auto",
            "mx-auto",
          ])}
          src={photo.imagePath}
          alt={photo.description ?? "Ten-Cent Teacakes"}
        />
        {photo.photographer ? (
          <p className="text-lg text-center">Photo by {photo.photographer}</p>
        ) : null}
      </div>
      <InternalLinkKeyword href="/photos" className="mt-5">
        Back to photos
      </InternalLinkKeyword>
    </div>
  ) : null;

  return contents;
};

export default Photo;
