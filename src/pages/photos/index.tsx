import Head from "next/head";
import React from "react";
import { tw } from "twind";

import { Heading } from "@/components/lib/Style/Heading";
import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { AddPhotoModal } from "@/lib/photos/components/EditPhotoModal";
import { Photos } from "@/lib/photos/components/Photos";

const PhotosPage: React.FC = () => {
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
      <Photos />
    </>
  );
};

export default PhotosPage;
