"use client";

import { ReactNode, useState } from "react";
import Sidebar from "@/app/components/Dashboard/Sidebar";
import Header from "@/app/components/Dashboard/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import { GlobalLoaderProvider } from "@/app/context/GlobalLoaderContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col bg-gray-200 text-black font-sans min-h-screen">
      <GlobalLoaderProvider>
      <ToastContainer />
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col bg-gray-200 overflow-auto">
        <Header isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="py-20 p-2 lg:ml-64 md:ml-64 overflow-auto w-full max-w-full sm:max-w-[480px] md:max-w-[500px] lg:max-w-[1024px] xl:max-w-[1200px] mx-auto bg-gray-200 justify-between">
          {children}
        </main>
      </div>
      </GlobalLoaderProvider>
    </div>
  );
};

export default Layout;
