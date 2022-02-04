/* eslint-disable @next/next/no-img-element */
import React from "react";
import { tw } from "twind";

import { useWhitelistUser } from "@/lib/auth/useWhitelistUser";
import { MusicianWithInstruments } from "@/lib/musicians/types";
import { useSupabasePhoto } from "@/lib/supabase/hooks/useSupabasePhoto";

import { EditMusicianModal } from "./EditMusicianModal";

const cardClasses = tw([
  "sm:min-w-full",
  "md:min-w-min",
  "p-6",
  "max-w-sm",
  "w-full",
  "shadow-2xl",
  "rounded-lg",
  "z-10",
  "flex",
  "flex-col",
  "justify-between",
  "min-h-full",
  "bg-gradient-to-b",
  "from-aqua-300",
  "to-aqua-200",
]);

type InstrumentProps = { name: string };
const Instrument: React.FC<InstrumentProps> = ({ name }) => (
  <div
    className={tw([
      "rounded-full",
      "bg-aqua-700",
      "text-aqua-100",
      "py-1",
      "px-2",
      "mx-1",
      "mt-3",
    ])}
  >
    {name}
  </div>
);

type MusicianProps = { musician: MusicianWithInstruments };
export const MusicianCard: React.FC<MusicianProps> = ({ musician }) => {
  const { user } = useWhitelistUser();
  const { imgSrc } = useSupabasePhoto(musician.imagePath);

  const imageTransitionClass = imgSrc
    ? tw([
        "transition",
        "duration-500",
        "ease-in-out",
        "transform",
        "hover:-translate-y-1",
        "hover:scale-110",
      ])
    : "";

  return (
    <div className={tw(["pt-12 m-4"])}>
      <div className={cardClasses}>
        <div>
          <div
            style={{ height: "250px" }}
            className={tw([
              "relative",
              "rounded-lg",
              "-mt-12",
              "text-center",
              "w-full",
              "px-12",
            ])}
          >
            <img
              style={{ height: "250px", width: "250px" }}
              className={tw([
                imgSrc ? "rounded-lg" : "",
                imgSrc ? "shadow-lg" : "",
                imageTransitionClass,
              ])}
              src={imgSrc ?? "/logo/tencent-tag.svg"}
              alt={musician.firstName}
            />
          </div>

          <div className={tw(["text-4xl", "text-center"])}>
            {user ? (
              <span className={tw(["mr-1"])}>
                <EditMusicianModal musician={musician} />
              </span>
            ) : null}{" "}
            <p className={tw(["font-display", "inline-block"])}>
              {musician.firstName}
            </p>
          </div>
          <p>{musician.bio}</p>
        </div>
        <div
          className={tw([
            "flex",
            "flex-row",
            "flex-wrap",
            "w-full",
            "justify-center",
            "pt-1",
          ])}
        >
          {(musician.instruments ?? [])
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((instrument) => (
              <Instrument key={instrument.name} name={instrument.name} />
            ))}
        </div>
      </div>
    </div>
  );
};
