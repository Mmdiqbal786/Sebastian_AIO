"use client";

import React from "react";
import Layout from "@/app/components/Dashboard/LayoutAuth";
import DynamicForm, { FieldConfig } from "@/app/lib/utils/DynamicForm";

const loginFields: FieldConfig[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^[^@]+@[^@]+\.[^@]+$/,
        message: "Invalid email format",
      },
    },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    validation: { required: "Password is required" },
  },
];

export default function LoginPage() {
  return (
    <Layout>
      <main className="bg-gray-200 flex justify-center items-center px-4 sm:px-6 lg:px-8 py-24">
        <DynamicForm
          title="Login"
          fields={loginFields}
          apiEndpoint="/api/auth/login"
          mode="login"
          redirectTo="/employee"
        />
      </main>
    </Layout>
  );
}
