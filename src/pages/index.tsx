/* eslint-disable @next/next/no-img-element */
import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import React from "react";
import { tw } from "twind";

import { InternalLinkKeyword } from "@/components/lib/Style/InternalLinkKeyword";
import { Section } from "@/components/lib/Style/Section";
import { validateUser } from "@/lib/auth/utils";
import { Photos } from "@/lib/photos/components/Photos";
import { getPhotosSortedByDate } from "@/lib/photos/dataManipulation";
import { PhotoWithShowAndVenue } from "@/lib/photos/types";
import { getSortedShows } from "@/lib/prisma/queries/shows";
import { ShowsGroup } from "@/lib/shows/components/ShowsGroup";
import { ShowWithVenue } from "@/lib/shows/types";
import { EmailSignupWithLabel } from "@/pages/more";

export async function getStaticProps() {
  const { upcomingShows } = await getSortedShows();
  const sortedPhotos = await getPhotosSortedByDate();

  return {
    // dates in shows and photos are not serializable
    props: {
      upcomingShowsJSON: JSON.stringify(upcomingShows),
      photosJSON: JSON.stringify(sortedPhotos),
    },
    revalidate: 60 * 60 * 24, // revalidate once a day to clear old shows
  };
}

export default function Home({
  upcomingShowsJSON,
  photosJSON,
}: {
  upcomingShowsJSON: string;
  photosJSON: string;
}) {
  const upcomingShows: Array<ShowWithVenue> = JSON.parse(upcomingShowsJSON);
  const photos: Array<PhotoWithShowAndVenue> = JSON.parse(photosJSON);

  const tenCentLogoAltText =
    "Ten-Cent Teacakes logo: teacake with a tag reading '10¢', and a banner reading 'String Band'";
  const { user } = useUser();

  React.useEffect(() => {
    // TODO: put this on other pages if redirecting to somewhere other than home page after login
    if (user && user.email) validateUser(user.email);
  }, [user]);

  return (
    <div
      className={tw([
        "flex",
        "flex-col",
        "justify-start",
        "items-center",
        "w-full",
        "h-full",
        "-mt-2",
        "mb-8",
      ])}
    >
      <Head>
        <title>Ten-Cent Teacakes String Band</title>
      </Head>
      <div>
        <img src="/logo/logo-shadow.png" alt={tenCentLogoAltText} />
      </div>
      <p className={tw(["text-2xl"])}>
        Eclectic string band music and cheap baked goods
      </p>
      <Section className={tw(["flex flex-col items-center"])}>
        <EmailSignupWithLabel />
      </Section>
      {upcomingShows.length > 0 ? (
        <Section>
          <ShowsGroup
            title="Upcoming Shows"
            shows={upcomingShows.slice(0, 3)}
          />
          <div className={tw(["text-center"])}>
            <InternalLinkKeyword href="/shows">More shows</InternalLinkKeyword>
          </div>
        </Section>
      ) : null}
      <Section>
        <Photos photos={photos} count={3} />
        <div className={tw(["text-center"])}>
          <InternalLinkKeyword href="/photos">More photos</InternalLinkKeyword>
        </div>
      </Section>
    </div>
  );
}
