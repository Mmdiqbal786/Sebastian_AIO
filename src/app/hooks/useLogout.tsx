import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  async function logout() {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });

      if (response.ok) {
          router.push("/login");
      } else {
        console.error("Logout failed:", await response.json());
      }
    } catch (error) {
      console.error("❌ Logout Error:", error);
    }
  }

  return logout;
}

export const fetchUserData = async () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    console.error("No token found, user not logged in");
    return;
  }

  try {
    const response = await fetch("/api/auth/user/protected-route", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      console.log("User Data:", data);
    } else {
      console.error("Error:", data.error);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
};