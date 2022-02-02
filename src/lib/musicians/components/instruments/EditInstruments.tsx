import React from "react";
import { tw } from "twind";

import { Heading } from "@/components/lib/Style/Heading";
import { Section } from "@/components/lib/Style/Section";
import { InstrumentWithMusicianCount } from "@/lib/instruments/types";

import { useInstruments } from "../../hooks/useInstruments";
import { DeleteInstrumentModal } from "./DeleteInstrumentModal";
import { AddInstrumentModal, EditInstrumentModal } from "./EditInstrumentModal";

export const EditInstruments: React.FC = () => {
  const { instruments } = useInstruments();

  return (
    <Section className={tw(["flex", "flex-col", "items-center"])}>
      <Heading>Instruments</Heading>
      <AddInstrumentModal />
      {instruments
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((instrument: InstrumentWithMusicianCount) => (
          <div className={tw(["w-1/4", "text-left"])} key={instrument.id}>
            <EditInstrumentModal instrument={instrument} />
            <DeleteInstrumentModal instrument={instrument} />
            <span>{instrument.name}</span>
          </div>
        ))}
    </Section>
  );
};
