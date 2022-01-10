import { useQuery } from "react-query";

import { fetchPhoto } from "@/lib/photos";
import { PhotoWithShowAndVenue } from "@/lib/photos/types";
import { queryKeys } from "@/lib/react-query/query-keys";
import { useHandleError } from "@/lib/react-query/useHandleError";

export const usePhoto = ({
  photoId,
}: {
  photoId: number;
}): { photo: PhotoWithShowAndVenue | undefined } => {
  const { handleQueryError } = useHandleError();

  const { data: photo } = useQuery<PhotoWithShowAndVenue>(
    [queryKeys.photos, photoId],
    () => fetchPhoto(photoId),
    { onError: handleQueryError },
  );

  return { photo };
};
