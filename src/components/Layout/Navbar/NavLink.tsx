/* eslint-disable @next/next/no-img-element */
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
        style={{ maxWidth: "200px" }}
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
          `${route === href ? "bg-aqua-700" : ""}`,
          "focus:outline-none",
          "md:py-3",
          "lg:py-5",
        ])}
      >
        <img
          style={{ height: "25px", width: "300px" }}
          src={`/nav-banners/${pageName}.png`}
          // TODO: height should increase as page width gets smaller
          alt={`banner containing the word ${pageName}`}
        />
      </button>
    </Link>
  );
};
