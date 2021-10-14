import React from "react";
import { IconType } from "react-icons";
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

type SocialLinkProps = {
  Icon: IconType;
  target: string;
  label: string;
};

const SocialLink: React.FC<SocialLinkProps> = ({ Icon, target, label }) => (
  <a
    href={target}
    key={label}
    aria-label={label}
    title={label}
    color="primary"
    target="_blank"
    rel="noreferrer"
  >
    <Icon size="50" />
  </a>
);

export const SocialLinks = () => (
  <>
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
  </>
);
