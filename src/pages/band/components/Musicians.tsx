import React from "react";
import { dehydrate, QueryClient } from "react-query";

import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { fetchMusiciansWithInstruments } from "@/lib/musicians";
import { queryKeys } from "@/lib/react-query/query-keys";

import { useMusicians } from "../hooks/useMusicians";
import { AddMusicianModal } from "./EditMusicianModal";
import { MusicianCard } from "./MusicianCard";

// TODO: put in separate file
export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    queryKeys.musicians,
    fetchMusiciansWithInstruments,
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export const Musicians: React.FC = () => {
  const { musicians } = useMusicians();
  const { user } = useWhitelistUser();

  return (
    <div>
      <div className="flex flex-wrap justify-center items-stretch mx-5">
        {musicians.map((musician) => (
          <MusicianCard key={musician.id} data={musician} />
        ))}
      </div>
    </div>
  );
};
