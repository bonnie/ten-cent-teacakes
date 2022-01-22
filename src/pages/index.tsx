import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Image from "next/image";
import React from "react";

import { InternalLinkKeyword } from "@/components/lib/Style/InternalLinkKeyword";
import { Section } from "@/components/lib/Style/Section";
import { validateUser } from "@/lib/auth/utils";
import { EmailSignupWithLabel } from "@/pages/more";
import { Photos } from "@/pages/photos/components/Photos";
import { ShowsGroup } from "@/pages/shows/components/ShowsGroup";
import { useShows } from "@/pages/shows/hooks/useShows";

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
    <div className="flex flex-col justify-start items-center w-full h-100 -mt-2 mb-8">
      <Head>
        <title>Ten-Cent Teacakes String Band</title>
      </Head>
      <div className="width-725 height-358">
        <Image
          src="/logo/logo-shadow.png"
          width={725}
          height={358}
          alt={tenCentLogoAltText}
          placeholder="blur"
          blurDataURL="/logo/logo-shadow-blur.png"
        />
      </div>
      <p className="font-body text-2xl">
        Eclectic string band music and cheap baked goods
      </p>
      <Section className="flex flex-col items-center">
        <EmailSignupWithLabel />
      </Section>
      {upcomingShows.length > 0 ? (
        <Section>
          <ShowsGroup
            title="Upcoming Shows"
            shows={upcomingShows.slice(0, 3)}
          />
          <InternalLinkKeyword href="/shows">
            <p className="text-center">More shows</p>
          </InternalLinkKeyword>
        </Section>
      ) : null}
      <Section>
        <Photos count={3} />
        <InternalLinkKeyword href="/photos">
          <p className="text-center">More photos</p>
        </InternalLinkKeyword>
      </Section>
    </div>
  );
}
