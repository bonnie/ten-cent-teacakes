import { Venue } from "@prisma/client";

import React from "react";

import { DeleteItemModal } from "@/components/lib/modals/DeleteItemModal";

import { useVenues } from "../../hooks/useVenues";

export const DeleteVenueModal: React.FC<{
  venue: Venue;
  disabled?: boolean;
  title?: string;
}> = ({ venue, disabled, title = "Delete Venue" }) => {
  const { deleteVenue } = useVenues();
  const description = `Delete venue "${venue.name}"?`;

  return (
    <DeleteItemModal
      title={title}
      description={description}
      handleDelete={() => deleteVenue(venue.id)}
      disabled={disabled}
    />
  );
};

DeleteVenueModal.defaultProps = {
  disabled: false,
  title: "Delete Venue",
};
