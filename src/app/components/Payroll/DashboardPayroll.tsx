"use client";

import DashboardList from "@/app/components/DashboardList";
import { mongoose } from "@/app/lib/prisma";
import { IPayroll } from "@/app/types/Payroll";

interface DashboardPayrollsProps {
  data: IPayroll[];
  onClickEdit: (_id: mongoose.Types.ObjectId) => void;
  onClickEditPassword?: (_id: mongoose.Types.ObjectId) => void;
  onClickDelete: (_id: mongoose.Types.ObjectId) => void;
  onClickShow?: (_id: mongoose.Types.ObjectId) => void;
}

const DashboardPayrolls: React.FC<DashboardPayrollsProps> = ({
  data,
  onClickEdit,
  onClickEditPassword,
  onClickDelete,
  onClickShow,
}) => {
  return (
    <DashboardList<IPayroll>
      data={data}
      entity="payrolls"
      columns={[
        { key: "name", label: "Name", sortable: true },
        { key: "location", label: "Location", sortable: true },
        { key: "month", label: "Month", sortable: true },
        { key: "owner", label: "Owner", sortable: true },
        { key: "payer", label: "Payer", sortable: true },
        { key: "invoiceOrPayslip", label: "Invoice/Payslip", sortable: true },
        { key: "payment", label: "Payment", sortable: true },
      ]}
      path="payroll"
      searchFields={["name"]}
      onClickEdit={onClickEdit}
      onClickEditPassword={onClickEditPassword}
      onClickDelete={onClickDelete}
      onClickShow={onClickShow}
    />
  );
};

export default DashboardPayrolls;
