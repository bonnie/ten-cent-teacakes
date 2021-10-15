import Image from "next/image";
import React from "react";

import { MusicianWithInstruments } from "@/lib/api";

const containingDivClasses = ["align-center", "py-12"].join(" ");
const cardClasses = [
  "p-6",
  "max-w-330",
  "w-full",
  "bg-white",
  "shadow-2xl",
  "rounded-lg",
  "pos-relative",
  "zindex-1",
  "flex",
  "flex-col",
].join(" ");
const imageContainerClasses = [
  "rounded-lg mt--12 position-relative h-230",
].join(" ");
const imageClasses = ["rounded-lg"].join(" ");
const titleClasses = ["text-heading text-2xl"].join(" ");
const instrumentsContainerClasses = ["flex", "flex-row", "justify-center"].join(
  " ",
);

type InstrumentProps = { name: string };
const Instrument: React.FC<InstrumentProps> = ({ name }) => <p>{name}</p>;

type MusicianProps = { data: MusicianWithInstruments };
export const MusicianCard: React.FC<MusicianProps> = ({ data }) => (
  <div className={containingDivClasses}>
    <div className={cardClasses}>
      <div className={imageContainerClasses}>
        <Image
          className={imageClasses}
          objectFit="cover"
          height={240}
          width={240}
          src={data.imagePath}
          alt={data.firstName}
        />
      </div>
      <p className={titleClasses}>{data.firstName}</p>
      <p>{data.bio}</p>
      <div className={instrumentsContainerClasses}>
        {data.instruments.map((instrument) => (
          <Instrument key={instrument.name} name={instrument.name} />
        ))}
      </div>
    </div>
  </div>
);
