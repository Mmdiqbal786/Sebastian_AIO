"use client";

import Layout from "@/app/components/Dashboard/Layout";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LoadingFullPage from "@/app/components/HomePage/LoadingFullPage";
import Image from "next/image";

type FormData = {
  NEXT_MONGO_URI: string;
  NEXT_MONGO_DB: string;
  NEXT_PUBLIC_COMPANY_NAME: string;
  NEXT_PUBLIC_COMPANY_LOGO_PATH: string;
};

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [currentLogo, setCurrentLogo] = useState<string | null>(null); // Server-provided logo path
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Blob URL for preview
  const [file, setFile] = useState<File | null>(null);
  const [cacheBuster, setCacheBuster] = useState<number>(Date.now());

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      NEXT_MONGO_URI: "",
      NEXT_MONGO_DB: "",
      NEXT_PUBLIC_COMPANY_NAME: "",
      NEXT_PUBLIC_COMPANY_LOGO_PATH: "",
    },
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        if (!res.ok) throw new Error("Failed to fetch settings");
        
        const data = await res.json();
        Object.entries(data).forEach(([key, value]) => {
          setValue(key as keyof FormData, value as string);
        });

        if (data.NEXT_PUBLIC_COMPANY_LOGO_PATH) {
          setCurrentLogo(data.NEXT_PUBLIC_COMPANY_LOGO_PATH);
        }
      } catch (error) {
        toast.error("Failed to load settings");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("NEXT_MONGO_URI", data.NEXT_MONGO_URI);
    formData.append("NEXT_MONGO_DB", data.NEXT_MONGO_DB);
    formData.append("NEXT_PUBLIC_COMPANY_NAME", data.NEXT_PUBLIC_COMPANY_NAME);
    if (file) {
      formData.append("logo", file);
    }
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to update settings");
      }
      const updatedData = await response.json();
      toast.success("Settings updated! Restart server to apply changes.");
      if (file && updatedData.NEXT_PUBLIC_COMPANY_LOGO_PATH) {
        setCurrentLogo(updatedData.NEXT_PUBLIC_COMPANY_LOGO_PATH);
        setPreviewUrl(null);
        setFile(null);
        setCacheBuster(Date.now());
      }
    } catch (error) {
      toast.error("Error updating settings");
      console.error(error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(uploadedFile));
    }
  };

  if (loading) return <LoadingFullPage />;

  return (
    <Layout>
      <div className="py-24 px-3">
        <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg py-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">Database URL</label>
                <input
                  type="text"
                  {...register("NEXT_MONGO_URI", { required: "Database URL is required" })}
                  className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {errors.NEXT_MONGO_URI && <p className="text-red-500 text-sm mt-1">{errors.NEXT_MONGO_URI.message}</p>}
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">Database Name</label>
                <input
                  type="text"
                  {...register("NEXT_MONGO_DB", { required: "Database Name is required" })}
                  className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {errors.NEXT_MONGO_DB && <p className="text-red-500 text-sm mt-1">{errors.NEXT_MONGO_DB.message}</p>}
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  {...register("NEXT_PUBLIC_COMPANY_NAME", { required: "Company Name is required" })}
                  className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {errors.NEXT_PUBLIC_COMPANY_NAME && <p className="text-red-500 text-sm mt-1">{errors.NEXT_PUBLIC_COMPANY_NAME.message}</p>}
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">Company Logo</label>
                {previewUrl ? (
                  <Image
                    width={100}
                    height={20}
                    src={previewUrl}
                    alt="Preview"
                    className="w-32 h-32 object-cover mb-3"
                    unoptimized
                  />
                ) : currentLogo ? (
                  <Image
                    width={100}
                    height={20}
                    src={`${currentLogo}?t=${cacheBuster}`}
                    alt="Company Logo"
                    className="w-32 h-32 object-cover mb-3"
                  />
                ) : null}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-md w-full sm:w-auto block mx-auto hover:bg-blue-600 transition"
            >
              Save Settings
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}