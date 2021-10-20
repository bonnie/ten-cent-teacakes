import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";

import {
  fetchMusiciansWithInstruments,
  MusicianWithInstruments,
} from "@/lib/api";
import { queryKeys } from "@/lib/react-query/query-keys";

import { MusicianCard } from "./MusicianCard";

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
  const { data: musicians = [] } = useQuery<MusicianWithInstruments[]>(
    queryKeys.musicians,
    fetchMusiciansWithInstruments,
  );
  const { user } = useUser();

  return (
    <div>
      <div className="flex flex-wrap justify-center items-stretch gap-5 mx-5">
        {musicians.map((musician) => (
          <MusicianCard key={musician.id} data={musician} />
        ))}
      </div>
    </div>
  );
};
