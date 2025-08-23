/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Fa6 from "react-icons/fa6";
import * as Fa from "react-icons/fa";
import * as Md from "react-icons/md";
import * as Io5 from "react-icons/io5";
import * as Io from "react-icons/io";
import * as Gi from "react-icons/gi";
import * as Si from "react-icons/si";
import * as Bi from "react-icons/bi";
import * as Hi from "react-icons/hi";
import * as Ci from "react-icons/ci";
import * as Gr from "react-icons/gr";

export const libraries: Record<string, any> = {
  "react-icons/fa6": Fa6,
  "react-icons/fa": Fa,
  "react-icons/md": Md,
  "react-icons/io5": Io5,
  "react-icons/io": Io,
  "react-icons/gi": Gi,
  "react-icons/gr": Gr,
  "react-icons/si": Si,
  "react-icons/bi": Bi,
  "react-icons/hi": Hi,
  "react-icons/ci": Ci,
};

export function getIcon(iconImport: string, iconName: string, props?: any) {
  const lib = libraries[iconImport];
  if (!lib) {
    return null
  };
  const IconComponent = lib[iconName];
  return IconComponent ? <IconComponent {...props} /> : null;
}

export type AppPath = {
  name: string;
  path: string;
  slash: string;
  icon: string;
  iconImport: string;
  showInSidebar?: boolean;
  isActive?: boolean;
};

export const paths: AppPath[] = [
  { name: "Dashboard", path: "dashboard", slash: "/dashboard", icon: "MdDashboard", iconImport: "react-icons/md", showInSidebar: true, isActive: true },
  { name: "User", path: "user", slash: "/user", icon: "FaUserGroup", iconImport: "react-icons/fa6", showInSidebar: true, isActive: true },
  { name: "Associate", path: "associate", slash: "/associate", icon: "SiConsul", iconImport: "react-icons/si", showInSidebar: true, isActive: true },
  { name: "Employee", path: "employee", slash: "/employee", icon: "FaUserGroup", iconImport: "react-icons/fa6", showInSidebar: true, isActive: true },
  { name: "Contractor", path: "contractor", slash: "/contractor", icon: "FaFileContract", iconImport: "react-icons/fa", showInSidebar: true, isActive: true },
  { name: "UserType", path: "userType", slash: "/userType", icon: "FaUsersRays", iconImport: "react-icons/fa6", showInSidebar: true, isActive: true },
  { name: "Role", path: "role", slash: "/role", icon: "FaUserTie", iconImport: "react-icons/fa6", showInSidebar: true, isActive: true },
  { name: "RolePermission", path: "rolePermission", slash: "/rolePermission", icon: "SiPrivateinternetaccess", iconImport: "react-icons/si", showInSidebar: true, isActive: true },
  { name: "UserPermission", path: "userPermission", slash: "/userPermission", icon: "SiPrivateinternetaccess", iconImport: "react-icons/si", showInSidebar: true, isActive: true },
  { name: "Status", path: "status", slash: "/status", icon: "HiOutlineStatusOnline", iconImport: "react-icons/hi", showInSidebar: true, isActive: true },
  { name: "Access", path: "access", slash: "/access", icon: "SiOpenaccess", iconImport: "react-icons/si", showInSidebar: true, isActive: true },
  { name: "Path", path: "path", slash: "/path", icon: "SiUipath", iconImport: "react-icons/si", showInSidebar: true, isActive: true },
  { name: "Agreement", path: "agreement", slash: "/agreement", icon: "FaNewspaper", iconImport: "react-icons/fa", showInSidebar: true, isActive: true },
  { name: "Expense", path: "expense", slash: "/expense", icon: "GiExpense", iconImport: "react-icons/gi", showInSidebar: true, isActive: true },
  { name: "Invoice", path: "invoice", slash: "/invoice", icon: "FaFileInvoice", iconImport: "react-icons/fa", showInSidebar: true, isActive: true },
  { name: "Leave", path: "leave", slash: "/leave", icon: "FaCalendarTimes", iconImport: "react-icons/fa", showInSidebar: true, isActive: true },
  { name: "Notification", path: "notification", slash: "/notification", icon: "IoIosNotifications", iconImport: "react-icons/io", showInSidebar: true, isActive: true },
  { name: "Payroll", path: "payroll", slash: "/payroll", icon: "MdPayments", iconImport: "react-icons/md", showInSidebar: true, isActive: true },
  { name: "Report", path: "report", slash: "/report", icon: "HiDocumentReport", iconImport: "react-icons/hi", showInSidebar: true, isActive: true },
  { name: "Support", path: "support", slash: "/support", icon: "MdContactSupport", iconImport: "react-icons/md", showInSidebar: true, isActive: true },
  { name: "TimeSheet", path: "timesheet", slash: "/timesheet", icon: "BiSolidSpreadsheet", iconImport: "react-icons/bi", showInSidebar: true, isActive: true },
  { name: "Setting", path: "setting", slash: "/setting", icon: "IoSettings", iconImport: "react-icons/io5", showInSidebar: true, isActive: true },
  { name: "login", path: "login", slash: "/login", icon: "CiLogin", iconImport: "react-icons/ci", showInSidebar: false, isActive: true },
  { name: "register", path: "registration", slash: "/registration", icon: "MdAppRegistration", iconImport: "react-icons/md", showInSidebar: false, isActive: true },
  { name: "home", path: "", slash: "/", icon: "FaHome", iconImport: "react-icons/fa", showInSidebar: false, isActive: true },
  { name: "Consultant", path: "consultant", slash: "/consultant", icon: "SiConsul", iconImport: "react-icons/si", showInSidebar: false, isActive: true },
  { name: "Food", path: "food", slash: "/food", icon: "IoFastFood", iconImport: "react-icons/io5", showInSidebar: false, isActive: true },
  { name: "FoodCategory", path: "foodCategory", slash: "/foodCategory", icon: "MdOutlineFoodBank", iconImport: "react-icons/md", showInSidebar: false, isActive: true },
  { name: "Category", path: "category", slash: "/category", icon: "BiSolidCategoryAlt", iconImport: "react-icons/bi", showInSidebar: false, isActive: true },
  { name: "Slot", path: "slot", slash: "/slot", icon: "FaBusinessTime", iconImport: "react-icons/fa", showInSidebar: false, isActive: true },
  { name: "Plan", path: "plan", slash: "/plan", icon: "GrPlan", iconImport: "react-icons/gr", showInSidebar: false, isActive: true },
];

export const pathMap = paths.reduce((acc, p) => {
  acc[p.name + "Path"] = p.slash;
  acc[p.name + "PathWithout"] = p.path;
  return acc;
}, {} as Record<string, string>);