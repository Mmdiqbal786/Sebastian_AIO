/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// ----- without permission ----- //

// "use client";

// import { ReactNode, useState } from "react";
// import Sidebar from "@/app/components/Dashboard/Sidebar";
// import Header from "@/app/components/Dashboard/Header";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-quill/dist/quill.snow.css";
// import { GlobalLoaderProvider } from "@/app/context/GlobalLoaderContext";

// interface LayoutProps {
//   children: ReactNode;
// }

// const Layout = ({ children }: LayoutProps) => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex flex-col bg-gray-200 text-black font-sans min-h-screen">
//       <GlobalLoaderProvider>
//       <ToastContainer />
//       <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
//       <div className="flex-1 flex flex-col bg-gray-200 overflow-auto">
//         <Header isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
//         <main className="py-20 p-2 lg:ml-64 md:ml-64 overflow-auto w-full max-w-full sm:max-w-[480px] md:max-w-[500px] lg:max-w-[1024px] xl:max-w-[1200px] mx-auto bg-gray-200 justify-between">
//           {children}
//         </main>
//       </div>
//       </GlobalLoaderProvider>
//     </div>
//   );
// };

// export default Layout;

// ----- without permission ----- //

// ----- with permission ----- //

"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/app/components/Dashboard/Sidebar";
import Header from "@/app/components/Dashboard/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import { GlobalLoaderProvider } from "@/app/context/GlobalLoaderContext";
import { paths } from "@/app/lib/data/config/Path";
import GlobalLoader from "../Utils/GlobalLoader";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [permissions, setPermissions] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        const userPerms = data?.user?.permissions || {};
        setPermissions(userPerms);

        const pathConfig = paths.find((p) => p.slash === pathname);

        if (pathname === "/403") {
          setAuthorized(true); // always allow 403 page
        } else if (pathConfig && userPerms[pathConfig.path]?.view) {
          setAuthorized(true); // allow if can view
        } else {
          setAuthorized(false);
          router.replace("/403"); // redirect
        }
      })
      .finally(() => setLoading(false));
  }, [pathname, router]);

  if (loading) return <GlobalLoader />;

  if (!authorized) return null; // 👈 prevent flash of restricted content

  return (
    <div className="flex flex-col bg-gray-200 text-black font-sans min-h-screen">
      <GlobalLoaderProvider>
        <ToastContainer />
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
          permissions={permissions}
        />
        <div className="flex-1 flex flex-col bg-gray-200 overflow-auto">
          <Header
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <main className="py-20 p-2 lg:ml-64 md:ml-64 overflow-auto w-full max-w-full sm:max-w-[480px] md:max-w-[500px] lg:max-w-[1024px] xl:max-w-[1200px] mx-auto bg-gray-200 justify-between">
            {children}
          </main>
        </div>
      </GlobalLoaderProvider>
    </div>
  );
};

export default Layout;

// ----- with permission ----- //