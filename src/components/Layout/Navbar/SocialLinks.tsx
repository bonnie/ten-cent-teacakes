import React from "react";
import { IconType } from "react-icons";
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";
import { tw } from "twind";

type SocialLinkProps = {
  Icon: IconType;
  target: string;
  label: string;
};

const SocialLink: React.FC<SocialLinkProps> = ({ Icon, target, label }) => (
  <div className={tw(["rounded-lg", "hover:text-aqua-700", "min-h-full"])}>
    <a
      href={target}
      key={label}
      aria-label={label}
      title={label}
      color="primary"
      target="_blank"
      rel="noreferrer"
    >
      <Icon size="30" />
    </a>
  </div>
);

export const SocialLinks = () => (
  <div className={tw(["flex", "space-x-2"])}>
    <SocialLink
      Icon={AiFillTwitterCircle}
      label="Twitter"
      target="https://twitter.com/TenCentTeacakes"
    />
    <SocialLink
      Icon={AiFillYoutube}
      label="YouTube"
      target="https://www.youtube.com/channel/UCPSpw7w0yCJ4MNuUpBiALxw/"
    />
  </div>
);
