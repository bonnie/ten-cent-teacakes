/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IconType } from "react-icons";
import { CgSpinner } from "react-icons/cg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { tw } from "twind";

import { Heading } from "@/components/lib/Style/Heading";
import { InternalLinkKeyword } from "@/components/lib/Style/InternalLinkKeyword";
import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { getPhotoDate } from "@/lib/photos";
import { DeletePhotoModal } from "@/lib/photos/components/DeletePhotoModal";
import { EditPhotoModal } from "@/lib/photos/components/EditPhotoModal";
import { getNextAndPrevIndexes } from "@/lib/photos/dataManipulation";
import { usePhoto } from "@/lib/photos/hooks/usePhoto";
import { usePhotos } from "@/lib/photos/hooks/usePhotos";
import { getPhotoById, getPhotos } from "@/lib/prisma/queries/photos";
import { UPLOADS_BUCKET } from "@/lib/supabase/constants";
import { useSupabasePhoto } from "@/lib/supabase/hooks/useSupabasePhoto";

export async function getStaticProps({ params }: { params: { id: number } }) {
  const { id } = params;
  const idNum = Number(id);
  const photo = await getPhotoById(idNum);
  const nextAndPrevIndexes = await getNextAndPrevIndexes(idNum);

  // non-serializeable things
  return {
    props: {
      photoJSON: JSON.stringify(photo),
      nextAndPrevIndexes,
    },
  };
}

export async function getStaticPaths() {
  const photos = await getPhotos();

  const paths = photos.map((photo) => ({
    // date within photo not serializeable
    params: { id: photo.id.toString() },
  }));

  // Pre-render only these paths at build time.
  // { fallback: blocking } means pages for other paths
  //    get generated at request time (SSR).
  return { paths, fallback: "blocking" };
}

const AdvanceButton: React.FC<{
  Icon: IconType;
  linkIndex: number | null | undefined;
  label: "next" | "previous";
  hide: boolean;
}> = ({ Icon, linkIndex, label, hide }) =>
  hide ? null : (
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
            <Icon size={25} aria-label={`${label}-photo`} />
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
  const { photo } = usePhoto({ photoId });
  const { nextAndPrevIndexes } = usePhotos();

  const { imgSrc } = useSupabasePhoto(photo?.imagePath ?? null, UPLOADS_BUCKET);

  // TODO: this is pretty hack-y, but router.isReady is true even when it still
  // contains the [id] from the previous route, which leads to the wrong image
  // showing for half a second or so (without this check)
  const imageSrcMatches = imgSrc && photo && imgSrc.search(photo.imagePath) > 0;

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
        "mx-4",
      ])}
    >
      <div
        className={tw([
          "grid",
          "grid-cols-8",
          "w-full",
          photo.description && photo.showVenue
            ? "lg:row-span-2"
            : "lg:row-span-1",
        ])}
      >
        <div className={tw(["col-start-2", "col-span-6"])}>
          <div className={tw(["flex", "justify-center", "items-center"])}>
            {user ? (
              <div className={tw(["mr-5"])}>
                <EditPhotoModal photo={photo} />
                <DeletePhotoModal photo={photo} />
              </div>
            ) : null}
            <div className={tw(["flex", "flex-col", "items-center"])}>
              <Heading textSize="5xl">
                {dayjs(photoDate).format("MMM D, YYYY")}
                {photo.showVenue ? ` at ${photo.showVenue.name}` : null}
              </Heading>
              {photo.description ? <p>{photo.description}</p> : null}
            </div>
          </div>
          {photo.photographer ? (
            <p className={tw(["text-lg", "text-center"])}>
              Photo by {photo.photographer}
            </p>
          ) : null}
        </div>
      </div>
      <div
        className={tw([
          "row-span-3",
          "md:row-span-5",
          photo.description && photo.showVenue
            ? "lg:row-span-6"
            : "lg:row-span-7",
          "h-full",
          "mb-3",
          "w-full",
          "relative",
          "flex",
          "justify-center",
        ])}
      >
        <AdvanceButton
          Icon={FaArrowLeft}
          linkIndex={prevIndex}
          label="previous"
          hide={!imageSrcMatches}
        />
        {/* TODO: figure out how to use Image for optimization from Supabase */}
        {imgSrc && imageSrcMatches ? (
          <img
            className={tw(["shadow-xl", "h-full", "w-auto", "mx-auto"])}
            src={imgSrc}
            alt={photo.description ?? "Ten-Cent Teacakes"}
          />
        ) : (
          <div
            className={tw(["flex", "justify-center", "items-center", "h-full"])}
          >
            <CgSpinner className={tw(["animate-spin"])} size="6em" />
          </div>
        )}
        <AdvanceButton
          Icon={FaArrowRight}
          linkIndex={nextIndex}
          label="next"
          hide={!imageSrcMatches}
        />
      </div>
      <InternalLinkKeyword href="/photos" className={tw(["mt-5"])}>
        Back to photos
      </InternalLinkKeyword>
    </div>
  ) : null;

  return contents;
};

export default Photo;
