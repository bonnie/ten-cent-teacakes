import React from "react";
import { dehydrate, QueryClient } from "react-query";
import { tw } from "twind";

import { fetchPhotos } from "@/lib/photos";
import { queryKeys } from "@/lib/react-query/query-keys";

import { usePhotos } from "../hooks/usePhotos";
import { PhotoThumbnail } from "./PhotoThumbnail";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(queryKeys.photos, ({ signal }) =>
    fetchPhotos(signal),
  );
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
    <div
      className={tw([
        "flex",
        "flex-wrap",
        "align-items-start",
        "justify-center",
      ])}
    >
      {photosSlice.map((photo) => (
        <PhotoThumbnail key={photo.id} photo={photo} />
      ))}
    </div>
  );
};

Photos.defaultProps = { count: undefined };
