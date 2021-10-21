import { Show as ShowType } from ".prisma/client";

import React from "react";

import { Heading } from "@/components/Heading";

const Show: React.FC<{ show: ShowType }> = ({ show }) => <div />;

type ShowsProps = {
  title: string;
  shows: Array<ShowType>;
};

export const ShowsSegment: React.FC<ShowsProps> = ({ title, shows }) => (
  <div className="m-4">
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
