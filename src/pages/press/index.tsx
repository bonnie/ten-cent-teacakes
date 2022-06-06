/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import React from "react";
import { tw } from "twind";

import { Heading } from "@/components/lib/Style/Heading";
import { BAND_PHOTOS_BUCKET } from "@/lib/supabase/constants";
import { useSupabasePhoto } from "@/lib/supabase/hooks/useSupabasePhoto";

const PressPage: React.FC = () => {
  const { imgSrc: portraitImageSrc } = useSupabasePhoto(
    "tencent-teacakes-portrait.jpg",
    BAND_PHOTOS_BUCKET,
  );
  const { imgSrc: landscapeImageSrc } = useSupabasePhoto(
    "tencent-teacakes-landscape.jpg",
    BAND_PHOTOS_BUCKET,
  );

  return (
    <>
      <Head>
        <title>Ten-Cent Teacakes: Press</title>
      </Head>
      <Heading>Press</Heading>
      <div className={tw(["flex", "flex-col", "items-center"])}>
        <div style={{ maxWidth: "80%" }} className={tw(["mb-5"])}>
          The Ten-Cent Teacakes play stringed instruments from small to large
          and in between, with Greg on fiddle, Bonnie on bass, and Sarah on
          guitar and baritone uke (and sometimes the scandalously string-free
          accordion). Vocal harmonies round out the band&apos;s vintage sound.
          The Teacakes repertoire includes lots of swing tunes from the 1930s,
          with some occasional twang thrown — and a few cowboy songs from the
          1930s to tie it all together.
        </div>
        <div
          className={tw(["flex", "flex-row", "items-center", "justify-center"])}
        >
          <img
            style={{ maxWidth: "40%" }}
            className={tw(["mx-2"])}
            src={portraitImageSrc ?? "/logo/tencent-tag.svg"}
            alt={
              portraitImageSrc
                ? "Ten-Cent Teacakes band with instruments, portrait orientation"
                : "loading"
            }
          />
          <img
            style={{ maxWidth: "40%" }}
            className={tw(["mx-2"])}
            src={landscapeImageSrc ?? "/logo/tencent-tag.svg"}
            alt={
              landscapeImageSrc
                ? "Ten-Cent Teacakes band with instruments, landscape orientation"
                : "loading"
            }
          />
        </div>
      </div>
    </>
  );
};
export default PressPage;
