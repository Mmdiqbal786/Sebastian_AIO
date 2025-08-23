'use client';
import { useState, useEffect } from "react";
import { IUser } from "@/app/types/User";

// ----- Extend IUser to include permissions map ----- //

// interface IUserWithPermissions extends IUser {
//   permissions?: Record<
//     string,
//     {
//       view: boolean;
//       create: boolean;
//       edit: boolean;
//       delete: boolean;
//     }
//   >;
// }

// ----- Extend IUser to include permissions map ----- //

export function useCurrentUser() {

  // ----- without permission ----- //

  const [user, setUser] = useState<IUser | null>(null);

  // ----- without permission ----- //

  // ----- with permission ----- //

  // const [user, setUser] = useState<IUserWithPermissions | null>(null);

  // ----- with permission ----- //
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Fetch user error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return { user, loading };
}
