import React from "react";
import { dehydrate, QueryClient } from "react-query";

import { Heading } from "@/components/lib/Style/Heading";
import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { fetchMusiciansWithInstruments } from "@/lib/musicians";
import { AddMusicianModal } from "@/lib/musicians/components/EditMusicianModal";
import { EditInstruments } from "@/lib/musicians/components/instruments/EditInstruments";
import { MusicianCard } from "@/lib/musicians/components/MusicianCard";
import { useMusicians } from "@/lib/musicians/hooks/useMusicians";
import { queryKeys } from "@/lib/react-query/query-keys";

export async function getServerSideProps() {
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

const Musicians: React.FC = () => {
  const { musicians } = useMusicians();
  const { user } = useWhitelistUser();

  return (
    <div className="w-full">
      <Heading>The Band</Heading>
      {user ? (
        <div className="text-center">
          <AddMusicianModal />
        </div>
      ) : null}
      <div className="flex flex-wrap justify-center items-stretch mx-5">
        {musicians.map((musician) => (
          <MusicianCard key={musician.id} musician={musician} />
        ))}
      </div>
      {user ? <EditInstruments /> : null}
    </div>
  );
};

export default Musicians;
