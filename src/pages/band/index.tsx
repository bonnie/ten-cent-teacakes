import Head from "next/head";
import React from "react";
import { tw } from "twind";

import { Heading } from "@/components/lib/Style/Heading";
import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { InstrumentWithMusicianCount } from "@/lib/instruments/types";
import { AddMusicianModal } from "@/lib/musicians/components/EditMusicianModal";
import { EditInstruments } from "@/lib/musicians/components/instruments/EditInstruments";
import { MusicianCard } from "@/lib/musicians/components/MusicianCard";
import { MusicianWithInstruments } from "@/lib/musicians/types";
import { getInstruments } from "@/lib/prisma/queries/instruments";
import { getMusiciansSortAscending } from "@/lib/prisma/queries/musicians";

export async function getStaticProps() {
  const musicians = await getMusiciansSortAscending();
  const instruments = await getInstruments();

  return {
    props: { musicians, instruments },
  };
}

const Musicians: React.FC<{
  musicians: Array<MusicianWithInstruments>;
  instruments: Array<InstrumentWithMusicianCount>;
}> = ({ musicians, instruments }) => {
  const { user } = useWhitelistUser();

  return (
    <>
      <Head>
        <title>Ten-Cent Teacakes: Shows</title>
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
        {user ? <EditInstruments instruments={instruments} /> : null}
      </div>
    </>
  );
};

export default Musicians;
