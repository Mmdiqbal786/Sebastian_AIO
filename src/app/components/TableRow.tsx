/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { BsDownload } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { generateShowLink } from "@/app/lib/showHelper";
import { mongoose } from "../lib/prisma";

interface TableRowProps<T> {
  data: T;
  path?: string;
  fields: Array<{ key: keyof T; label?: string; isDownload?: boolean }>;
  onEdit?: (_id: mongoose.Types.ObjectId) => void;
  onDelete?: (_id: mongoose.Types.ObjectId) => void;
  onShow?: (_id: mongoose.Types.ObjectId) => void;
  onEditPassword?: (_id: mongoose.Types.ObjectId) => void;
  entity: string;
}

const TableRow = <T extends { _id: any }>({
  data,
  fields,
  path,
  onEdit,
  onDelete,
  onShow,
  onEditPassword,
  entity,
}: TableRowProps<T>) => {
  return (
    <tr key={data._id} className="border-b transition">
      {fields.map(({ key, isDownload }) => (
        <td key={String(key)} className="px-4 py-3 whitespace-nowrap">
          {isDownload ? (
            <a href={`/${data[key]}`} download className="flex items-center text-green-500 hover:text-green-400 transition">
              <BsDownload size={22} />
            </a>
          ) : (
            <span className="truncate block max-w-[200px]">{String(data[key] ?? "N/A")}</span>
          )}
        </td>
      ))}
      <td className="px-4 py-3 flex items-center gap-3">
        {onEdit && (
          <FiEdit
            onClick={() => onEdit(data._id)}
            className="text-blue-500 hover:text-blue-400 transition cursor-pointer"
            size={22}
          />
        )}
        {onEditPassword && (
          <RiLockPasswordLine
            onClick={() => onEditPassword(data._id)}
            className="text-blue-500 hover:text-blue-400 transition cursor-pointer"
            size={22}
          />
        )}
        {onShow && generateShowLink(entity, data._id, () => onShow(data._id), path)}
        {onDelete && (
          <FiTrash2
            onClick={() => onDelete(data._id)}
            className="text-red-500 hover:text-red-400 transition cursor-pointer"
            size={22}
          />
        )}
      </td>
    </tr>
  );
};

export default TableRow;
