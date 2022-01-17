import React from "react";

import { MultiSelect } from "@/components/lib/form/MultiSelectInput";

import { useInstruments } from "../../hooks/useInstruments";
import { AddInstrumentModal } from "./EditInstrumentModal";

export const InstrumentMultiSelect: React.FC = () => {
  const { instruments } = useInstruments();
  const instrumentOptions = instruments.map((instrument) => ({
    value: instrument.id,
    label: instrument.name,
  }));

  return (
    <>
      <MultiSelect
        name="instrumentIds"
        required
        label="Select instruments"
        options={instrumentOptions}
      />
      <AddInstrumentModal />
    </>
  );
};
