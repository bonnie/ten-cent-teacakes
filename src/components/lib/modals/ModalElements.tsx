// adapted from https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/regular

import React from "react";
import { tw } from "twind";

import { Heading } from "@/components/lib/Style/Heading";

export const ModalContainer: React.FC<{ title: string }> = ({
  title,
  children,
}) => (
  <>
    <div
      className={tw([
        "justify-center",
        "items-center",
        "flex",
        "overflow-x-hidden",
        "overflow-y-auto",
        "fixed",
        "inset-0",
        "z-50",
        "outline-none",
        "focus:outline-none",
        "text-lg",
      ])}
    >
      <div
        className={tw(["relative", "w-auto", "my-6", "mx-auto", "max-w-3xl"])}
      >
        {/* content */}
        <div
          className={tw([
            "border-0",
            "rounded-lg",
            "shadow-lg",
            "relative",
            "flex",
            "flex-col",
            "w-full",
            "bg-white",
            "outline-none",
            "focus:outline-none",
          ])}
        >
          {/* header */}
          <div
            className={tw([
              "flex",
              "items-start",
              "justify-between",
              "p-5",
              "border-b",
              "border-solid",
              "border-aqua-200",
              "rounded-t",
            ])}
          >
            <Heading textSize="4xl" align="center">
              {title}
            </Heading>
          </div>
          <div className={tw(["mt-5", "md:mt-0", "md:col-span-2"])}>
            {children}
          </div>
        </div>
      </div>
    </div>
    <div
      className={tw(["opacity-25", "fixed", "inset-0", "z-40", "bg-black"])}
    />
  </>
);

export const ModalFooter: React.FC = ({ children }) => (
  <div
    className={tw([
      "flex",
      "items-center",
      "justify-end",
      "p-6",
      "border-t",
      "border-solid",
      "border-aqua-200",
      "rounded-b",
    ])}
  >
    {children}
  </div>
);

export const ModalCancelButton: React.FC<{
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowModal }) => {
  const classes = tw([
    "text-black",
    "background-transparent",
    "font-bold",
    "uppercase",
    "px-6",
    "py-2",
    "text-sm",
    "outline-none",
    "focus:outline-none",
    "hover:text-gray-500",
    "mr-1",
    "mb-1",
    "ease-linear",
    "transition-all",
    "duration-150",
  ]);
  return (
    <button
      className={classes}
      type="button"
      onClick={() => setShowModal(false)}
    >
      Cancel
    </button>
  );
};
