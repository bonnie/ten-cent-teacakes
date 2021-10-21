import React from "react";

import { Heading } from "@/components/lib/Heading";
import { ShowPutData } from "@/pages/api/shows/queries";

import { EditableShow } from "./EditableShow";

type AddShowProps = {
  setAddingShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddShow: React.FC<AddShowProps> = ({ setAddingShow }) => {
  const newShow: ShowPutData = {
    performAt: new Date(),
  };
  return (
    <div>
      <Heading textSize="4xl" align="left" margin={0}>
        Add Show
      </Heading>
      <EditableShow show={newShow} />
    </div>
  );
};
