"use client";

import Logo from "@/app/lib/Logo";
import { HomePath, LoginPath } from "@/app/lib/path";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-10 p-4 bg-gray-200 border-b border-white flex items-center md:px-8">
      <div className="flex items-center justify-between w-full">
        <Link href={HomePath}><Logo variant="xs" /></Link>
        <div className="flex flex-row gap-4">
          <Link href={LoginPath} className="text-blue-600 hover:underline">
            Login
          </Link>
          {/* <Link href={RegisterPath} className="text-blue-600 hover:underline">
            Register
          </Link> */}
        </div>
      </div>
    </header>
  );
};

export default Header;