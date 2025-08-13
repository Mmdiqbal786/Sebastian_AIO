/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export interface ImageFieldProps {
  name: string;
  label?: string;
  defaultImageUrl?: string;
  register: any;
  onChange?: (name: string, value: any) => void;
}

const ImageField: React.FC<ImageFieldProps> = ({ name, label, defaultImageUrl, register, onChange }) => {
  const [preview, setPreview] = useState<string | null>(defaultImageUrl || null);

  useEffect(() => {
    setPreview(defaultImageUrl || null);
  }, [defaultImageUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange?.(name, result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {label && <label className="label text-sm text-white">{label}:</label>}
      {preview && (
        <Image
          src={preview}
          height={20}
          width={50}
          alt="Preview"
          className="w-32 h-32 object-cover rounded mb-2"
        />
      )}
      <input
        type="file"
        {...register(name, { required: true })}
        onChange={handleFileChange}
        className="file-input file-input-bordered w-full bg-white p-1 text-sm py-2"
      />
    </div>
  );
};

export default ImageField;
