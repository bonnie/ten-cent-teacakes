/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import React from "react";
import { tw } from "twind";

import { Heading } from "@/components/lib/Style/Heading";

const PressPage: React.FC = () => (
  <>
    <Head>
      <title>Ten-Cent Teacakes: Press</title>
    </Head>
    <Heading>Press</Heading>
    <div className={tw(["flex", "flex-col", "items-center"])}>
      <div style={{ maxWidth: "80%" }} className={tw(["mb-5"])}>
        The Ten-Cent Teacakes play stringed instruments from small to large and
        in between, with Greg on fiddle, Bonnie on bass, and Sarah on guitar and
        baritone uke (and sometimes the scandalously string-free accordion).
        Vocal harmonies round out the band&apos;s vintage sound. The Teacakes
        repertoire includes lots of swing tunes from the 1930s, with some
        occasional twang thrown — and a few cowboy songs from the 1930s to tie
        it all together.
      </div>
      <div
        className={tw(["flex", "flex-row", "items-center", "justify-center"])}
      >
        <img
          style={{ maxWidth: "40%" }}
          className={tw(["mx-2"])}
          src="https://wyufqvnodwtulzadnbnf.supabase.co/storage/v1/object/sign/band-photos/tencent-teacakes-portrait.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYW5kLXBob3Rvcy90ZW5jZW50LXRlYWNha2VzLXBvcnRyYWl0LmpwZyIsImlhdCI6MTY1NDUzMDc5OCwiZXhwIjoxOTY5ODkwNzk4fQ.bZ6q8XS67LdTNcBrC2utToB-k84k7Vx-kpSdJ_XKmO0&t=2022-06-06T15%3A53%3A18.484Z"
          alt="Ten-Cent Teacakes band with instruments, portrait orientation"
        />
        <img
          style={{ maxWidth: "40%" }}
          className={tw(["mx-2"])}
          src="https://wyufqvnodwtulzadnbnf.supabase.co/storage/v1/object/sign/band-photos/tencent-teacakes-landscape.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYW5kLXBob3Rvcy90ZW5jZW50LXRlYWNha2VzLWxhbmRzY2FwZS5qcGciLCJpYXQiOjE2NTQ1MzEzOTksImV4cCI6MTk2OTg5MTM5OX0.6rHHNd6rHX22ovnphk0X0nMGiWCKnKe9GxHtcPFHcnw&t=2022-06-06T16%3A03%3A19.315Z"
          alt="Ten-Cent Teacakes band with instruments, landscape orientation"
        />
      </div>
    </div>
  </>
);

export default PressPage;
