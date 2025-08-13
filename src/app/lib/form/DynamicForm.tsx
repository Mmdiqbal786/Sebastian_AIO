/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import SubtableField from "@/app/lib/form/SubtableField";
import DynamicFileInput from "@/app/lib/form/DynamicFileInput";
import DynamicMultiSelect, { DynamicMultiSelectConfig } from "@/app/lib/form/DynamicMultiSelect";

const animatedComponents = makeAnimated();
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export interface FormField {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  value?: any;
  options?: Array<{ label: string; value: any }>;
  subFields?: FormField[];
  initialRows?: number;
  onChange?: (fieldName: string, value: string) => void;
  maxRows?: number;
  validation?: {
    pattern?: RegExp;
    message?: string;
  };
  config?: DynamicMultiSelectConfig;
}

export interface DynamicFormProps {
  fields: FormField[];
  initialData?: Record<string, any>;
  onSubmit: (data: any) => void;
  loading?: boolean;
  onChange?: (fieldName: string, value: any) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  initialData,
  onSubmit,
  loading,
  onChange,
}) => {
  const defaultValues = React.useMemo(() => {
    return fields.reduce((acc, field) => {
      if (field.type === "subtable") {
        acc[field.name] = initialData && initialData[field.name]
          ? initialData[field.name]
          : [];
      } else if (field.type !== "file") {
        // Exclude file fields from default values.
        acc[field.name] =
          initialData && initialData[field.name] !== undefined
            ? initialData[field.name]
            : field.value || "";
      }
      return acc;
    }, {} as Record<string, any>);
  }, [fields, initialData]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
    control,
  } = useForm({ defaultValues });

  const [hasReset, setHasReset] = useState(false);
  useEffect(() => {
    if (initialData && !hasReset) {
      console.log("Resetting form with initialData:", initialData);
      reset(defaultValues);
      setHasReset(true);
    }
  }, [initialData, defaultValues, reset, hasReset]);
  
  const isEdit = Boolean(initialData && Object.keys(initialData).length);

  const handleCustomFileChange = (fieldName: string, file: File | null) => {
    setValue(fieldName, file, { shouldValidate: true });
    onChange?.(fieldName, file);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-h-[80vh] overflow-y-auto px-2"
    >
      {fields.map((field) => {
        if (field.type === "subtable") {
          return (
            <SubtableField
              key={field.name}
              field={field}
              register={register}
              control={control}
              errors={errors}
              onChange={onChange}
              setValue={setValue}
              isEdit={isEdit}
              getValues={getValues}
              initialSubtableValue={defaultValues[field.name]}
            />
          );
        } else if (field.type === "dynamic-multiselect") {
          return (
            <div
              key={field.name}
              className="form-control w-full space-y-2 text-black"
            >
              {field.label && (
                <label className="label text-sm mt-8 text-white mb-2">
                  {field.label}:
                </label>
              )}
              <DynamicMultiSelect
                fieldName={field.name}
                setValue={setValue}
                getValues={getValues}
                onChange={onChange}
                config={field.config}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-0.5">
                  {`${field.label || field.name} is required`}
                </p>
              )}
            </div>
          );
        }
        return (
          <div
            key={field.name}
            className="form-control w-full space-y-2 text-black"
            style={{ display: field.type === "hidden" ? "none" : "block" }}
          >
            {field.label && (
              <label className="label text-sm mt-8 text-white mb-2">
                {field.label}:
              </label>
            )}
            {field.type === "creatable-select" ? (
              <CreatableSelect
                isMulti
                options={field.options}
                defaultValue={
                  field.value
                    ? field.options?.find((opt) => opt.value === field.value)
                    : undefined
                }
                onChange={(selectedOption) => {
                  const selectedValues = selectedOption
                    ? selectedOption.map((opt) => opt.value)
                    : [];
                  setValue(field.name, selectedValues, { shouldValidate: true });
                  onChange?.(field.name, selectedValues);
                }}
                className="react-select-container w-full text-sm"
                styles={{
                  control: (base, { isFocused }) => ({
                    ...base,
                    backgroundColor: "black",
                    borderRadius: "6px",
                    border: isFocused ? "2px solid #0ea5e9" : "1px solid #d1d5db",
                    boxShadow: isFocused
                      ? "0 0 5px rgba(14, 165, 233, 0.5)"
                      : "none",
                    "&:hover": { borderColor: "#0ea5e9" },
                    padding: "4px",
                  }),
                  placeholder: (base) => ({ ...base, color: "white" }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    color: "white",
                    "&:hover": { color: "#0284c7" },
                  }),
                  option: (base, { isSelected, isFocused }) => ({
                    ...base,
                    backgroundColor: isSelected
                      ? "black"
                      : isFocused
                      ? "#e0f2fe"
                      : "white",
                    color: isSelected ? "white" : "black",
                    padding: "8px",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  }),
                  menuList: (base) => ({ ...base, padding: "4px" }),
                  singleValue: (base) => ({ ...base, color: "white" }),
                }}
              />
            ) : field.type === "multi-select" ? (
              <Select
                isMulti
                components={animatedComponents}
                options={field.options}
                defaultValue={
                  field.value
                    ? field.options?.filter((opt) =>
                        field.value.includes(opt.value)
                      )
                    : undefined
                }
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions
                    ? selectedOptions.map((opt) => opt.value)
                    : [];
                  setValue(field.name, selectedValues, { shouldValidate: true });
                  onChange?.(field.name, selectedValues);
                }}
                className="react-select-container w-full text-sm"
                styles={{
                  control: (base, { isFocused }) => ({
                    ...base,
                    backgroundColor: "white",
                    borderRadius: "6px",
                    border: isFocused ? "2px solid #0ea5e9" : "1px solid #d1d5db",
                    boxShadow: isFocused
                      ? "0 0 5px rgba(14, 165, 233, 0.5)"
                      : "none",
                    "&:hover": { borderColor: "#0ea5e9" },
                    padding: "4px",
                  }),
                  placeholder: (base) => ({ ...base, color: "#374151" }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    color: "#374151",
                    "&:hover": { color: "#0284c7" },
                  }),
                  option: (base, { isSelected, isFocused }) => ({
                    ...base,
                    backgroundColor: isSelected
                      ? "black"
                      : isFocused
                      ? "#e0f2fe"
                      : "white",
                    color: isSelected ? "white" : "black",
                    padding: "8px",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "white",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  }),
                  menuList: (base) => ({ ...base, padding: "4px" }),
                }}
              />
            ) : field.type === "richtext" ? (
              <ReactQuill
                value={getValues(field.name) || ""}
                onChange={(content) => {
                  setValue(field.name, content, { shouldValidate: true });
                  onChange?.(field.name, content);
                }}
                className="quill-editor w-full p-1 text-sm h-20"
              />
            ) : field.type === "phone" ? (
              <input
                type="tel"
                placeholder={field.placeholder || "Enter your phone number"}
                defaultValue={field.value}
                {...register(field.name, {
                  required: field.required,
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: `${field.label || field.name} format is invalid`,
                  },
                })}
                onChange={(e) => onChange?.(field.name, e.target.value)}
                className="input input-bordered w-full p-1 text-sm py-2"
              />
            ) : field.type === "textarea" ? (
              <textarea
                placeholder={field.placeholder}
                maxLength={field.maxLength}
                defaultValue={field.value}
                {...register(field.name, { required: field.required })}
                onChange={(e) => onChange?.(field.name, e.target.value)}
                className="textarea textarea-bordered w-full p-1 text-sm py-2"
              />
            ) : field.type === "file" ? (
              <DynamicFileInput
                name={field.name}
                label={field.label || ''}
                existingFileURL={
                  initialData?.[field.name] && initialData[field.name] !== ''
                    ? `/${initialData[field.name]}`
                    : undefined
                }
                onFileChange={(file) => handleCustomFileChange(field.name, file)}
              />
            ) : field.type === "select" ? (
              // <select
              //   className="select select-bordered w-full p-1 text-sm py-2"
              //   defaultValue={field.value}
              //   {...register(field.name, { required: field.required })}
              //   onChange={(e) => onChange?.(field.name, e.target.value)}
              // >
              //   {field.options?.map((option) => (
              //     <option key={option.value} value={option.value}>
              //       {option.label}
              //     </option>
              //   ))}
              // </select>
              <Controller
              key={field.name}
              name={field.name}
              control={control}
              rules={{ required: field.required }}
              render={({ field: { onChange, value } }) => (
                <select
                  className="select select-bordered w-full p-1 text-sm py-2"
                  value={value || ""}
                  onChange={(e) => {
                    onChange(e.target.value);
                    field.onChange?.(field.name, e.target.value);
                  }}
                >
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            />
            ) : field.type === "radio" && field.options ? (
              <div className="flex space-x-2">
                {field.options.map((option) => (
                  <label
                    key={option.value}
                    className="label cursor-pointer flex items-center space-x-1"
                  >
                    <input
                      type="radio"
                      value={option.value}
                      defaultChecked={field.value === option.value}
                      {...register(field.name, { required: field.required })}
                      onChange={(e) => onChange?.(field.name, e.target.value)}
                      className="radio w-4 h-4"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            ) : field.type === "checkbox" && field.options ? (
              <div className="flex flex-wrap space-x-2">
                {field.options.map((option) => (
                  <label
                    key={option.value}
                    className="label cursor-pointer flex items-center space-x-1"
                  >
                    <input
                      type="checkbox"
                      value={option.value}
                      defaultChecked={
                        field.value && field.value.includes(option.value)
                      }
                      {...register(field.name)}
                      onChange={(e) => onChange?.(field.name, e.target.checked)}
                      className="checkbox w-4 h-4"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            ) : field.type === "date" ? (
              <input
                type="datetime-local"
                className="input input-bordered w-full p-1 text-sm py-2"
                {...register(field.name, { required: field.required })}
                defaultValue={
                  field.value
                    ? new Date(
                        new Date(field.value).getTime() -
                          new Date(field.value).getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .slice(0, 16)
                    : ""
                }
                onChange={(e) => {
                  const localDateStr = e.target.value;
                  if (!localDateStr) {
                    onChange?.(field.name, "");
                    return;
                  }
                  const utcDate = new Date(localDateStr).toISOString();
                  onChange?.(field.name, utcDate);
                }}
              />
            ) : (
              <input
                type={field.type}
                placeholder={field.placeholder}
                maxLength={field.maxLength}
                defaultValue={field.value}
                {...register(field.name, { required: field.required })}
                onChange={(e) => onChange?.(field.name, e.target.value)}
                className="input input-bordered w-full p-1 text-sm py-2"
              />
            )}
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-0.5">
                {`${field.label || field.name} is required`}
              </p>
            )}
          </div>
        );
      })}
      <div className="form-control pt-1 py-2">
        <button
          type="submit"
          className={`btn btn-primary bg-blue-600 w-full p-1 text-sm ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;
