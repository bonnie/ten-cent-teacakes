// TODO: fix
// Firefox can’t establish a connection to the server at http://localhost:3000/_next/webpack-hmr?page=%2Fabout.

import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Image from "next/image";
import React from "react";

import { validateUser } from "@/lib/auth/utils";
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
    <div className="flex flex-col justify-start items-center w-full h-full pl-30 min-h-full">
      <Head>
        <title>Ten-Cent Teacakes String Band</title>
      </Head>
      <Image
        src="/logo/logo-shadow.png"
        width={725}
        height={358}
        alt={tenCentLogoAltText}
        placeholder="blur"
        blurDataURL="/logo/logo-shadow-blur.png"
      />
      <p className="font-body text-2xl">
        Eclectic string band music and cheap baked goods
      </p>
      {upcomingShows.length > 0 ? (
        <div className="mt-10 w-full">
          <ShowsGroup
            title="Upcoming Shows"
            shows={upcomingShows.slice(0, 3)}
          />
        </div>
      ) : null}
    </div>
  );
}
