// adapted from
// https://dev.to/andrewespejo/how-to-design-a-simple-and-beautiful-navbar-using-nextjs-and-tailwindcss-26p1
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { tw } from "twind";

import { Button } from "@/components/lib/Button";

import { NavLink } from "./NavLink";
import { SocialLinks } from "./SocialLinks";

const LogoutButton: React.FC = () => {
  const { user } = useUser();

  if (!user) return <></>;

  return (
    <a href="/api/auth/logout">
      <Button round>
        <RiLogoutCircleRLine />
      </Button>
    </a>
  );
};

export const Navbar: React.FC = () => {
  const [active, setActive] = React.useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const hamburgerClasses = tw([
    "inline-flex",
    "p-3",
    "hover:bg-aqua-600",
    "lg:hidden",
    "text-white",
    "ml-auto",
    "hover:text-white",
    "outline-none",
    "focus:outline-none",
  ]);

  return (
    <nav
      className={tw([
        "flex",
        "items-center",
        "flex-wrap",
        "lg:flex-nowrap",
        "lg:max-h-full",
        "bg-aqua-900",
        "p-3",
        "text-aqua-100",
        "font-display",
        "font-normal",
      ])}
    >
      <Link href="/">
        <button
          type="button"
          className={tw([
            "inline-flex",
            "items-center",
            "p-0.5",
            "mr-4",
            "focus:outline-none",
          ])}
        >
          <Image
            src="/logo/tencent-tag.svg"
            alt="tag reading '10 cents'"
            height={50}
            width={50}
          />
          <span className={tw(["p-2", "text-3xl", "w-60"])}>
            Ten-Cent Teacakes
          </span>
        </button>
      </Link>
      <button type="button" className={hamburgerClasses} onClick={handleClick}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div
        className={tw([
          active ? null : "hidden",
          "w-full",
          "lg:inline-flex",
          "lg:flex-grow",
          "lg:w-auto",
          "lg:items-center",
        ])}
      >
        <div
          className={tw([
            "lg:inline-flex",
            "lg:flex-row",
            "lg:w-auto",
            "w-full",
            "lg:items-center",
            "items-start",
            "flex",
            "flex-col",
            "lg:h-auto",
          ])}
        >
          <NavLink
            href="/shows"
            pageName="shows"
            setInactive={() => setActive(false)}
          />
          <NavLink
            href="/photos"
            pageName="photos"
            setInactive={() => setActive(false)}
          />
          <NavLink
            href="/band"
            pageName="band"
            setInactive={() => setActive(false)}
          />
          <NavLink
            href="/more"
            pageName="more"
            setInactive={() => setActive(false)}
          />
        </div>
        <div
          className={tw([
            "flex",
            "items-center",
            "lg:inline-flex",
            "lg:flex-row",
            "lg:w-full",
            "lg:justify-end",
            "items-start",
            "flex",
            "flex-col",
          ])}
        >
          <SocialLinks />
        </div>
      </div>
      <div className="self-center ml-4">
        <LogoutButton />
      </div>
    </nav>
  );
};
