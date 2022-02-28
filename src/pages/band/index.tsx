import React from "react";
import { dehydrate, QueryClient, useQueryClient } from "react-query";
import { tw } from "twind";

import { Heading } from "@/components/lib/Style/Heading";
import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { fetchMusiciansWithInstruments } from "@/lib/musicians";
import { AddMusicianModal } from "@/lib/musicians/components/EditMusicianModal";
import { EditInstruments } from "@/lib/musicians/components/instruments/EditInstruments";
import { MusicianCard } from "@/lib/musicians/components/MusicianCard";
import { useMusicians } from "@/lib/musicians/hooks/useMusicians";
import { queryKeys } from "@/lib/react-query/query-keys";
import { useWillUnmount } from "@/lib/react-query/useWillUnmount";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryKeys.musicians, ({ signal }) =>
    fetchMusiciansWithInstruments(signal),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Musicians: React.FC = () => {
  const queryClient = useQueryClient();

  const cancelFetch = () => {
    queryClient.cancelQueries(queryKeys.musicians);
  };
  const { isMountedRef } = useWillUnmount(cancelFetch);

  const { musicians } = useMusicians();
  const { user } = useWhitelistUser();

  return (
    <div className={tw(["w-full"])}>
      <Heading>The Band</Heading>
      {isMountedRef.current && user ? (
        <div className={tw(["text-center"])}>
          <AddMusicianModal />
        </div>
      ) : null}
      <div
        className={tw([
          "flex",
          "flex-wrap",
          "justify-center",
          "items-stretch mx-5",
        ])}
      >
        {isMountedRef.current
          ? musicians.map((musician) => (
              <MusicianCard key={musician.id} musician={musician} />
            ))
          : null}
      </div>
      {isMountedRef.current && user ? <EditInstruments /> : null}
    </div>
  );
};

export default Musicians;
