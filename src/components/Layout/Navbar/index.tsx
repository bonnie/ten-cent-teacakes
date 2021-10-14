// adapted from
// https://dev.to/andrewespejo/how-to-design-a-simple-and-beautiful-navbar-using-nextjs-and-tailwindcss-26p1
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { NavLink } from "./NavLink";
import { SocialLinks } from "./SocialLinks";

export const Navbar: React.FC = () => {
  const [active, setActive] = React.useState(false);

  const handleClick = () => {
    setActive(!active);
  };
  return (
    <div>
      <nav className="flex items-center flex-wrap bg-tan-dark p-3 text-aqua-light font-heading font-normal">
        <Link href="/">
          <button
            type="button"
            className="inline-flex items-center p-0.5 mr-4 "
          >
            <Image
              src="/logo/tencent-tag.svg"
              alt="tag reading '10 cents'"
              height={50}
              width={50}
            />
            <span className="p-2 text-3xl">Ten-Cent Teacakes</span>
          </button>
        </Link>
        <button
          type="button"
          className="inline-flex p-3 hover:bg-green-600 lg:hidden text-white ml-auto hover:text-white outline-none"
          onClick={handleClick}
        >
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
          className={`${
            active ? "" : "hidden"
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className="lg:inline-flex lg:flex-row lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto lg:divide-x">
            <NavLink href="/shows" display="Shows" />
            <NavLink href="/photos" display="Photos" />
            <NavLink href="/about" display="About" />
          </div>
          <div className="flex items-center lg:inline-flex lg:flex-row lg:w-full lg:justify-end items-start flex flex-col">
            <SocialLinks />
          </div>
        </div>
      </nav>
    </div>
  );
};
