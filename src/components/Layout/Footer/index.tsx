import dayjs from "dayjs";
import React from "react";
import { tw } from "twind";

import { Section } from "@/components/lib/Style/Section";

export const Footer: React.FC = () => (
  <Section className={tw(["text-center", "mb-5"])}>© {dayjs().year()}</Section>
);
