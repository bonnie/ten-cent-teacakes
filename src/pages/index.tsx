import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { tw } from "twind";

import { validateUser } from "@/lib/auth/utils";
import { EmailSignupWithLabel, keywordLinkClasses } from "@/pages/more";
import { Photos } from "@/pages/photos/components/Photos";
import { ShowsGroup } from "@/pages/shows/components/ShowsGroup";
import { useShows } from "@/pages/shows/hooks/useShows";

const section = tw(["mt-10", "w-full", "pt-4", "border-t-8", "border-dotted"]);

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
      <div className={tw([section, "flex", "flex-col", "items-center"])}>
        <EmailSignupWithLabel />
      </div>
      {upcomingShows.length > 0 ? (
        <div className={section}>
          <ShowsGroup
            title="Upcoming Shows"
            shows={upcomingShows.slice(0, 3)}
          />
          <Link href="/shows">
            <p className={tw([...keywordLinkClasses, "text-center"])}>
              More shows
            </p>
          </Link>
        </div>
      ) : null}
      <div className={section}>
        <Photos count={3} />
        <Link href="/photos">
          <p className={tw([...keywordLinkClasses, "text-center"])}>
            More photos
          </p>
        </Link>
      </div>
    </div>
  );
}
