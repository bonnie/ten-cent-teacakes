import Head from "next/head";
import Image from "next/image";

import logo from "../../public/logo/logo-shadow.png";

export default function Home() {
  const tenCentLogoAltText =
    "Ten-Cent Teacakes logo: teacake with a tag reading '10¢', and a banner reading 'String Band'";
  return (
    <div className="flex flex-col justify-start items-center w-full h-full pl-30 pt-4 min-h-full">
      <Head>
        <title>Ten-Cent Teacakes String Band</title>
      </Head>
      <Image src={logo} alt={tenCentLogoAltText} />
      <p className="font-body text-2xl">
        Eclectic string band music and cheap baked goods
      </p>
    </div>
  );
}
