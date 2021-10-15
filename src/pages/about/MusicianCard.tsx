import Image from "next/image";
import React from "react";

import { MusicianWithInstruments } from "@/lib/api";

const cardClasses = [
  "sm:min-w-full",
  "md:min-w-min",
  "p-6",
  "max-w-sm",
  "w-full",
  "bg-aqua-300",
  "shadow-2xl",
  "rounded-lg",
  "pos-relative",
  "zindex-1",
  "flex",
  "flex-col",
  "min-h-full",
].join(" ");
const imageContainerClasses = [
  "rounded-lg -mt-12 position-relative h-230 text-center w-full px-12",
].join(" ");
const imageClasses = ["rounded-lg shadow-lg p-10"].join(" ");
const titleClasses = ["font-heading text-2xl text-center"].join(" ");
const instrumentsContainerClasses = ["flex", "flex-row", "justify-center"].join(
  " ",
);

type InstrumentProps = { name: string };
const Instrument: React.FC<InstrumentProps> = ({ name }) => <p>{name}</p>;

type MusicianProps = { data: MusicianWithInstruments };
export const MusicianCard: React.FC<MusicianProps> = ({ data }) => (
  <div className="pt-12">
    <div className={cardClasses}>
      <div className={imageContainerClasses}>
        <Image
          className={imageClasses}
          objectFit="cover"
          height="250"
          width="250"
          src={data.imagePath}
          alt={data.firstName}
        />
      </div>
      <div className="flex flex-col justify-between h-full">
        <div>
          <p className={titleClasses}>{data.firstName}</p>
          <p>{data.bio}</p>
        </div>
        <div className={instrumentsContainerClasses}>
          {data.instruments.map((instrument) => (
            <Instrument key={instrument.name} name={instrument.name} />
          ))}
        </div>
      </div>
    </div>
  </div>
);
