import React from "react";

import { DeleteItemModal } from "@/components/lib/modals/DeleteItemModal";
import { deleteShow, ShowWithVenue } from "@/lib/shows";

export const DeleteShowModal: React.FC<{ show: ShowWithVenue }> = ({
  show,
}) => {
  const description = `Delete show at ${show.venue.name}?`;
  return (
    <DeleteItemModal
      title="Delete Show"
      description={description}
      handleDelete={() => deleteShow(show.id)}
    />
  );
};
