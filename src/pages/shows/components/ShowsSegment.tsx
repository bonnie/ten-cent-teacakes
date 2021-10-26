import React from "react";

import { Heading } from "@/components/lib/Heading";
import { ShowWithVenue } from "@/lib/shows";

const Show: React.FC<{ show: ShowWithVenue }> = ({ show }) => (
  <div>
    <p>
      {show.venue.name} {show.performAt}
    </p>
  </div>
);

type ShowsProps = {
  title: string;
  shows: Array<ShowWithVenue>;
};

export const ShowsSegment: React.FC<ShowsProps> = ({ title, shows }) => (
  <div>
    <Heading textSize="4xl" align="left" margin={0}>
      {title}
    </Heading>
    {shows.length === 0 ? (
      <p>No {title.toLowerCase()} just now; check back soon!</p>
    ) : (
      shows.map((show) => <Show key={show.id} show={show} />)
    )}
  </div>
);
