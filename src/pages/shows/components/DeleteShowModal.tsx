import React from "react";

import { DeleteItemModal } from "@/components/lib/modals/DeleteItemModal";
import { ShowWithVenue } from "@/lib/shows";

import { useShows } from "../hooks/useShows";

export const DeleteShowModal: React.FC<{ show: ShowWithVenue }> = ({
  show,
}) => {
  const { deleteShow } = useShows();
  const description = `Delete show at ${show.venue.name}?`;
  return (
    <DeleteItemModal
      title="Delete Show"
      description={description}
      handleDelete={() => deleteShow(show.id)}
    />
  );
};
