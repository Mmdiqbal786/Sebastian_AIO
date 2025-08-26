"use client";

import DashboardList from "@/app/components/DashboardList";
import { mongoose } from "@/app/lib/prisma";
import { IAssociate } from "@/app/types/Associate";

interface DashboardAssociatesProps {
  data: IAssociate[];
  onClickEdit: (_id: mongoose.Types.ObjectId) => void;
  onClickEditPassword?: (_id: mongoose.Types.ObjectId) => void;
  onClickDelete: (_id: mongoose.Types.ObjectId) => void;
  onClickShow?: (_id: mongoose.Types.ObjectId) => void;
}

const DashboardAssociates: React.FC<DashboardAssociatesProps> = ({
  data,
  onClickEdit,
  onClickEditPassword,
  onClickDelete,
  onClickShow,
}) => {
  return (
    <DashboardList<IAssociate>
      data={data}
      entity="associates"
      columns={[
        { key: "name", label: "Name", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "associateId", label: "Associate ID" },
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

export default DashboardAssociates;
