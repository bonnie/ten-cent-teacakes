import React from "react";

import { Heading } from "@/components/lib/Heading";
import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { ShowWithVenue } from "@/lib/shows";

import { EditableShow, Show } from "./Show";

type ShowsProps = {
  title: string;
  shows: Array<ShowWithVenue>;
};

export const ShowsGroup: React.FC<ShowsProps> = ({ title, shows }) => {
  const { user } = useWhitelistUser();
  const ShowComponent = user ? EditableShow : Show;
  return (
    <div>
      <Heading textSize="4xl" align="left" margin={0}>
        {title}
      </Heading>
      {shows.length === 0 ? (
        <p>No {title.toLowerCase()} just now; check back soon!</p>
      ) : (
        shows.map((show) => <ShowComponent key={show.id} show={show} />)
      )}
    </div>
  );
};