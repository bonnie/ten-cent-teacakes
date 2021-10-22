import React from "react";

import { ShowWithVenue } from "@/lib/api";

import { DisplayVenue } from "./Venue";

export const Show: React.FC<{ show: ShowWithVenue }> = ({ show }) => (
  <div>
    <p>
      <DisplayVenue venue={show.venue} /> {show.performAt}
    </p>
  </div>
);
