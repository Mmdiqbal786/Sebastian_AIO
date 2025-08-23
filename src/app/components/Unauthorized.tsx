"use client";
import Layout from "@/app/components/Dashboard/Layout";

export default function UnauthorizedPage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized</h1>
        <p className="text-lg text-gray-700">You do not have permission to access this page.</p>
      </div>
    </Layout>
  );
}
