import React from "react";
import { useForm } from "react-hook-form";

import { EditButtons } from "@/components/lib/EditButtons";
import { Heading } from "@/components/lib/Heading";
import { ShowPutData } from "@/lib/shows";

import { useShows } from "../hooks/useShows";
import { EditableShowDate } from "./ShowDate";
import { EditableShowVenue } from "./ShowVenue";

type AddShowProps = {
  setAddingShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddShow: React.FC<AddShowProps> = ({ setAddingShow }) => {
  const { addShow } = useShows();
  const handleSave = (data: ShowPutData) => {
    console.log("SAVING!!", data);
    addShow(data);
  };
  const today = new Date();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm();
  console.log(watch());
  // console.log("isValid", isValid);
  return (
    <div>
      <Heading textSize="4xl" align="left" margin={0}>
        Add Show
      </Heading>
      <form onSubmit={handleSubmit(handleSave)}>
        <EditButtons
          editing
          setEditing={setAddingShow}
          handleSave={() => handleSubmit(handleSave)}
          handleDelete={() => setAddingShow(false)}
        />
        <EditableShowDate control={control} performAt={today} />
        <EditableShowVenue register={register} venueId={undefined} />
      </form>
    </div>
  );
};
