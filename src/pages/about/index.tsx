import React from "react";

import { Heading } from "@/components/lib/Heading";

import { Musicians } from "./components/Musicians";

const About: React.FC = () => (
  <div className="w-full">
    <Heading>About Ten-Cent Teacakes</Heading>
    <Musicians />
  </div>
);
export default About;
