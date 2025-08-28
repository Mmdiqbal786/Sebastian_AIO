/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import dynamic from "next/dynamic";
import { uploadFileToS3, fileToBase64 } from "../adapters/storageAdapter";
import SubTable from "./SubTable";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function FieldRenderer({ field, rhfField, error }: any) {
  switch (field.type) {
    case "text":
    case "password":
    case "email":
    case "number":
    case "phone":
    case "date":
    case "datetime-local":
      return (
        <div>
          <label className="block font-medium">{field.label}</label>
          <input type={field.type} {...rhfField} className="w-full rounded border p-2" />
          {error && <p className="text-red-500">{error.message}</p>}
        </div>
      );

    case "textarea":
      return <textarea {...rhfField} className="w-full rounded border p-2" />;

    case "richtext":
      return <ReactQuill value={rhfField.value} onChange={rhfField.onChange} />;

    case "file":
      return (
        <div>
          <label>{field.label}</label>
          <input
            type="file"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) {
                return;
              }
              if (field.storage === "s3") {
                const url = await uploadFileToS3(file, process.env.NEXT_PUBLIC_S3_BUCKET!, "uploads/", (p) =>
                  console.log(`Progress: ${p}%`)
                );
                rhfField.onChange(url);
              } else {
                const base64 = await fileToBase64(file);
                rhfField.onChange(base64);
              }
            }}
          />
        </div>
      );

    case "multi-file":
      return (
        <div>
          <label>{field.label}</label>
          <input
            type="file"
            multiple
            onChange={async (e) => {
              const { files } = e.target;
              if (!files) {
                return;
              }
              const urls = [];
              for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (field.storage === "s3") {
                  const url = await uploadFileToS3(file, process.env.NEXT_PUBLIC_S3_BUCKET!, "uploads/", (p) =>
                    console.log(`File ${file.name} Progress: ${p}%`)
                  );
                  urls.push(url);
                } else {
                  const base64 = await fileToBase64(file);
                  urls.push(base64);
                }
              }
              rhfField.onChange(urls);
            }}
          />
        </div>
      );

    case "subtable":
      return <SubTable name={field.name} fields={field.fields} />;

    default:
      return <div>Unsupported field type: {field.type}</div>;
  }
}
