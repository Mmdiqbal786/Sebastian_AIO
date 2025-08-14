"use client";

import Layout from "@/app/components/Dashboard/Layout";
import ComingSoonTemplate from "@/app/components/Utils/ComingSoonTemplate";

export default function ConsultantPage() {
  return (
    <Layout>
      <ComingSoonTemplate
        title="Coming Soon"
        message="We're working hard to bring you the Consultant feature. Stay tuned!"
      />
    </Layout>
  );
}