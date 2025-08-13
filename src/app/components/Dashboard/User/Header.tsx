import { IoMdMenu, IoMdClose } from "react-icons/io";
import Logo from "@/app/lib/Logo";

const Header = ({ isSidebarOpen, setSidebarOpen }: { 
  isSidebarOpen: boolean; 
  setSidebarOpen: (value: boolean) => void;
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-10 p-4 bg-gray-200 border-b border-white flex items-center justify-between">
      <div className="flex items-center">
        <Logo variant="xs" />
      </div>
      <button
        className="sm:hidden p-2 rounded-md text-white bg-[#4E86F7] hover:bg-[#3B72E6] transition-all"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
      </button>
    </header>
  );
};

export default Header;
