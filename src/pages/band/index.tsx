import React from "react";

import { Heading } from "@/components/lib/Heading";

import { Musicians } from "./components/Musicians";

const About: React.FC = () => (
  <div className="w-full">
    <Heading>The Band</Heading>
    <Musicians />
  </div>
);
export default About;
