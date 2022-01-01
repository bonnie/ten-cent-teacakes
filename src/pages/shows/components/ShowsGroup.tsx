import React from "react";

import { Heading } from "@/components/lib/Heading";
import { ShowWithVenue } from "@/lib/shows";

import { Show } from "./Show";

type ShowsProps = {
  title: "Upcoming Shows" | "Past Shows";
  shows: Array<ShowWithVenue>;
  showTitle?: boolean;
};

export const ShowsGroup: React.FC<ShowsProps> = ({
  title,
  shows,
  showTitle,
}) => {
  // don't show past shows if there are none
  if (title === "Past Shows" && shows.length === 0) {
    return null;
  }
  return (
    <div>
      {showTitle ? (
        <Heading textSize="4xl" align="center" margin={0}>
          {title}
        </Heading>
      ) : null}
      {shows.length === 0 ? (
        <p>No {title.toLowerCase()} just now; check back soon!</p>
      ) : (
        shows.map((show) => <Show key={show.id} show={show} />)
      )}
    </div>
  );
};

ShowsGroup.defaultProps = {
  showTitle: true,
};
