import InfoLayout from "@/app/components/Dashboard/InfoLayout";
import DetailsPage from "@/app/components/DetailsPage";
import { IUserPermission } from "@/app/types/UserPermission";

export default function UserPermissionPage() {
  return (
    <InfoLayout>
      <DetailsPage<IUserPermission>
        apiType="userPermissions"
        title="User Permission Info"
        fieldLabels={{ 
          _id: "Name",
          canView: "View",
          canCreate: "Create",
          canEdit: "Edit",
          canDelete: "Delete",
          isActive: "Active",
        }}
        additionalDataConfig={[
          {
            apiEndpoint: "users",
            label: "User",
            fieldName: "userId",
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
