// adapted from https://stackoverflow.com/a/57655147
import { FieldArray, useField } from "formik";
import React from "react";
import { tw } from "twind";

import { FieldContainer } from "@/components/lib/form/FieldContainer";

type Option = { value: string | number; label: string };
type MultiSelectProps = {
  name: string;
  options: Array<Option>;
  label: string;
  required: boolean;
};

export const MultiSelect: React.FC<MultiSelectProps> = ({
  name,
  options,
  label,
  required,
}) => {
  const [field] = useField({ name, type: "file" });
  return (
    <FieldContainer
      htmlFor={name}
      label={label}
      required={required}
      fieldName={name}
    >
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <div
            className={tw([
              "grid",
              "grid-cols-3",
              "place-items-start",
              "place-content-between",
            ])}
          >
            {options.map((option) => {
              const optionId = `option-${option.value}`;
              return (
                <label
                  className={tw(["ml-3"])}
                  key={option.value}
                  htmlFor={optionId}
                >
                  <input
                    id={optionId}
                    className={tw([
                      "focus:outline-none",
                      "focus:ring-0",
                      "checked:bg-aqua-600",
                      "text-aqua-600",
                    ])}
                    name="tags"
                    type="checkbox"
                    value={option.value}
                    checked={field.value.includes(option.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        arrayHelpers.push(option.value);
                      } else {
                        const idx = field.value.indexOf(option.value);
                        arrayHelpers.remove(idx);
                      }
                    }}
                  />
                  <span className={tw(["ml-1"])}>{option.label}</span>
                </label>
              );
            })}
          </div>
        )}
      />
      {/* <div role="group" id={name}>
      {options.map((option) => (
        <label key={option.value}>
          <Field type="checkbox" name={name} value={option.value} />
          {option.label}
        </label>
      ))}
    </div> */}
    </FieldContainer>
  );
};
