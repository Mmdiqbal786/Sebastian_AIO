"use client";

import { ReactNode } from "react";
import Header from "@/app/components/Dashboard/HeaderAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import GlobalLoader from "@/app/components/Utils/GlobalLoader"; // ✅ import your loader

interface LayoutAuthProps {
  children: ReactNode;
}

const LayoutAuth = ({ children }: LayoutAuthProps) => {
  return (
    <div className="h-screen flex bg-white text-black font-sans">
      <ToastContainer />
      <GlobalLoader />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="pt-[50px] p-2 px-4 py-4 overflow-auto bg-white">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LayoutAuth;
