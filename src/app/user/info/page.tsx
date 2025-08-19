// import InfoLayout from "@/app/components/Dashboard/InfoLayout";
// import DetailsPage from "@/app/components/DetailsPage";
// import { IUser } from "@/app/types/User";

// export default function UserPage() {
//   return (
//     <InfoLayout>
//       <DetailsPage<IUser>
//         apiType="users"
//         title="User Info"
//         fieldLabels={{ name: "Name", email: "Email" }}
//       />
//     </InfoLayout>
//   );
// }

import InfoLayout from "@/app/components/Dashboard/InfoLayout";
import DetailsPage from "@/app/components/DetailsPage";
import { IUser } from "@/app/types/User";

export default function UserPage() {
  return (
    <InfoLayout>
      <DetailsPage<IUser>
        apiType="users"
        title="User Info"
        fieldLabels={{
          name: "Name",
          email: "Email",
          userId: "User Id",
          phone: "Phone",
          profileImg: "Profile Image",
        }}
        additionalDataConfig={[
          {
            apiEndpoint: "userTypes",
            label: "User Type",
            fieldName: "userTypeId",
            tableFieldName: "name"
          },
          {
            apiEndpoint: "roles",
            label: "User Role",
            fieldName: "roleId",
            tableFieldName: "name"
          },
        ]}
      />
    </InfoLayout>
  );
}
