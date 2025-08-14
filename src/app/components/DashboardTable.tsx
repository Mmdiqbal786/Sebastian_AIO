"use client";

import React, { useState, JSX } from "react";

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
}

interface DashboardTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchFields: (keyof T)[];
  renderRow: (item: T) => JSX.Element;
}

const DashboardTable = <T,>({
  data,
  columns,
  searchFields,
  renderRow,
}: DashboardTableProps<T>) => {
  const [search, setSearch] = useState<{ [key: string]: string }>({});
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSearchChange = (key: keyof T, value: string) => {
    setSearch((prev) => ({ ...prev, [key as string]: value }));
  };

  const handleSortChange = (field: keyof T) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredData = data.filter((item) =>
    searchFields.every((field) =>
      item[field]?.toString().toLowerCase().includes(search[field as string]?.toLowerCase() || "")
    )
  );

  const sortedData = sortField
    ? [...filteredData].sort((a, b) => {
        const valueA = a[sortField];
        const valueB = b[sortField];

        if (typeof valueA === "number" && typeof valueB === "number") {
          return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
        } else {
          return (sortOrder === "asc" ? 1 : -1) * String(valueA).localeCompare(String(valueB));
        }
      })
    : filteredData;

  return (
    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <span className="font-semibold text-gray-700">Search By:</span>
        {searchFields.map((field) => (
          <input
            key={String(field)}
            type="text"
            spellCheck={false}
            placeholder={`Search ${String(field)}`}
            className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 border-black"
            value={search[field as string] || ""}
            onChange={(e) => handleSearchChange(field, e.target.value)}
          />
        ))}
      </div>
      {sortedData.length > 0 ? (
        <table className="w-full border-collapse">
          <thead className="bg-stone-400 text-white">
            <tr>
              {columns.map(({ key, label, sortable }) => (
                <th
                  key={String(key)}
                  className={`py-3 px-4 text-left ${sortable ? "cursor-pointer hover:bg-gray-700" : ""}`}
                  onClick={() => sortable && handleSortChange(key)}
                >
                  {label}{" "}
                  {sortable && (
                    <span className="ml-2">{sortField === key ? (sortOrder === "asc" ? "▲" : "▼") : "⇅"}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-800 divide-y">
            {sortedData.map(renderRow)}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-600 py-4">No data available</div>
      )}
    </div>
  );
};

export default DashboardTable;
