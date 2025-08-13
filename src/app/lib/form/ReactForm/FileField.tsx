import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { FormField } from "./types";

const FileField: React.FC<{ field: FormField }> = ({ field }) => {
  const { setValue } = useFormContext();
  const [preview, setPreview] = useState(field.value);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(field.name, file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="file-input-wrapper bg-white p-2">
      <input type="file" onChange={handleFileChange} className="p-2" />
      {preview && <Image src={preview} alt="Preview" width={100} height={100} />}
    </div>
  );
};
export default React.memo(FileField);
