import React from "react";
import { tw } from "twind";

import { Heading } from "@/components/lib/Style/Heading";
import { LinkKeyword } from "@/components/lib/Style/LinkKeyword";

export const ErrorComponent = () => (
  <div className={tw(["text-center"])}>
    <Heading>Aw, crumbs</Heading>
    <p>An error occurred, and our team has been notified.</p>
    <LinkKeyword href="http://tencentteacakes.com">Return home</LinkKeyword>
  </div>
);
