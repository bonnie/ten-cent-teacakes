import React, { useState } from "react";

import { EditButtons } from "@/components/lib/EditButtons";
import { ShowWithVenue } from "@/lib/api";

import { ShowPutData } from "../api/shows/queries";
import { Venue } from "./Venue";

type EditShowProps = { show: ShowWithVenue | ShowPutData };

export const EditableShow: React.FC<EditShowProps> = ({ show }) => {
  const [editing, setEditing] = useState(false);

  const handleSubmit = () => {};
  const handleDelete = () => {};
  const venue = "venue" in show ? show.venue : undefined;

  return (
    <div>
      <p>
        <Venue venue={venue} editing={editing} /> {show.performAt}
        <EditButtons
          setEditing={setEditing}
          action="edit"
          onAction={handleSubmit}
          onDelete={handleDelete}
        />
      </p>
    </div>
  );
};
