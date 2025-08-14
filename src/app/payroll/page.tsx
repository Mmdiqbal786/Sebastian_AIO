"use client";

import Layout from "@/app/components/Dashboard/Layout";
import ComingSoonTemplate from "@/app/components/Utils/ComingSoonTemplate";

export default function PayrollsPage() {
  return (
    <Layout>
      <ComingSoonTemplate
        title="Coming Soon"
        message="We're working hard to bring you the Payrolls feature. Stay tuned!"
      />
    </Layout>
  );
}