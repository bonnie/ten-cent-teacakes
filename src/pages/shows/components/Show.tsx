import React from "react";

import { ShowWithVenue } from "@/lib/shows";

import { DisplayShowVenue } from "./ShowVenue";

export const Show: React.FC<{ show: ShowWithVenue }> = ({ show }) => (
  <div>
    <p>
      <DisplayShowVenue venue={show.venue} /> {show.performAt}
    </p>
  </div>
);
