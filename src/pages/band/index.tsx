import Head from "next/head";
import React from "react";
import { tw } from "twind";

import { Heading } from "@/components/lib/Style/Heading";
import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { AddMusicianModal } from "@/lib/musicians/components/EditMusicianModal";
import { EditInstruments } from "@/lib/musicians/components/instruments/EditInstruments";
import { MusicianCard } from "@/lib/musicians/components/MusicianCard";
import { MusicianWithInstruments } from "@/lib/musicians/types";
import { getMusiciansSortAscending } from "@/lib/prisma/queries/musicians";

export async function getStaticProps() {
  // don't use client-style code (e.g. react-query or api calls) for getStaticProps
  // reference: https://nextjs.org/docs/basic-features/data-fetching/get-static-props#write-server-side-code-directly

  const musicians = await getMusiciansSortAscending();
  return {
    props: { musicians },
    revalidate: 3600, // one hour, in seconds
  };
}

const Musicians: React.FC<{
  musicians: MusicianWithInstruments[];
}> = ({ musicians }) => {
  const { user } = useWhitelistUser();

  return (
    <>
      <Head>
        <title>Ten-Cent Teacakes: The Band</title>
      </Head>
      <div className={tw(["w-full"])}>
        <Heading>The Band</Heading>
        {user ? (
          <div className={tw(["text-center"])}>
            <AddMusicianModal />
          </div>
        ) : null}
        <ul
          className={tw([
            "flex",
            "flex-wrap",
            "justify-center",
            "items-stretch mx-5",
          ])}
        >
          {musicians.map((musician) => (
            <MusicianCard key={musician.id} musician={musician} />
          ))}
        </ul>
        {user ? <EditInstruments /> : null}
      </div>
    </>
  );
};

export default Musicians;
