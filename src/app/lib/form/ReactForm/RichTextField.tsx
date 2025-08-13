import React from "react";
import { Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import { FormField } from "./types";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const RichTextField: React.FC<{ field: FormField }> = ({ field }) => (
  <Controller
    name={field.name}
    rules={{ required: field.required }}
    render={({ field: { value, onChange } }) => (
      <ReactQuill
        value={value || ""}
        onChange={onChange}
        className="quill-editor"
      />
    )}
  />
);
export default React.memo(RichTextField);
