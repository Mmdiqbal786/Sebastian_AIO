"use client";

import DashboardList from "@/app/components/DashboardList";
import { mongoose } from "@/app/lib/prisma";
import { IContractor } from "@/app/types/Contractor";

interface DashboardContractorsProps {
  data: IContractor[];
  onClickEdit: (_id: mongoose.Types.ObjectId) => void;
  onClickEditPassword?: (_id: mongoose.Types.ObjectId) => void;
  onClickDelete: (_id: mongoose.Types.ObjectId) => void;
  onClickShow?: (_id: mongoose.Types.ObjectId) => void;
}

const DashboardContractors: React.FC<DashboardContractorsProps> = ({
  data,
  onClickEdit,
  onClickEditPassword,
  onClickDelete,
  onClickShow,
}) => {
  return (
    <DashboardList<IContractor>
      data={data}
      entity="contractors"
      columns={[
        { key: "name", label: "Name", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "contractorId", label: "Contractor ID" },
        { key: "phone", label: "Phone" },
        { key: "address", label: "Address" },
        { key: "document", label: "Image" },
      ]}
      searchFields={["name", "email"]}
      downloadFields={["document"]}
      onClickEdit={onClickEdit}
      onClickEditPassword={onClickEditPassword}
      onClickDelete={onClickDelete}
      onClickShow={onClickShow}
    />
  );
};

export default DashboardContractors;
