"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 px-6 text-center">
      <div className="flex flex-col items-center">
        <ShieldAlert className="h-20 w-20 text-red-500" />
        <h1 className="mt-6 text-6xl font-bold text-gray-800">403</h1>
        <h2 className="mt-2 text-2xl font-semibold text-gray-700">
          Access Forbidden
        </h2>
        <p className="mt-2 max-w-md text-gray-500">
          Sorry, you don’t have permission to access this page.  
          Please contact your administrator if you think this is a mistake.
        </p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => router.back()}
            className="rounded-xl bg-gray-200 px-5 py-2 font-medium text-gray-700 shadow hover:bg-gray-300"
          >
            Go Back
          </button>

          <Link
            href="/"
            className="rounded-xl bg-red-500 px-5 py-2 font-medium text-white shadow hover:bg-red-600"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}