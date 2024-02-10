import React from "react";

const FieldLabel = ({ label, required }: { label: string; required?: boolean }): JSX.Element => {
  return (

    <label className="text-xs font-bold text-slate-500 uppercase">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
}

export default FieldLabel;
