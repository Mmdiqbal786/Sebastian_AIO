"use client";

import React from "react";
import Layout from "@/app/components/Dashboard/LayoutAuth";
import DynamicForm, { FieldConfig } from "@/app/lib/utils/DynamicForm";
import Header from "../components/Dashboard/HeaderAuth";

const registrationFields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text", placeholder: "Enter your name" },
  { name: "email", label: "Email", type: "email", placeholder: "Enter your email" },
  { 
    name: "phone", 
    label: "Phone", 
    type: "phone", 
    placeholder: "Enter phone number", 
    validation: { 
      required: "Phone is required", 
      pattern: { 
        value: /^\+\d{1,3}\s?\d{7,14}$/, 
        message: "Invalid phone number format" 
      } 
    } 
  },
  { name: "dob", label: "Date of Birth", type: "date" },
  { 
    name: "address", 
    label: "Address", 
    type: "textarea", 
    placeholder: "Enter address", 
    validation: { required: "Address is required" } 
  },
  { 
    name: "profileImg", 
    label: "Profile Pic", 
    type: "file", 
    validation: { required: "Profile Image is required" } 
  },
  { 
    name: "document", 
    label: "Document", 
    type: "file", 
    validation: { required: "Document is required" } 
  },
  { 
    name: "password", 
    label: "Password", 
    type: "password", 
    placeholder: "Enter password", 
    validation: { required: "Password is required" } 
  },
];

export default function RegisterPage() {
  return (
    <Layout>
      <Header />
      <main className="bg-gray-200 flex justify-center items-center px-4 sm:px-6 lg:px-8 py-24">
        <DynamicForm
          title="Register"
          fields={registrationFields}
          apiEndpoint="/api/register"
          mode="register"
        />
      </main>
    </Layout>
  );
}
