/* eslint-disable react/jsx-props-no-spreading */
import dayjs from "dayjs";
import { useField } from "formik";
import React from "react";
import { tw } from "twind";

import { FieldContainer } from "@/components/lib/form/FieldContainer";
import { useShows } from "@/lib/shows/hooks/useShows";

export const EditableShow: React.FC<{ required: boolean }> = ({ required }) => {
  const { pastShows } = useShows();

  const [field] = useField({
    name: "showId",
    type: "select",
  });

  return (
    <FieldContainer
      htmlFor="showId"
      label="Show"
      required={required}
      fieldName="showId"
    >
      <select
        {...field}
        className={tw(["px-4", "py-3", "rounded w-full"])}
        id="showId"
      >
        <option value={undefined}> </option>
        {pastShows.map((show) => (
          <option key={show.id} value={show.id}>
            {show.venue.name} (
            {dayjs(show.performAt).format("MMM DD YYYY hh:mm a")})
          </option>
        ))}
      </select>
    </FieldContainer>
  );
};
