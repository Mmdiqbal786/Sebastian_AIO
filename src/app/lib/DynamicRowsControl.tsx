/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";

export interface RowField {
  key: string;
  type: "text" | "number" | "select" | "date" | "checkbox";
  label?: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
}

export interface DynamicRowsControlProps {
  name: string;
  value?: Record<string, any>[];
  onChange: (value: Record<string, any>[]) => void;
  fieldsConfig: RowField[];
  label?: string;
}

const DynamicRowsControl: React.FC<DynamicRowsControlProps> = ({
  name,
  value = [],
  onChange,
  fieldsConfig,
  label = "Rows",
}) => {
  const [rows, setRows] = useState<Record<string, any>[]>(value);

  useEffect(() => {
    onChange(rows);
  }, [rows, onChange]);

  const addRow = () => {
    const newRow: Record<string, any> = {};
    fieldsConfig.forEach((field) => {
      newRow[field.key] = field.type === "checkbox" ? false : "";
    });
    setRows([...rows, newRow]);
  };

  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, key: string, val: any) => {
    setRows(rows.map((row, i) => (i === index ? { ...row, [key]: val } : row)));
  };

  return (
    <div data-field-name={name}>
      {label && <label className="block font-bold mb-2">{label}</label>}
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="border p-2 mb-4 rounded">
          {fieldsConfig.map((field) => (
            <div key={field.key} className="mb-2">
              {field.label && (
                <label className="block mb-1 text-sm font-medium">
                  {field.label}
                </label>
              )}
              {field.type === "select" ? (
                <select
                  value={row[field.key]}
                  onChange={(e) => updateRow(rowIndex, field.key, e.target.value)}
                  className="input input-bordered w-full"
                >
                  <option value="">Select {field.label || field.key}</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "checkbox" ? (
                <input
                  type="checkbox"
                  checked={!!row[field.key]}
                  onChange={(e) =>
                    updateRow(rowIndex, field.key, e.target.checked)
                  }
                  className="checkbox"
                />
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={row[field.key]}
                  onChange={(e) => updateRow(rowIndex, field.key, e.target.value)}
                  className="input input-bordered w-full"
                />
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => removeRow(rowIndex)}
            className="btn btn-error btn-sm self-end"
          >
            Remove Row
          </button>
        </div>
      ))}
      <button type="button" onClick={addRow} className="btn btn-secondary">
        Add Row
      </button>
    </div>
  );
};

export default DynamicRowsControl;
