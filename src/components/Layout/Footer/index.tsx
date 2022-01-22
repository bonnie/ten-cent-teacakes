import dayjs from "dayjs";
import React from "react";

import { Section } from "@/components/lib/Style/Section";

export const Footer: React.FC = () => (
  <Section className="text-center mb-5">© {dayjs().year()}</Section>
);
