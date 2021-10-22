import React from "react";

import { ShowWithVenue } from "@/lib/api";

import { DisplayShowVenue } from "./Venue";

export const Show: React.FC<{ show: ShowWithVenue }> = ({ show }) => (
  <div>
    <p>
      <DisplayShowVenue venue={show.venue} /> {show.performAt}
    </p>
  </div>
);
