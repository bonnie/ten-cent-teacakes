import Link from "next/link";
import React from "react";

type NavLinkProps = { href: string; display: string };

export const NavLink: React.FC<NavLinkProps> = ({ href, display }) => (
  <Link href={href}>
    <span className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-light-aqua font-body items-center justify-center hover:bg-green-600 hover:text-white ">
      {display}
    </span>
  </Link>
);
