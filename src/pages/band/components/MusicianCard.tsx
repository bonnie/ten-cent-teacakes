import Image from "next/image";
import React from "react";

import { MusicianWithInstruments } from "@/lib/musicians";

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
  "justify-between",
  "min-h-full",
].join(" ");

const imageTransitionClass =
  "transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110";

type InstrumentProps = { name: string };
const Instrument: React.FC<InstrumentProps> = ({ name }) => (
  <div className="rounded-full bg-aqua-700 text-aqua-100 py-1 px-2">{name}</div>
);

type MusicianProps = { data: MusicianWithInstruments };
export const MusicianCard: React.FC<MusicianProps> = ({ data }) => (
  <div className="pt-12">
    <div className={cardClasses}>
      <div>
        <div className="rounded-lg -mt-12 position-relative h-230 text-center w-full px-12">
          <Image
            className={`rounded-lg shadow-lg p-10 ${imageTransitionClass}`}
            objectFit="cover"
            height="250"
            width="250"
            src={data.imagePath}
            alt={data.firstName}
          />
        </div>
        <p className="font-heading text-4xl text-center">{data.firstName}</p>
        <p>{data.bio}</p>
      </div>
      <div className="flex flex-row flex-wrap w-full justify-center gap-2 pt-2">
        {data.instruments
          .sort((a, b) => (a.name > b.name ? 1 : 0))
          .map((instrument) => (
            <Instrument key={instrument.name} name={instrument.name} />
          ))}
      </div>
    </div>
  </div>
);
