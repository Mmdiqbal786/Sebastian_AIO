/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateSchema } from "../schema/schemaGenerator";
import FieldRenderer from "./FieldRenderer";

export default function DynamicForm({
  schema,
  onSubmit,
  defaultValues = {}
}: { schema: any; onSubmit: (data: any) => void; defaultValues?: any }) {
  const zodSchema = generateSchema(schema.fields);
  const methods = useForm({ resolver: zodResolver(zodSchema), defaultValues });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 p-4 rounded-xl border bg-white shadow">
        {schema.fields.map((field: any) => (
          <Controller
            key={field.name}
            name={field.name}
            control={methods.control}
            render={({ field: rhfField, fieldState }) => (
              <FieldRenderer field={field} rhfField={rhfField} error={fieldState.error} />
            )}
          />
        ))}
        <button type="submit" className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700">
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
