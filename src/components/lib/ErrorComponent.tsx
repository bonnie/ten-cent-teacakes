import Link from "next/link";
import React from "react";
import { tw } from "twind";

import { Heading } from "@/components/lib/Heading";
import { keywordLinkClasses } from "@/pages/more";

export const ErrorComponent = () => (
  <div className="text-center">
    <Heading>Aw, crumbs</Heading>
    <p>An error occurred, and our team has been notified.</p>
    <p className={tw(keywordLinkClasses)}>
      <Link href="http://tencentteacakes.com">Return home</Link>
    </p>
  </div>
);
