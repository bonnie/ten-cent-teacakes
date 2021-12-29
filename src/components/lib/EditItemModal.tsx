/* eslint-disable react/jsx-props-no-spreading */
// adapted from https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/regular

import { Formik, FormikConfig, FormikProps } from "formik";
import React from "react";

import { Button } from "@/components/lib/Button";
import { Heading } from "@/components/lib/Heading";
import { ShowFormData } from "@/lib/shows";

type Values = ShowFormData;

type EditItemModalProps = {
  title: string;
  FormFields: React.FC<{ props: FormikProps<Values> }>;
  formikConfig: FormikConfig<Values>;
};

export const EditItemModal: React.FC<EditItemModalProps> = ({
  title,
  FormFields,
  formikConfig,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <Button contents={title} clickHandler={() => setShowModal(true)}>
        {title}
      </Button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-lg">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/* content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <Heading textSize="4xl">{title}</Heading>
                </div>
                {/* body */}
                <Formik {...formikConfig}>
                  {(props) => (
                    <div className="mt-5 md:mt-0 md:col-span-2">
                      <FormFields props={props} />
                      {/* footer */}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <Button
                          type="submit"
                          clickHandler={() => {
                            props.submitForm();
                            setShowModal(false);
                          }}
                          contents="Save Changes"
                        />
                      </div>
                    </div>
                  )}
                </Formik>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </>
  );
};
