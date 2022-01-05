import React from "react";

export const FieldContainer: React.FC<{
  htmlFor: string;
  label: string;
  required: boolean;
}> = ({ htmlFor, label, required, children }) => (
  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-3 sm:col-span-2">
        <label
          htmlFor={htmlFor}
          className="block font-medium text-gray-700 text-left"
        >
          {label} {required ? <span className="text-red-600">*</span> : null}
        </label>
        {children}
      </div>
    </div>
  </div>
);
