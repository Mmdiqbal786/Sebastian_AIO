"use client";

import DashboardList from "@/app/components/DashboardList";
import { mongoose } from "@/app/lib/prisma";
import { IPath } from "@/app/types/Path";

interface DashboardPathsProps {
  data: IPath[];
  onClickEdit: (_id: mongoose.Types.ObjectId) => void;
  onClickEditPassword?: (_id: mongoose.Types.ObjectId) => void;
  onClickDelete: (_id: mongoose.Types.ObjectId) => void;
  onClickShow?: (_id: mongoose.Types.ObjectId) => void;
}

const DashboardPaths: React.FC<DashboardPathsProps> = ({
  data,
  onClickEdit,
  onClickEditPassword,
  onClickDelete,
  onClickShow,
}) => {
  return (
    <DashboardList<IPath>
      data={data}
      entity="paths"
      columns={[
        { key: "name", label: "Name", sortable: true },
        { key: "path", label: "Path", sortable: true },
        { key: "slash", label: "Slash", sortable: true },
        { key: "icon", label: "Icon", sortable: true },
        { key: "iconImport", label: "Icon Import", sortable: true },
      ]}
      searchFields={["name"]}
      onClickEdit={onClickEdit}
      onClickEditPassword={onClickEditPassword}
      onClickDelete={onClickDelete}
      onClickShow={onClickShow}
    />
  );
};

export default DashboardPaths;
