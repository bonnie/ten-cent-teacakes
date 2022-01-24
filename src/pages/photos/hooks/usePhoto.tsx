import { useQuery } from "react-query";

import { fetchPhoto } from "@/lib/photos";
import { PhotoWithShowAndVenue } from "@/lib/photos/types";
import { queryKeys } from "@/lib/react-query/query-keys";
import { useHandleError } from "@/lib/react-query/useHandleError";

export const usePhoto = ({
  photoId,
  routerIsReady,
}: {
  photoId: number;
  routerIsReady: boolean;
}): { photo: PhotoWithShowAndVenue | undefined } => {
  const { handleQueryError } = useHandleError();

  const { data: photo } = useQuery<PhotoWithShowAndVenue | undefined>(
    [queryKeys.photos, photoId],
    () => {
      if (routerIsReady) {
        return fetchPhoto(photoId);
      }
      return undefined;
    },
    { onError: handleQueryError },
  );

  return { photo };
};
