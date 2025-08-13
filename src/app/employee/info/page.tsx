import DetailsPage from "@/app/components/DetailsPage";
import { IEmployee } from "@/app/types/Employee";
import InfoLayout from "@/app/components/Dashboard/InfoLayout";

export default function EmployeePage() {
  return (
    <InfoLayout>
      <DetailsPage<IEmployee>
        apiType="employees"
        title="Employee Info"
        fieldLabels={{ 
          name: "Name", 
          email: "Email", 
          employeeId: "Employee Id",
          phone: "Phone",
          dob: "Date of Birth",
          address: "Address",
          type: "Employee Role",
          profileImg: "Profile Image",
          document: "Document",
        }}
      />
    </InfoLayout>
  );
}
