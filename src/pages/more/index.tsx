import Head from "next/head";
import React from "react";
import { IconType } from "react-icons";
import { BiChat } from "react-icons/bi";
import { FiTwitter, FiYoutube } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { tw } from "twind";

import { Heading } from "@/components/lib/Style/Heading";
import { Keyword } from "@/components/lib/Style/Keyword";
import { LinkKeyword } from "@/components/lib/Style/LinkKeyword";
import { EmailSignupForm } from "@/lib/more/components/EmailSignupForm";

const placementClasses = ["flex", "items-center", "mr-1.5"];

const MoreElement: React.FC<{
  keyword: string;
  tagline: string;
  href?: string;
  Icon: IconType;
}> = ({ keyword, tagline, href = null, Icon }) => {
  const iconStyled = <Icon className={tw(["inline", "mr-2"])} />;
  const keywordStyled = href ? (
    <LinkKeyword className={placementClasses} href={href}>
      {iconStyled} {keyword}
    </LinkKeyword>
  ) : (
    <Keyword className={placementClasses}>
      {iconStyled} {keyword}
    </Keyword>
  );
  return (
    <div className={tw(["flex", "pt-8", "text-2xl"])}>
      {keywordStyled} {tagline}
    </div>
  );
};
MoreElement.defaultProps = {
  href: undefined,
};

export const EmailSignupWithLabel: React.FC = () => (
  <>
    <MoreElement
      keyword="Subscribe"
      tagline="to our mailing list."
      Icon={MdOutlineMail}
    />
    <EmailSignupForm />
  </>
);

const More: React.FC = () => (
  <>
    <Head>
      <title>Ten-Cent Teacakes: More</title>
    </Head>
    <div className={tw(["flex", "flex-col", "items-center"])}>
      <Heading>More</Heading>
      <p
        className={tw([
          "font-display",
          "text-center",
          "text-4xl",
          "text-aqua-700",
        ])}
      >
        more Teacakes, less than 10¢
      </p>
      <div className={tw(["flex", "flex-col"])}>
        <MoreElement
          keyword="Watch"
          tagline="videos on YouTube."
          href="https://www.youtube.com/channel/UCPSpw7w0yCJ4MNuUpBiALxw"
          Icon={FiYoutube}
        />
        <MoreElement
          keyword="Follow"
          tagline="on Twitter."
          href="https://twitter.com/TenCentTeacakes"
          Icon={FiTwitter}
        />
        <MoreElement
          keyword="Contact us"
          tagline="at info@tencentteacakes.com"
          Icon={BiChat}
        />
        <EmailSignupWithLabel />
      </div>
    </div>
  </>
);

export default More;
