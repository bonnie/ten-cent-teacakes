import React from "react";
import { IconType } from "react-icons";
import { FiTwitter, FiYoutube } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { tw } from "twind";

import { Heading } from "@/components/lib/Heading";

import { EmailSignupForm } from "./components/EmailSignupForm";

const keywordClasses = ["font-bold", "text-aqua-700"];
const placementClasses = ["flex", "items-center", "mr-1.5"];
export const keywordLinkClasses = [
  ...keywordClasses,
  "hover:text-aqua-500",
  "hover:cursor-pointer",
];

const MoreElement: React.FC<{
  keyword: string;
  tagline: string;
  href?: string;
  Icon: IconType;
}> = ({ keyword, tagline, href = null, Icon }) => {
  const iconStyled = <Icon className="inline mr-2" />;
  const keywordStyled = href ? (
    <a
      className={tw([...placementClasses, ...keywordLinkClasses])}
      target="_blank"
      href={href}
      rel="noreferrer"
    >
      {iconStyled} {keyword}
    </a>
  ) : (
    <span className={tw([...keywordClasses, ...placementClasses])}>
      {iconStyled} {keyword}
    </span>
  );
  return (
    <p className="flex pt-8">
      {keywordStyled} {tagline}
    </p>
  );
};
MoreElement.defaultProps = {
  href: undefined,
};

const More: React.FC = () => (
  <div className="flex flex-col items-center">
    <Heading>More</Heading>
    <p className="font-heading text-center text-4xl text-aqua-700">
      more Teacakes, less than 10¢
    </p>
    <div className="flex flex-col text-2xl">
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
        keyword="Subscribe"
        tagline="to the mailing list."
        Icon={MdOutlineMail}
      />
      <EmailSignupForm />
    </div>
  </div>
);

export default More;
