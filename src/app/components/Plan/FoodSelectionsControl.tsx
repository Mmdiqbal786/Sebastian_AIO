"use client";

import React, { useState, useEffect } from "react";

export interface FoodSelection {
  category: string;
  selectionLimit: string;
}

export interface FoodSelectionsControlProps {
  name: string;
  value?: FoodSelection[];
  onChange: (value: FoodSelection[]) => void;
  categoryOptions: { label: string; value: string }[];
  label?: string;
}

const FoodSelectionsControl: React.FC<FoodSelectionsControlProps> = ({
  value = [],
  onChange,
  categoryOptions,
  label = "Food Selections",
}) => {
  const [rows, setRows] = useState<FoodSelection[]>(value);

  useEffect(() => {
    onChange(rows);
  }, [rows, onChange]);

  const addRow = () => {
    setRows([...rows, { category: "", selectionLimit: "" }]);
  };

  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, key: keyof FoodSelection, val: string) => {
    setRows(rows.map((row, i) => (i === index ? { ...row, [key]: val } : row)));
  };

  return (
    <div>
      {label && <label className="block font-bold mb-2">{label}</label>}
      {rows.map((row, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <select
            value={row.category}
            onChange={(e) => updateRow(index, "category", e.target.value)}
            className="input input-bordered"
          >
            <option value="">Select Category</option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Selection Limit"
            value={row.selectionLimit}
            onChange={(e) => updateRow(index, "selectionLimit", e.target.value)}
            className="input input-bordered"
          />
          <button
            type="button"
            onClick={() => removeRow(index)}
            className="btn btn-error btn-sm"
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addRow} className="btn btn-secondary">
        Add Food Selection
      </button>
    </div>
  );
};

export default FoodSelectionsControl;
