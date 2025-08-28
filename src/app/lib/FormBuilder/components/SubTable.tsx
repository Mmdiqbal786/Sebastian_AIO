/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useFieldArray, Controller, useFormContext } from "react-hook-form";
import FieldRenderer from "./FieldRenderer";

export default function SubTable({ name, fields }: { name: string; fields: any[] }) {
  const { control } = useFormContext();
  const { fields: rows, append, remove } = useFieldArray({ control, name });

  return (
    <div className="border p-3 rounded space-y-2">
      <h4 className="font-bold mb-2">{name}</h4>
      {rows.map((row, rowIndex) => (
        <div key={row.id} className="border p-2 rounded space-y-2">
          {fields.map((field) => (
            <Controller
              key={field.name}
              name={`${name}.${rowIndex}.${field.name}`}
              control={control}
              render={({ field: rhfField, fieldState }) => (
                <FieldRenderer field={field} rhfField={rhfField} error={fieldState.error} />
              )}
            />
          ))}
          <button type="button" onClick={() => remove(rowIndex)} className="bg-red-500 text-white p-1 rounded">
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({})} className="bg-blue-500 text-white p-1 rounded">
        Add Row
      </button>
    </div>
  );
}
