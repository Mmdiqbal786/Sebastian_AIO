"use client";

import DashboardList from "@/app/components/DashboardList";
import { mongoose } from "@/app/lib/prisma";
import { IEmployee } from "@/app/types/Employee";

interface DashboardEmployeesProps {
  data: IEmployee[];
  onClickEdit: (_id: mongoose.Types.ObjectId) => void;
  onClickEditPassword?: (_id: mongoose.Types.ObjectId) => void;
  onClickDelete: (_id: mongoose.Types.ObjectId) => void;
  onClickShow?: (_id: mongoose.Types.ObjectId) => void;
}

const DashboardEmployees: React.FC<DashboardEmployeesProps> = ({
  data,
  onClickEdit,
  onClickEditPassword,
  onClickDelete,
  onClickShow,
}) => {
  return (
    <DashboardList<IEmployee>
      data={data}
      entity="employees"
      columns={[
        { key: "name", label: "Name", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "employeeId", label: "Employee ID" },
        { key: "phone", label: "Phone" },
        { key: "address", label: "Address" },
        { key: "profileImg", label: "Profile Image" },
        { key: "document", label: "Image" },
      ]}
      searchFields={["name", "email"]}
      downloadFields={["profileImg", "document"]}
      onClickEdit={onClickEdit}
      onClickEditPassword={onClickEditPassword}
      onClickDelete={onClickDelete}
      onClickShow={onClickShow}
    />
  );
};

export default DashboardEmployees;
