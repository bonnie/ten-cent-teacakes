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
      title={`Delete Show at ${show.venue.name} on ${show.performAt}`}
      description={description}
      handleDelete={() => deleteShow(show.id)}
    />
  );
};
