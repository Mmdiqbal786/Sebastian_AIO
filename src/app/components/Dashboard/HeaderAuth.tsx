"use client";

import Logo from "@/app/lib/Logo";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-10 p-4 bg-gray-200 border-b border-white flex items-center justify-between md:px-8">
      <div className="flex items-center">
        <Logo variant="xs" />
      </div>
    </header>
  );
};

export default Header;
