import Link from "next/link";
import React from "react";

import { Heading } from "@/components/lib/Heading";

export const ErrorComponent = () => (
  <div className="text-center">
    <Heading>Aw, crumbs</Heading>
    <p>An error occurred, and our team has been notified.</p>
    <p className="text-xl font-bold text-aqua-700 hover:text-aqua-500">
      <Link href="/shows">Return to landing page</Link>
    </p>
  </div>
);
