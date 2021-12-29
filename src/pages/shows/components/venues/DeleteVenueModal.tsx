import { Venue } from "@prisma/client";

import React from "react";

import { DeleteItemModal } from "@/components/lib/modals/DeleteItemModal";

import { useVenues } from "../../hooks/useVenues";

export const DeleteVenueModal: React.FC<{ venue: Venue }> = ({ venue }) => {
  const { deleteVenue } = useVenues();
  const description = `Delete venue "${venue.name}"?`;

  // TODO: disable if any shows associated with this venue
  return (
    <DeleteItemModal
      title="Delete Venue"
      description={description}
      handleDelete={() => deleteVenue(venue.id)}
    />
  );
};
