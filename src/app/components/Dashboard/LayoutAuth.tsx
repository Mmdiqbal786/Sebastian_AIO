import { ReactNode } from "react";
import Header from "@/app/components/Dashboard/HeaderAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "react-quill/dist/quill.snow.css";

interface LayoutAuthProps {
  children: ReactNode;
}

const LayoutAuth = ({ children }: LayoutAuthProps) => {
  return (
    <div className="h-screen flex bg-gray-200 text-black font-sans">
      <ToastContainer /> 
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="pt-[50px] p-2 px-4 py-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutAuth;
