import React from "react";
import { dehydrate, QueryClient } from "react-query";

import { fetchPhotos, getPhotoDate } from "@/lib/photos";
import { queryKeys } from "@/lib/react-query/query-keys";

import { usePhotos } from "../hooks/usePhotos";
import { PhotoThumbnail } from "./PhotoThumbnail";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(queryKeys.photos, fetchPhotos);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export const Photos: React.FC<{ count?: number }> = ({ count = undefined }) => {
  const { photos } = usePhotos();
  const photosSlice = count ? photos.slice(0, count) : photos;

  return (
    <div className="flex flex-wrap justify-center items-baseline">
      {photosSlice.map((photo, index, arr) => (
        <PhotoThumbnail
          key={photo.id}
          photo={photo}
          photoDate={getPhotoDate(photo)}
        />
      ))}
    </div>
  );
};

Photos.defaultProps = { count: undefined };
