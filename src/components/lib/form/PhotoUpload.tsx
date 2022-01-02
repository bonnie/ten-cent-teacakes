// adapted from https://tailwindui.com/components/application-ui/forms/form-layouts

import React from "react";

export const PhotoUpload: React.FC = () => (
  <div>
    <div className="flex text-sm text-gray-600">
      <label
        htmlFor="file-upload"
        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
      >
        <span>Upload a file</span>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
        />
      </label>
      <p className="pl-1">or drag and drop</p>
    </div>
    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
  </div>
);
