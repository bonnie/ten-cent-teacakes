import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { tw } from "twind";

type NavLinkProps = { href: string; pageName: string; setInactive: () => void };

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  pageName,
  setInactive,
}) => {
  const { route } = useRouter();
  return (
    <Link href={href} passHref>
      <button
        type="button"
        onClick={setInactive}
        className={tw([
          "md:inline-flex",
          "md:w-auto",
          "w-full",
          "h-full",
          "text-3xl",
          "mx-1",
          "px-3",
          "text-aqua-300",
          "rounded-lg",
          "font-display",
          "items-center",
          "justify-center",
          "hover:bg-aqua-700",
          `${route === href ? "bg-aqua-700" : null}`,
          "focus:outline-none",
          "md:py-3",
          "lg:py-5",
        ])}
      >
        <Image
          src={`/nav-banners/${pageName}-light.png`}
          // TODO: height should increase as page width gets smaller
          height={100}
          width={240}
          alt={`banner containing the word ${pageName}`}
          placeholder="blur"
          blurDataURL={`/nav-banners/${pageName}-light-blur.png`}
        />
      </button>
    </Link>
  );
};
