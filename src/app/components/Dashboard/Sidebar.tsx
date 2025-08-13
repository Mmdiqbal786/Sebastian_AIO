"use client";

import { FaUserTie, FaUserGroup } from "react-icons/fa6";
// import { FaUsers } from "react-icons/fa";
// import { BiSolidCategoryAlt } from "react-icons/bi";
// import { IoSettings, IoFastFood } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
// import { MdOutlineFoodBank } from "react-icons/md";
// import { GrPlan } from "react-icons/gr";
// import { FaBusinessTime } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLogout } from "@/app/hooks/useLogout";


// const navigationItems = [
//   {
//     section: "Dashboard",
//     links: [
//       {
//         path: "employee",
//         label: "Employee",
//         icon: <FaUserGroup />,
//       },
//       {
//         path: "role",
//         label: "Role",
//         icon: <FaUserTie />,
//       },
//       {
//         path: "slot",
//         label: "Slot",
//         icon: <FaBusinessTime />,
//       },
//       {
//         path: "user",
//         label: "User",
//         icon: <FaUsers />,
//       },
//       {
//         path: "food",
//         label: "Food",
//         icon: <IoFastFood />,
//       },
//       {
//         path: "plan",
//         label: "Plan",
//         icon: <GrPlan />,
//       },
//       {
//         path: "foodCategory",
//         label: "Food Category",
//         icon: <MdOutlineFoodBank />,
//       },
//       {
//         path: "category",
//         label: "Category",
//         icon: <BiSolidCategoryAlt />,
//       },
//       {
//         path: "setting",
//         label: "Setting",
//         icon: <IoSettings />,
//       },
//     ],
//   },
// ];

const navigationItems = [
  {
    section: "dashboard",
    links: [
      {
        path: "dashboard",
        label: "Dashboard",
        icon: <MdDashboard />,
      },
      {
        path: "employee",
        label: "Employee",
        icon: <FaUserGroup />,
      },
      {
        path: "role",
        label: "Role",
        icon: <FaUserTie />,
      },
      {
        path: "setting",
        label: "Setting",
        icon: <IoSettings />,
      },
    ],
  },
];

const Sidebar = ({
  isSidebarOpen,
  setSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}) => {
  const pathname = usePathname();
  const logout = useLogout();
  const [, setCurrentPath] = useState(pathname);

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const isActive = (path: string) => pathname === `/${path}`;

  return (
    <aside
      className={`fixed top-0 left-0 z-20 h-full w-full bg-gray-50 text-black transition-transform transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } sm:w-[224px] md:translate-x-0 md:top-[110px] lg:top-[110px] rounded-none sm:rounded-3xl`}
    >
      <div className="absolute top-4 right-4 sm:hidden">
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          ✕
        </button>
      </div>
      <nav className="flex-1 pt-2 px-4 text-black">
        {navigationItems.map((section, index) => (
          <section key={index} className="pt-2">
            <h2 className="text-lg font-semibold pb-2 mr-2 text-black transition-transform duration-300 ease-in-out hover:translate-x-2">
              {section.section}
            </h2>
            <ul className="text-lg">
              {section.links.map((link, linkIndex) => (
                <div key={linkIndex}>
                  <Link href={`/${link.path}`}>
                    <li
                      className={`flex items-center py-1 cursor-pointer mr-1 transition-transform duration-300 ease-in-out hover:translate-x-2 ${
                        isActive(link.path)
                          ? "font-bold rounded-xl bg-stone-400 text-black p-2"
                          : "hover:text-black"
                      }`}
                    >
                      <span className="mr-3">{link.icon}</span>
                      {link.label}
                    </li>
                  </Link>
                </div>
              ))}
            </ul>
          </section>
        ))}
        <div className="flex mt-8">
          <button
            onClick={logout}
            className="w-40 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg transition duration-300 hover:bg-red-700"
          >
            Log Out
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
