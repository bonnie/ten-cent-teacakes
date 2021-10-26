import React from "react";

import { Heading } from "@/components/lib/Heading";

import { EditableNewShow } from "./EditableShow";

type AddShowProps = {
  setAddingShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddShow: React.FC<AddShowProps> = ({ setAddingShow }) => (
  <div>
    <Heading textSize="4xl" align="left" margin={0}>
      Add Show
    </Heading>
    <EditableNewShow setAddingShow={setAddingShow} />
  </div>
);
