"use client";
import { ReactNode, useEffect, useState } from "react";
import { useCurrentUser } from "@/app/lib/data/useCurrentUser";
import UnauthorizedPage from "@/app/components/Unauthorized";

interface ProtectedPageProps {
  children: ReactNode;
  path: string;
  action?: "view" | "create" | "edit" | "delete";
}

export default function ProtectedPage({ children, path, action = "view" }: ProtectedPageProps) {
  const { user, loading } = useCurrentUser();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (user?.permissions?.[path]) {
      setAllowed(user.permissions[path][action]);
    }
  }, [user, path, action]);

  if (loading) return <div>Loading...</div>;
  if (!allowed) return <UnauthorizedPage />;

  return <>{children}</>;
}