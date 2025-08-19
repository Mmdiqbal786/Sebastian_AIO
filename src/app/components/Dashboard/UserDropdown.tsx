'use client';

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/app/lib/data/useCurrentUser";
import { useGlobalLoader } from "@/app/context/GlobalLoaderContext";
import { useLogout } from "@/app/hooks/useLogout";

const UserDropdown = () => {
  const logout = useLogout();
  const { user, loading } = useCurrentUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { showLoader } = useGlobalLoader();

  useEffect(() => {
    if (loading) {
      showLoader("fullPage");
    }
  }, [loading, showLoader]);

  useEffect(() => {
    if (!loading && user === null) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    showLoader("spinner", 1500);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-md transition-all focus:outline-none"
        onClick={() => setDropdownOpen((open) => !open)}
      >
        <Image
          src={user.profileImg ? `/${user.profileImg}` : "/noProfileImg.png"}
          height={50}
          width={50}
          alt="profile Image"
          className="rounded-full object-cover"
        />
        <span className="hidden md:inline">{user.email}</span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-20">
          <Link
            href={`/user/info?id=${user.id}&type=users`}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
