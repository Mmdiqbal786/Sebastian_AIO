/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import DashboardTable from "@/app/components/DashboardTable";
import TableRow from "@/app/components/TableRow";
import { mongoose } from "../lib/prisma";

interface DashboardListProps<T> {
  data: T[];
  entity: string;
  path?: string;
  columns: { key: keyof T; label: string; sortable?: boolean }[];
  searchFields: (keyof T)[];
  onClickEdit: (_id: mongoose.Types.ObjectId) => void;
  onClickDelete: (_id: mongoose.Types.ObjectId) => void;
  onClickShow?: (_id: mongoose.Types.ObjectId) => void;
  onClickEditPassword?: (_id: mongoose.Types.ObjectId) => void;
  downloadFields?: (keyof T)[];
}

const DashboardList = <T extends { _id: any }>({
  data,
  entity,
  columns,
  path,
  searchFields,
  onClickEdit,
  onClickDelete,
  onClickShow,
  onClickEditPassword,
  downloadFields = [],
}: DashboardListProps<T>) => {
  return (
    <DashboardTable
      data={data}
      columns={[
        ...columns,
        { key: "actions" as keyof T, label: "Actions" }
      ]}
      searchFields={searchFields}
      renderRow={(item) => (
        <TableRow
          key={item._id}
          data={item}
          path={path}
          entity={entity}
          fields={columns.map(({ key }) => ({
            key,
            isDownload: downloadFields.includes(key),
          }))}
          onEdit={() => onClickEdit(item._id)}
          onDelete={() => onClickDelete(item._id)}
          onShow={onClickShow ? () => onClickShow(item._id) : undefined}
          onEditPassword={onClickEditPassword ? () => onClickEditPassword(item._id) : undefined}
        />
      )}
    />
  );
};

export default DashboardList;
