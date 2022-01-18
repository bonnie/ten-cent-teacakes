import React from "react";
import { dehydrate, QueryClient } from "react-query";

import { fetchPhotos, getPhotoDate } from "@/lib/photos";
import { queryKeys } from "@/lib/react-query/query-keys";

import { usePhotos } from "../hooks/usePhotos";
import { PhotoThumbnail } from "./PhotoThumbnail";

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(queryKeys.photos, fetchPhotos);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export const Photos: React.FC = () => {
  const { photos } = usePhotos();

  return (
    <div className="flex flex-wrap justify-center items-baseline">
      {photos.map((photo, index, arr) => (
        <PhotoThumbnail
          key={photo.id}
          photo={photo}
          photoDate={getPhotoDate(photo)}
        />
      ))}
    </div>
  );
};
