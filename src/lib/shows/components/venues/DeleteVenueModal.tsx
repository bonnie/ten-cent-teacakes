import React from "react";

import { DeleteItemModal } from "@/components/lib/modals/DeleteItemModal";
import { VenueWithShowCount } from "@/lib/venues/types";

import { useVenues } from "../../hooks/useVenues";

export const DeleteVenueModal: React.FC<{
  venue: VenueWithShowCount;
}> = ({ venue }) => {
  const { deleteVenue } = useVenues();
  const disabled = !!venue.showCount;
  const disabledMessage = `${venue.name} is associated with ${
    venue.showCount
  } show${venue.showCount > 1 ? "s" : ""} and can't be deleted`;

  return (
    <DeleteItemModal
      disabled={disabled}
      title="Delete Venue"
      description={disabled ? disabledMessage : `Delete venue ${venue.name}`}
      handleDelete={() => deleteVenue(venue.id)}
    />
  );
};
