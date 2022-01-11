import { useQuery } from "react-query";

import { fetchMusiciansWithInstruments } from "@/lib/musicians";
import { MusicianWithInstruments } from "@/lib/musicians/types";
import { queryKeys } from "@/lib/react-query/query-keys";

export const useMusicians = () => {
  const { data: musicians = [] } = useQuery<MusicianWithInstruments[]>(
    queryKeys.musicians,
    fetchMusiciansWithInstruments,
  );

  return { musicians };
};
