"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingFullPage from "../HomePage/LoadingFullPage";

export type LoaderType = "fullPage" | "spinner" | "skeleton" | "none";

interface GlobalLoaderProps {
  loaderType?: LoaderType;
}

const GlobalLoader = ({ loaderType = "fullPage" }: GlobalLoaderProps) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pathname) {
      return
    };

    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) {
    return null
  };

  if (loaderType === "none") {
    return null
  };

  if (loaderType === "spinner") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[9999]">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (loaderType === "skeleton") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-[9999]">
        <div className="animate-pulse w-2/3 h-64 bg-gray-300 rounded-lg"></div>
      </div>
    );
  }

  return <LoadingFullPage />;
};

export default GlobalLoader;
