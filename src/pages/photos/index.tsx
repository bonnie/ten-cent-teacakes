import React from "react";

import { Heading } from "@/components/lib/Style/Heading";
import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { AddPhotoModal } from "@/lib/photos/components/EditPhotoModal";
import { Photos } from "@/lib/photos/components/Photos";

const PhotosPage: React.FC = () => {
  const { user } = useWhitelistUser();

  return (
    <>
      <Heading>Photos</Heading>
      {user ? (
        <div className="text-center">
          <AddPhotoModal />
        </div>
      ) : null}
      <Photos />
    </>
  );
};

export default PhotosPage;
