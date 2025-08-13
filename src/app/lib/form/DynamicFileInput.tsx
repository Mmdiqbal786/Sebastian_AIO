'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface DynamicFileInputProps {
  name: string;
  label: string;
  existingFileURL?: string;
  onFileChange: (file: File | null) => void;
}

const DynamicFileInput: React.FC<DynamicFileInputProps> = ({
  name,
  label,
  existingFileURL,
  onFileChange,
}) => {
  const [preview, setPreview] = useState<string | null>(existingFileURL || null);
  const [, setFile] = useState<File | null>(null);

  useEffect(() => {
    setPreview(existingFileURL || null);
  }, [existingFileURL]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      onFileChange(selectedFile);
      console.log(selectedFile);
    } else {
      setFile(null);
      setPreview(existingFileURL || null);
      onFileChange(null);
    }
  };

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="file"
        name={name}
        accept="image/*"
        onChange={handleFileChange}
        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
      />

      {preview && (
        <div className="mt-2">
          <Image
            src={preview}
            alt="Preview"
            width={100}
            height={100}
            className="rounded-lg object-cover border"
          />
        </div>
      )}
    </div>
  );
};

export default DynamicFileInput;
