import { useField } from "formik";
import React from "react";

import { useInstruments } from "../../hooks/useInstruments";

export const EditableInstrumentsList: React.FC = () => {
  const { instruments } = useInstruments();
  return <div />;
};
