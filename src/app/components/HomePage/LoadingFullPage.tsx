import Logo from "@/app/lib/Logo";
import React from "react";

const LoadingFullPage: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
    <Logo variant="small" className={`w-full max-w-[50px] h-[50px] rounded-lg animate-bounce ... absolute`} />
  </div>
);

export default LoadingFullPage;
