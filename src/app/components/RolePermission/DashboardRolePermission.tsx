"use client";

import DashboardList from "@/app/components/DashboardList";
import { mongoose } from "@/app/lib/prisma";
import { IRolePermission } from "@/app/types/RolePermission";

interface DashboardRolePermissionsProps {
  data: IRolePermission[];
  onClickEdit: (_id: mongoose.Types.ObjectId) => void;
  onClickEditPassword?: (_id: mongoose.Types.ObjectId) => void;
  onClickDelete: (_id: mongoose.Types.ObjectId) => void;
  onClickShow?: (_id: mongoose.Types.ObjectId) => void;
}

const DashboardRolePermissions: React.FC<DashboardRolePermissionsProps> = ({
  data,
  onClickEdit,
  onClickEditPassword,
  onClickDelete,
  onClickShow,
}) => {
  return (
    <DashboardList<IRolePermission>
      data={data}
      entity="rolePermissions"
      columns={[
        { key: "name", label: "Name", sortable: true },
        { key: "canView", label: "View", sortable: true },
        { key: "canCreate", label: "Create", sortable: true },
        { key: "canEdit", label: "Edit", sortable: true },
        { key: "canDelete", label: "Delete", sortable: true },
        { key: "isActive", label: "Active", sortable: true },
      ]}
      path="rolePermission"
      searchFields={["name"]}
      onClickEdit={onClickEdit}
      onClickEditPassword={onClickEditPassword}
      onClickDelete={onClickDelete}
      onClickShow={onClickShow}
    />
  );
};

export default DashboardRolePermissions;
