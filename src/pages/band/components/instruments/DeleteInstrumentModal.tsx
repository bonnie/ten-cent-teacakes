import React from "react";

import { DeleteItemModal } from "@/components/lib/modals/DeleteItemModal";
import { InstrumentWithMusicianCount } from "@/lib/instruments/types";

import { useInstruments } from "../../hooks/useInstruments";

export const DeleteInstrumentModal: React.FC<{
  instrument: InstrumentWithMusicianCount;
}> = ({ instrument }) => {
  const { deleteInstrument } = useInstruments();
  const disabledMessage = `${instrument.name} is associated with ${
    instrument.musicianCount
  } musician${instrument.musicianCount > 1 ? "s" : ""} and can't be deleted`;
  const disabled = instrument.musicianCount > 0;
  return (
    <DeleteItemModal
      description={
        disabled ? disabledMessage : `Delete instrument ${instrument.name}`
      }
      disabled={disabled}
      title="Delete Instrument"
      handleDelete={() => deleteInstrument(instrument.id)}
    />
  );
};
