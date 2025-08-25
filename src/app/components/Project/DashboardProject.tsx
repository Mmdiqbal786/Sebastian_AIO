"use client";

import DashboardList from "@/app/components/DashboardList";
import { mongoose } from "@/app/lib/prisma";
import { IProject } from "@/app/types/Project";

interface DashboardProjectsProps {
  data: IProject[];
  onClickEdit: (_id: mongoose.Types.ObjectId) => void;
  onClickEditPassword?: (_id: mongoose.Types.ObjectId) => void;
  onClickDelete: (_id: mongoose.Types.ObjectId) => void;
  onClickShow?: (_id: mongoose.Types.ObjectId) => void;
}

const DashboardProjects: React.FC<DashboardProjectsProps> = ({
  data,
  onClickEdit,
  onClickEditPassword,
  onClickDelete,
  onClickShow,
}) => {
  return (
    <DashboardList<IProject>
      data={data}
      entity="projects"
      columns={[
        { key: "name", label: "Name", sortable: true },
        { key: "client", label: "Client", sortable: true },
        { key: "owner", label: "Owner", sortable: true },
        { key: "headCount", label: "Head Count", sortable: true },
      ]}
      path="project"
      searchFields={["name"]}
      onClickEdit={onClickEdit}
      onClickEditPassword={onClickEditPassword}
      onClickDelete={onClickDelete}
      onClickShow={onClickShow}
    />
  );
};

export default DashboardProjects;
