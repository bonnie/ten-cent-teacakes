import Head from "next/head";
import React from "react";
import { tw } from "twind";

import { Heading } from "@/components/lib/Style/Heading";
import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { AddPhotoModal } from "@/lib/photos/components/EditPhotoModal";
import { Photos } from "@/lib/photos/components/Photos";
import { getPhotosSortedByDate } from "@/lib/photos/dataManipulation";
import { PhotoWithShowAndVenue } from "@/lib/photos/types";

export async function getStaticProps() {
  const sortedPhotos = await getPhotosSortedByDate();

  return {
    // dates in photos are not serializable
    props: {
      photosJSON: JSON.stringify(sortedPhotos),
    },
  };
}

const PhotosPage: React.FC<{ photosJSON: string }> = ({ photosJSON }) => {
  const photos: Array<PhotoWithShowAndVenue> = JSON.parse(photosJSON);
  const { user } = useWhitelistUser();

  return (
    <>
      <Head>
        <title>Ten-Cent Teacakes: Photos</title>
      </Head>
      <Heading>Photos</Heading>
      {user ? (
        <div className={tw(["text-center"])}>
          <AddPhotoModal />
        </div>
      ) : null}
      <Photos photos={photos} />
    </>
  );
};

export default PhotosPage;
