import React from "react";

import { Heading } from "@/components/lib/Heading";
import { ShowWithVenue } from "@/lib/shows";

import { Show } from "./Show";

type ShowsProps = {
  title: "Upcoming Shows" | "Past Shows";
  shows: Array<ShowWithVenue>;
};

export const ShowsGroup: React.FC<ShowsProps> = ({ title, shows }) => {
  // don't show past shows if there are none
  if (title === "Past Shows" && shows.length === 0) {
    return null;
  }
  return (
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
};
