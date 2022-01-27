import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { tw } from "twind";

import { InternalLinkKeyword } from "@/components/lib/Style/InternalLinkKeyword";
import { Section } from "@/components/lib/Style/Section";
import { validateUser } from "@/lib/auth/utils";
import { Photos } from "@/lib/photos/components/Photos";
import { ShowsGroup } from "@/lib/shows/components/ShowsGroup";
import { useShows } from "@/lib/shows/hooks/useShows";
import { EmailSignupWithLabel } from "@/pages/more";

export default function Home() {
  const tenCentLogoAltText =
    "Ten-Cent Teacakes logo: teacake with a tag reading '10¢', and a banner reading 'String Band'";
  const { user } = useUser();
  const { upcomingShows } = useShows();

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
        <Image
          src="/logo/logo-shadow.png"
          width={725}
          height={358}
          alt={tenCentLogoAltText}
          placeholder="blur"
          blurDataURL="/logo/logo-shadow-blur.png"
        />
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
        <Photos count={3} />
        <div className={tw(["text-center"])}>
          <InternalLinkKeyword href="/photos">More photos</InternalLinkKeyword>
        </div>
      </Section>
    </div>
  );
}
