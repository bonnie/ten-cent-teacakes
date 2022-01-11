import Image from "next/image";
import Link from "next/link";
import React from "react";
import { tw } from "twind";

type NavLinkProps = { href: string; pageName: string; setInactive: () => void };

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  pageName,
  setInactive,
}) => (
  <Link href={href}>
    <button
      type="button"
      onClick={setInactive}
      className={tw([
        "lg:inline-flex",
        "lg:w-auto",
        "w-full",
        "text-3xl",
        "px-3",
        "py-2",
        "text-aqua-300",
        "rounded-lg",
        "font-heading",
        "items-center",
        "justify-center",
        "hover:bg-aqua-700",
      ])}
    >
      <Image
        src={`/nav-banners/${pageName}-light.png`}
        height={80}
        width={180}
        alt={`banner containing the word ${pageName}`}
        placeholder="blur"
        blurDataURL={`/nav-banners/${pageName}-light-blur.png`}
      />
    </button>
  </Link>
);
