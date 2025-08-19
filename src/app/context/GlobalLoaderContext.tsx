"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import GlobalLoader, { LoaderType } from "@/app/components/Utils/GlobalLoader";

interface LoaderContextProps {
  showLoader: (type?: LoaderType, duration?: number) => void;
}

const LoaderContext = createContext<LoaderContextProps | undefined>(undefined);

export const GlobalLoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [loaderType, setLoaderType] = useState<LoaderType>("fullPage");

  const showLoader = (type: LoaderType = "fullPage", duration = 1000) => {
    setLoaderType(type);
    setLoading(true);
    setTimeout(() => setLoading(false), duration);
  };

  return (
    <LoaderContext.Provider value={{ showLoader }}>
      {children}
      {loading && <GlobalLoader loaderType={loaderType} />}
    </LoaderContext.Provider>
  );
};

export const useGlobalLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useGlobalLoader must be used inside GlobalLoaderProvider");
  }
  return context;
};