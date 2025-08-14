// "use client";

// import { FaUserTie, FaUserGroup } from "react-icons/fa6";
// // import { FaUsers } from "react-icons/fa";
// // import { BiSolidCategoryAlt } from "react-icons/bi";
// // import { IoSettings, IoFastFood } from "react-icons/io5";
// import { IoSettings } from "react-icons/io5";
// import { GiExpense } from "react-icons/gi";
// // import { MdOutlineFoodBank } from "react-icons/md";
// // import { GrPlan } from "react-icons/gr";
// // import { FaBusinessTime } from "react-icons/fa";
// import { MdDashboard, MdPayments, MdContactSupport } from "react-icons/md";
// import { BiSolidSpreadsheet } from "react-icons/bi";
// import { HiDocumentReport } from "react-icons/hi";
// import { IoIosNotifications } from "react-icons/io";
// import { FaNewspaper, FaFileInvoice, FaCalendarTimes } from "react-icons/fa";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useLogout } from "@/app/hooks/useLogout";
// import { AgreementPathWithout, DashboardPathWithout, EmployeePathWithout, ExpensePathWithout, InvoicePathWithout, LeavePathWithout, NotificationPathWithout, PayrollPathWithout, ReportPathWithout, RolePathWithout, SettingPathWithout, SupportPathWithout, TimeSheetPathWithout } from "@/app/lib/path";


// // const navigationItems = [
// //   {
// //     section: "Dashboard",
// //     links: [
// //       {
// //         path: "employee",
// //         label: "Employee",
// //         icon: <FaUserGroup />,
// //       },
// //       {
// //         path: "role",
// //         label: "Role",
// //         icon: <FaUserTie />,
// //       },
// //       {
// //         path: "slot",
// //         label: "Slot",
// //         icon: <FaBusinessTime />,
// //       },
// //       {
// //         path: "user",
// //         label: "User",
// //         icon: <FaUsers />,
// //       },
// //       {
// //         path: "food",
// //         label: "Food",
// //         icon: <IoFastFood />,
// //       },
// //       {
// //         path: "plan",
// //         label: "Plan",
// //         icon: <GrPlan />,
// //       },
// //       {
// //         path: "foodCategory",
// //         label: "Food Category",
// //         icon: <MdOutlineFoodBank />,
// //       },
// //       {
// //         path: "category",
// //         label: "Category",
// //         icon: <BiSolidCategoryAlt />,
// //       },
// //       {
// //         path: "setting",
// //         label: "Setting",
// //         icon: <IoSettings />,
// //       },
// //     ],
// //   },
// // ];

// const navigationItems = [
//   {
//     section: "dashboard",
//     links: [
//       {
//         path: DashboardPathWithout,
//         label: "Dashboard",
//         icon: <MdDashboard />,
//       },
//       {
//         path: EmployeePathWithout,
//         label: "Employee",
//         icon: <FaUserGroup />,
//       },
//       {
//         path: RolePathWithout,
//         label: "Role",
//         icon: <FaUserTie />,
//       },
//       {
//         path: AgreementPathWithout,
//         label: "Agreement",
//         icon: <FaNewspaper />,
//       },
//       {
//         path: ExpensePathWithout,
//         label: "Expense",
//         icon: <GiExpense />,
//       },
//       {
//         path: InvoicePathWithout,
//         label: "Invoice",
//         icon: <FaFileInvoice />,
//       },
//       {
//         path: LeavePathWithout,
//         label: "Leave",
//         icon: <FaCalendarTimes />,
//       },
//       {
//         path: NotificationPathWithout,
//         label: "Notification",
//         icon: <IoIosNotifications />,
//       },
//       {
//         path: PayrollPathWithout,
//         label: "Payroll",
//         icon: <MdPayments />,
//       },
//       {
//         path: ReportPathWithout,
//         label: "Report",
//         icon: <HiDocumentReport />,
//       },
//       {
//         path: SupportPathWithout,
//         label: "Support",
//         icon: <MdContactSupport />,
//       },
//       {
//         path: TimeSheetPathWithout,
//         label: "TimeSheet",
//         icon: <BiSolidSpreadsheet />,
//       },
//       {
//         path: SettingPathWithout,
//         label: "Setting",
//         icon: <IoSettings />,
//       },
//     ],
//   },
// ];

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

//   const isActive = (path: string) => pathname === `/${path}`;

//   return (
//     <aside
//       className={`fixed top-0 left-0 z-20 h-full w-full bg-gray-50 text-black transition-transform transform ${
//         isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//       } sm:w-[224px] md:translate-x-0 md:top-[110px] lg:top-[110px] rounded-none sm:rounded-3xl`}
//     >
//       <div className="absolute top-4 right-4 sm:hidden">
//         <button
//           onClick={() => setSidebarOpen(false)}
//           className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
//         >
//           ✕
//         </button>
//       </div>
//       <nav className="flex-1 pt-2 px-4 text-black">
//         {navigationItems.map((section, index) => (
//           <section key={index} className="pt-2">
//             <h2 className="text-lg font-semibold pb-2 mr-2 text-black transition-transform duration-300 ease-in-out hover:translate-x-2">
//               {section.section}
//             </h2>
//             <ul className="text-lg">
//               {section.links.map((link, linkIndex) => (
//                 <div key={linkIndex}>
//                   <Link href={`/${link.path}`}>
//                     <li
//                       className={`flex items-center py-1 cursor-pointer mr-1 transition-transform duration-300 ease-in-out hover:translate-x-2 ${
//                         isActive(link.path)
//                           ? "font-bold rounded-xl bg-stone-400 text-black p-2"
//                           : "hover:text-black"
//                       }`}
//                     >
//                       <span className="mr-3">{link.icon}</span>
//                       {link.label}
//                     </li>
//                   </Link>
//                 </div>
//               ))}
//             </ul>
//           </section>
//         ))}
//         <div className="flex mt-8">
//           <button
//             onClick={logout}
//             className="w-40 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg transition duration-300 hover:bg-red-700"
//           >
//             Log Out
//           </button>
//         </div>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

"use client";

import { FaUserTie, FaUserGroup, FaUsersRays } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { GiExpense } from "react-icons/gi";
import { SiConsul, SiOpenaccess } from "react-icons/si";
import { MdDashboard, MdPayments, MdContactSupport } from "react-icons/md";
import { BiSolidSpreadsheet } from "react-icons/bi";
import { HiDocumentReport } from "react-icons/hi";
import { IoIosNotifications } from "react-icons/io";
import { FaNewspaper, FaFileInvoice, FaCalendarTimes, FaFileContract } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLogout } from "@/app/hooks/useLogout";
import {
  AccessPathWithout,
  AgreementPathWithout,
  ConsultantPathWithout,
  ContractorPathWithout,
  DashboardPathWithout,
  EmployeePathWithout,
  ExpensePathWithout,
  InvoicePathWithout,
  LeavePathWithout,
  NotificationPathWithout,
  PayrollPathWithout,
  ReportPathWithout,
  RolePathWithout,
  SettingPathWithout,
  SupportPathWithout,
  TimeSheetPathWithout,
  UserTypePathWithout,
} from "@/app/lib/path";

const navigationItems = [
  {
    section: "",
    links: [
      { path: DashboardPathWithout, label: "Dashboard", icon: <MdDashboard /> },
      { path: EmployeePathWithout, label: "Employee", icon: <FaUserGroup /> },
      { path: ConsultantPathWithout, label: "Consultant", icon: <SiConsul /> },
      { path: ContractorPathWithout, label: "Contractor", icon: <FaFileContract /> },
      { path: UserTypePathWithout, label: "UserType", icon: <FaUsersRays /> },
      { path: RolePathWithout, label: "Role", icon: <FaUserTie /> },
      { path: AccessPathWithout, label: "Access", icon: <SiOpenaccess /> },
      { path: AgreementPathWithout, label: "Agreement", icon: <FaNewspaper /> },
      { path: ExpensePathWithout, label: "Expense", icon: <GiExpense /> },
      { path: InvoicePathWithout, label: "Invoice", icon: <FaFileInvoice /> },
      { path: LeavePathWithout, label: "Leave", icon: <FaCalendarTimes /> },
      { path: NotificationPathWithout, label: "Notification", icon: <IoIosNotifications /> },
      { path: PayrollPathWithout, label: "Payroll", icon: <MdPayments /> },
      { path: ReportPathWithout, label: "Report", icon: <HiDocumentReport /> },
      { path: SupportPathWithout, label: "Support", icon: <MdContactSupport /> },
      { path: TimeSheetPathWithout, label: "TimeSheet", icon: <BiSolidSpreadsheet /> },
      { path: SettingPathWithout, label: "Setting", icon: <IoSettings /> },
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
      className={`fixed top-[110px] left-0 z-20 h-[calc(100vh-110px)] w-full bg-gray-50 text-black transition-transform transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } sm:w-[224px] md:translate-x-0 rounded-none sm:rounded-3xl flex flex-col`}
    >
      {/* Close button for mobile */}
      <div className="absolute top-4 right-4 sm:hidden">
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          ✕
        </button>
      </div>

      {/* Scrollable menu */}
      <nav className="flex-1 pt-2 px-4 text-black overflow-y-auto">
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
      </nav>

      {/* Fixed logout button */}
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
