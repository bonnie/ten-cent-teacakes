import React from "react";
import { tw } from "twind";

import { Heading } from "@/components/lib/Style/Heading";
import { InternalLinkKeyword } from "@/components/lib/Style/InternalLinkKeyword";
import { ShowWithVenue } from "@/lib/shows/types";

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
        <div className={tw(["text-center", "text-xl"])}>
          <p>No {title.toLowerCase()} just now</p>
          <p>
            To keep informed about new shows,{" "}
            <InternalLinkKeyword href="/more">
              join our mailing list!
            </InternalLinkKeyword>
          </p>
        </div>
      ) : (
        shows.map((show) => <Show key={show.id} show={show} />)
      )}
    </div>
  );
};

ShowsGroup.defaultProps = {
  showTitle: true,
};
