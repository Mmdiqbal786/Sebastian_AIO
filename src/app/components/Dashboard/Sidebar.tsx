/* eslint-disable @typescript-eslint/no-explicit-any */

// ----- without permission ----- //

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useLogout } from "@/app/hooks/useLogout";
// import { paths, getIcon } from "@/app/lib/data/config/Path";

// const Sidebar = ({
//   isSidebarOpen,
//   setSidebarOpen,
// }: {
//   isSidebarOpen: boolean;
//   setSidebarOpen: (value: boolean) => void;
// }) => {
//   const pathname = usePathname();
//   const logout = useLogout();
//   const [, setCurrentPath] = useState(pathname);

//   useEffect(() => {
//     setCurrentPath(pathname);
//   }, [pathname]);

//   const isActive = (slash: string) => pathname === slash;

//   return (
//     <aside
//       className={`fixed top-[110px] left-0 z-20 h-[calc(100vh-110px)] w-full bg-gray-50 text-black transition-transform transform ${
//         isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//       } sm:w-[224px] md:translate-x-0 rounded-none sm:rounded-3xl flex flex-col`}
//     >
//       <div className="absolute top-4 right-4 sm:hidden">
//         <button
//           onClick={() => setSidebarOpen(false)}
//           className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
//         >
//           ✕
//         </button>
//       </div>
//       <nav className="flex-1 pt-2 px-4 text-black overflow-y-auto">
//         <ul className="text-lg">
//           {paths
//             .filter((p:any) => p.showInSidebar && p.isActive)
//             .map((link:any) => (
//               <li key={link.slash}>
//                 <Link href={link.slash}>
//                   <div
//                     className={`flex items-center py-1 cursor-pointer mr-1 transition-transform duration-300 ease-in-out hover:translate-x-2 ${
//                       isActive(link.slash)
//                         ? "font-bold rounded-xl bg-stone-400 text-black p-2"
//                         : "hover:text-black"
//                     }`}
//                   >
//                     <span className="mr-3">
//                       {getIcon(link.iconImport, link.icon, { size: 20 })}
//                     </span>
//                     {link.name}
//                   </div>
//                 </Link>
//               </li>
//             ))}
//         </ul>
//       </nav>
//       <div className="p-4 border-t border-gray-300 bg-gray-50">
//         <button
//           onClick={logout}
//           className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg transition duration-300 hover:bg-red-700"
//         >
//           Log Out
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

// ----- without permission ----- //

// ----- with permission ----- //

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLogout } from "@/app/hooks/useLogout";
import { paths, getIcon } from "@/app/lib/data/config/Path";

type PermissionMap = Record<
  string,
  { view: boolean; create: boolean; edit: boolean; delete: boolean }
>;

const Sidebar = ({
  isSidebarOpen,
  setSidebarOpen,
  permissions,
}: {
  isSidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  permissions: PermissionMap;
}) => {
  const pathname = usePathname();
  const logout = useLogout();
  const [, setCurrentPath] = useState(pathname);

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const isActive = (slash: string) => pathname === slash;

  return (
    <aside
      className={`fixed top-[110px] left-0 z-20 h-[calc(100vh-110px)] w-full bg-gray-50 text-black transition-transform transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } sm:w-[224px] md:translate-x-0 rounded-none sm:rounded-3xl flex flex-col`}
    >
      <div className="absolute top-4 right-4 sm:hidden">
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          ✕
        </button>
      </div>
      <nav className="flex-1 pt-2 px-4 text-black overflow-y-auto">
        <ul className="text-lg">
          {paths
            .filter(
              (p: any) =>
                p.showInSidebar &&
                permissions[p.path]?.view
            )
            .map((link: any) => (
              <li key={link.slash}>
                <Link href={link.slash}>
                  <div
                    className={`flex items-center py-1 cursor-pointer mr-1 transition-transform duration-300 ease-in-out hover:translate-x-2 ${
                      isActive(link.slash)
                        ? "font-bold rounded-xl bg-stone-400 text-black p-2"
                        : "hover:text-black"
                    }`}
                  >
                    <span className="mr-3">
                      {getIcon(link.iconImport, link.icon, { size: 20 })}
                    </span>
                    {link.name}
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-300 bg-gray-50">
        <button
          onClick={logout}
          className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg transition duration-300 hover:bg-red-700"
        >
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

// ----- with permission ----- //