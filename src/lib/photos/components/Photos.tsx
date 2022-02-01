import React from "react";
import { dehydrate, QueryClient, useQueryClient } from "react-query";
import { tw } from "twind";

import { fetchPhotos, getPhotoDate } from "@/lib/photos";
import { queryKeys } from "@/lib/react-query/query-keys";
import { useWillUnmount } from "@/lib/react-query/useWillUnmount";

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
  const queryClient = useQueryClient();

  const cancelFetch = () => {
    queryClient.cancelQueries(queryKeys.photos);
  };
  const { isMountedRef } = useWillUnmount(cancelFetch);

  const { photos } = usePhotos();
  const photosSlice = count ? photos.slice(0, count) : photos;

  return (
    <div
      className={tw(["flex", "flex-wrap", "justify-center", "items-baseline"])}
    >
      {isMountedRef.current
        ? photosSlice.map((photo, index, arr) => (
            <PhotoThumbnail
              key={photo.id}
              photo={photo}
              photoDate={getPhotoDate(photo)}
            />
          ))
        : null}
    </div>
  );
};

Photos.defaultProps = { count: undefined };
