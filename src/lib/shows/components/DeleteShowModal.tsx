import dayjs from "dayjs";
import React from "react";

import { DeleteItemModal } from "@/components/lib/modals/DeleteItemModal";
import { ShowWithVenue } from "@/lib/shows/types";

import { useShows } from "../hooks/useShows";

export const DeleteShowModal: React.FC<{ show: ShowWithVenue }> = ({
  show,
}) => {
  const { deleteShow } = useShows();
  const description = `Delete show at ${show.venue.name}?`;
  return (
    <DeleteItemModal
      title={`Delete Show at ${show.venue.name} on ${dayjs(
        show.performAt,
      ).format("MMM D, YYYY, hh:mm a")}`}
      description={description}
      handleDelete={() => deleteShow(show.id)}
    />
  );
};
