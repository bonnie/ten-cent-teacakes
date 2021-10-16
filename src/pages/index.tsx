// TODO: fix
// Firefox can’t establish a connection to the server at http://localhost:3000/_next/webpack-hmr?page=%2Fabout.

import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const tenCentLogoAltText =
    "Ten-Cent Teacakes logo: teacake with a tag reading '10¢', and a banner reading 'String Band'";
  return (
    <div className="flex flex-col justify-start items-center w-full h-full pl-30 pt-4 min-h-full">
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
    </div>
  );
}
