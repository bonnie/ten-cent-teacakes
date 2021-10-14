import Link from "next/link";
import React from "react";

type NavLinkProps = { href: string; display: string };

export const NavLink: React.FC<NavLinkProps> = ({ href, display }) => (
  <Link href={href}>
    <button
      type="button"
      className="lg:inline-flex lg:w-auto w-full text-3xl px-3 py-2 rounded text-light-aqua font-heading items-center justify-center hover:bg-green-600 hover:text-white "
    >
      {display}
    </button>
  </Link>
);
