"use client";

import { ReactNode, useState } from "react";
import Sidebar from "@/app/components/Dashboard/User/Sidebar";
import Header from "@/app/components/Dashboard/User/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ProtectedRoute from "@/app/components/ProtectedRoute";
import "react-quill/dist/quill.snow.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    // <ProtectedRoute>
      <div className="flex flex-col bg-gray-200 text-black font-sans min-h-screen">
        <ToastContainer />
        <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col bg-gray-200 overflow-auto">
          <Header isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <main className="pt-[50px] p-2 lg:ml-64 md:ml-64 overflow-auto"> */}
          <main className="py-20 p-2 lg:ml-64 md:ml-64 overflow-auto w-full max-w-full sm:max-w-[480px] md:max-w-[500px] lg:max-w-[1024px] xl:max-w-[1200px] mx-auto bg-gray-200 justify-between">
            {children}
          </main>
        </div>
      </div>
    // </ProtectedRoute>
  );
};

export default Layout;
