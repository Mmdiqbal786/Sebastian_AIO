/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import { useFieldArray, Controller } from "react-hook-form";
import Select from "react-select";
import dynamic from "next/dynamic";
import makeAnimated from "react-select/animated";
import "react-quill/dist/quill.snow.css";

const animatedComponents = makeAnimated();
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export interface SubtableFieldProps {
  field: {
    name: string;
    label?: string;
    required?: boolean;
    initialRows?: number;
    subFields?: Array<{
      name: string;
      type: string;
      label?: string;
      placeholder?: string;
      maxLength?: number;
      required?: boolean;
      value?: any;
      options?: any[];
    }>;
    maxRows?: number;
  };
  register: any;
  control: any;
  errors: any;
  onChange?: (name: string, value: any) => void;
  setValue: any;
  isEdit?: boolean;
  getValues: (name?: string | string[]) => any;
  initialSubtableValue: any;
}

const SubtableField: React.FC<SubtableFieldProps> = ({
  field,
  register,
  control,
  errors,
  onChange,
  setValue,
  isEdit,
  initialSubtableValue,
}) => {
  const { fields: rows, append, remove, replace } = useFieldArray({
    control,
    name: field.name,
  });

  useEffect(() => {
    if (isEdit && Array.isArray(initialSubtableValue) && initialSubtableValue.length > 0) {
      console.log("Replacing rows with:", initialSubtableValue);
      replace(initialSubtableValue);
    }
  }, [isEdit, initialSubtableValue, replace]);

  useEffect(() => {
    if (!isEdit) {
      const initial = Number(field.initialRows) || 0;
      if (initial > 0 && rows.length === 0) {
        for (let i = 0; i < initial; i++) {
          append({});
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="form-control w-full space-y-2 text-black">
      {field.label && (
        <label className="label text-sm mt-8 text-white mb-2">
          {field.label}:
        </label>
      )}
      {rows.map((row, rowIndex) => (
        <div key={row.id} className="border p-2 mb-2 rounded bg-gray-100 space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-black font-medium">Row {rowIndex + 1}</label>
            <button
              type="button"
              onClick={() => remove(rowIndex)}
              className="btn btn-danger text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
          {field.subFields?.map((subField) => {
            const dynamicFieldName = `${field.name}.${rowIndex}.${subField.name}`;
            return (
              <div key={subField.name} className="my-2">
                {subField.label && (
                  <label className="label text-sm text-black mb-1">
                    {subField.label}:
                  </label>
                )}
                {subField.type === "select" ? (
                  <select
                    className="select select-bordered w-full p-1 text-sm py-2"
                    {...register(dynamicFieldName, { required: subField.required })}
                    onChange={(e) => {
                      setValue(dynamicFieldName, e.target.value);
                      onChange?.(dynamicFieldName, e.target.value);
                    }}
                  >
                    {subField.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : subField.type === "multi-select" ? (
                  <Controller
                    name={dynamicFieldName}
                    control={control}
                    rules={{ required: subField.required }}
                    render={({ field: controllerField }) => (
                      <Select
                        isMulti
                        components={animatedComponents}
                        options={subField.options}
                        value={subField.options?.filter((opt: any) =>
                          controllerField.value?.includes(opt.value)
                        )}
                        onChange={(selectedOptions) => {
                          const selectedValues = selectedOptions
                            ? selectedOptions.map((opt: any) => opt.value)
                            : [];
                          controllerField.onChange(selectedValues);
                          onChange?.(dynamicFieldName, selectedValues);
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
                          multiValue: (base) => ({
                            ...base,
                            backgroundColor: "#0284c7",
                            borderRadius: "4px",
                            padding: "2px 6px",
                            color: "white",
                          }),
                          multiValueLabel: (base) => ({ ...base, color: "white" }),
                          multiValueRemove: (base) => ({
                            ...base,
                            color: "white",
                            "&:hover": { backgroundColor: "#0ea5e9", color: "white" },
                          }),
                        }}
                      />
                    )}
                  />
                ) : subField.type === "richtext" ? (
                  <Controller
                    name={dynamicFieldName}
                    control={control}
                    rules={{ required: subField.required }}
                    render={({ field: controllerField }) => (
                      <ReactQuill
                        value={controllerField.value || ""}
                        onChange={(content) => {
                          controllerField.onChange(content);
                          onChange?.(dynamicFieldName, content);
                        }}
                        className="quill-editor w-full p-1 text-sm h-20"
                      />
                    )}
                  />
                ) : (
                  <input
                    type={subField.type}
                    placeholder={subField.placeholder}
                    maxLength={subField.maxLength}
                    className="input input-bordered w-full p-1 text-sm py-2"
                    {...register(dynamicFieldName, { required: subField.required })}
                    onChange={(e) => {
                      setValue(dynamicFieldName, e.target.value);
                      onChange?.(dynamicFieldName, e.target.value);
                    }}
                  />
                )}
                {errors?.[field.name]?.[rowIndex]?.[subField.name] && (
                  <p className="text-red-500 text-sm mt-0.5">
                    {`${subField.label || subField.name} is required`}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({})}
        className="btn btn-success text-white bg-green-600 hover:bg-green-700 px-2 py-1 rounded"
      >
        Add Row
      </button>
    </div>
  );
};

export default SubtableField;
