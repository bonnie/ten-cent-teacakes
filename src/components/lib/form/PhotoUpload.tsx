import React from "react";

import { FieldContainer } from "@/components/lib/form/FieldContainer";

export const PhotoUpload: React.FC<{ name: string }> = ({ name }) => (
  <FieldContainer htmlFor="formFile" label="Choose a file to upload" required>
    <input
      className="form-control
     block
     w-full
     px-3
     py-1.5
     text-base
     font-normal
     text-gray-700
     bg-white bg-clip-padding
     border border-solid border-gray-300
     rounded
     transition
     ease-in-out
     m-0
     focus:text-gray-700 focus:bg-white focus:border-aqua-500 focus:outline-none"
      type="file"
      id="formFile"
    />
  </FieldContainer>
);
