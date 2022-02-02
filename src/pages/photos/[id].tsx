/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
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
import { DeletePhotoModal } from "@/lib/photos/components/DeletePhotoModal";
import { EditPhotoModal } from "@/lib/photos/components/EditPhotoModal";
import { usePhoto } from "@/lib/photos/hooks/usePhoto";
import { usePhotos } from "@/lib/photos/hooks/usePhotos";
import { useSupabasePhoto } from "@/lib/supabase/hooks/useSupabasePhoto";

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
        <a>
          <Icon size={25} />
        </a>
      </Link>
    ) : null}
  </button>
);

const Photo: React.FC = () => {
  const { user } = useWhitelistUser();
  const router = useRouter();
  const { id } = router.query;
  const photoId = Number(id);
  const { photo } = usePhoto({ photoId, routerIsReady: router.isReady });
  const { nextAndPrevIndexes } = usePhotos();

  const { imgSrc } = useSupabasePhoto(photo?.imagePath ?? null);

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
        <div
          className={tw([
            "col-span-6",
            "flex",
            "justify-center",
            "items-center",
          ])}
        >
          {user ? (
            <div className={tw(["mr-5"])}>
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
      <div
        className={tw([
          "row-span-5",
          "lg:row-span-7",
          "h-full",
          "mb-3",
          "w-full",
          "relative",
        ])}
      >
        {imgSrc ? (
          <Image
            className={tw([
              "border-black",
              "border-solid",
              "border-8",
              "h-full",
              "w-auto",
              "mx-auto",
            ])}
            src={imgSrc}
            alt={photo.description ?? "Ten-Cent Teacakes"}
            layout="fill"
            objectFit="contain"
          />
        ) : null}
        {photo.photographer ? (
          <p className={tw(["text-lg", "text-center"])}>
            Photo by {photo.photographer}
          </p>
        ) : null}
      </div>
      <InternalLinkKeyword href="/photos" className={tw(["mt-5"])}>
        Back to photos
      </InternalLinkKeyword>
    </div>
  ) : null;

  return contents;
};

export default Photo;
