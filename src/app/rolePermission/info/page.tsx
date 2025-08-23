import InfoLayout from "@/app/components/Dashboard/InfoLayout";
import DetailsPage from "@/app/components/DetailsPage";
import { IRolePermission } from "@/app/types/RolePermission";

export default function RolePermissionPage() {
  return (
    <InfoLayout>
      <DetailsPage<IRolePermission>
        apiType="rolePermissions"
        title="Role Permission Info"
        fieldLabels={{ 
          name: "Name",
          canView: "View",
          canCreate: "Create",
          canEdit: "Edit",
          canDelete: "Delete",
          isActive: "Active",
        }}
        additionalDataConfig={[
          {
            apiEndpoint: "roles",
            label: "Role",
            fieldName: "roleId",
            tableFieldName: "name"
          },
          {
            apiEndpoint: "paths",
            label: "Path",
            fieldName: "pathId",
            tableFieldName: "name"
          },
        ]}
      />
    </InfoLayout>
  );
}
