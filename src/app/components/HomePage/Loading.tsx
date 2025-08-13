import Logo from "@/app/lib/Logo";
import React from "react";

const Loading: React.FC = () => (
  <div className="mx-auto flex flex-col pb-20 max-w-7xl bg-white items-center justify-between p-6 lg:px-8">
    <Logo variant="small" className={`w-full max-w-[50px] h-[50px] rounded-lg animate-bounce ... absolute`} />
  </div>
);

export default Loading;
