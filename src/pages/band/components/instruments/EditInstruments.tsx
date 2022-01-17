import React from "react";

import { Heading } from "@/components/lib/Heading";
import { DeleteItemModal } from "@/components/lib/modals/DeleteItemModal";
import { InstrumentWithMusicianCount } from "@/lib/instruments/types";

import { useInstruments } from "../../hooks/useInstruments";
import { AddInstrumentModal } from "./EditInstrumentModal";

export const EditInstruments: React.FC = () => {
  const { instruments, deleteInstrument } = useInstruments();

  return (
    <div className="mt-5 border-t-2 border-solid border-gray-300 text-center">
      <Heading>Instruments</Heading>
      <AddInstrumentModal />
      {instruments
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((instrument: InstrumentWithMusicianCount) => {
          const disabledMessage = `${instrument.name} is associated with ${
            instrument.musicianCount
          } musician${
            instrument.musicianCount > 1 ? "s" : ""
          } and can't be deleted`;
          const disabled = instrument.musicianCount > 0;
          return (
            <div key={instrument.id}>
              <DeleteItemModal
                description={
                  disabled
                    ? disabledMessage
                    : `Delete instrument ${instrument.name}`
                }
                disabled={disabled}
                title="Delete Instrument"
                handleDelete={() => deleteInstrument(instrument.id)}
              />
              <span>{instrument.name}</span>
            </div>
          );
        })}
    </div>
  );
};
