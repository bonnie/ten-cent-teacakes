import React from "react";

import { DeleteItemModal } from "@/components/lib/modals/DeleteItemModal";
import { MusicianWithInstruments } from "@/lib/musicians/types";

import { useMusicians } from "../hooks/useMusicians";

export const DeleteMusicianModal: React.FC<{
  musician: MusicianWithInstruments;
}> = ({ musician }) => {
  const { deleteMusician } = useMusicians();
  const description = `Delete musician ${musician.firstName} ${musician.lastName}?`;
  return (
    <DeleteItemModal
      title="Delete Musician"
      description={description}
      handleDelete={() => deleteMusician(musician.id)}
    />
  );
};
