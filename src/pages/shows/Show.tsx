import React from "react";

import { ShowWithVenue } from "@/lib/api";

import { Venue } from "./Venue";

export const Show: React.FC<{ show: ShowWithVenue }> = ({ show }) => (
  <div>
    <p>
      <Venue venue={show.venue} /> {show.performAt}
    </p>
  </div>
);
