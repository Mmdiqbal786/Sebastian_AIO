"use client";

import DashboardList from "@/app/components/DashboardList";
import { mongoose } from "@/app/lib/prisma";
import { IFood } from "@/app/types/Food";

interface DashboardFoodsProps {
  data: IFood[];
  onClickEdit: (_id: mongoose.Types.ObjectId) => void;
  onClickEditPassword?: (_id: mongoose.Types.ObjectId) => void;
  onClickDelete: (_id: mongoose.Types.ObjectId) => void;
  onClickShow?: (_id: mongoose.Types.ObjectId) => void;
}

const DashboardFoods: React.FC<DashboardFoodsProps> = ({
  data,
  onClickEdit,
  onClickEditPassword,
  onClickDelete,
  onClickShow,
}) => {
  return (
    <DashboardList<IFood>
      data={data}
      entity="foods"
      columns={[
        { key: "name", label: "Name", sortable: true },
        //   { key: "price", label: "Price", sortable: true },
        //   { key: "stock", label: "Stock" },
        { key: "image", label: "Image" },
      ]}
      // searchFields={["name", "price"]}
      searchFields={["name"]}
      downloadFields={["image"]}
      onClickEdit={onClickEdit}
      onClickEditPassword={onClickEditPassword}
      onClickDelete={onClickDelete}
      onClickShow={onClickShow}
    />
  );
};

export default DashboardFoods;
