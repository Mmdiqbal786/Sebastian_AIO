import User from "@/app/types/User";
import RolePermission from "@/app/types/RolePermission";
import UserPermission from "@/app/types/UserPermission";
import Path from "@/app/types/Path";

/**
 * Check if a user has permission to a path for a specific action
 * @param userId - ID of the user
 * @param pathString - path of the page (e.g., "/dashboard")
 * @param action - "view" | "create" | "edit" | "delete"
 */
export async function checkPermission(
  userId: string,
  pathString: string,
  action: "view" | "create" | "edit" | "delete"
): Promise<boolean> {
  const user = await User.findById(userId).populate("roleId");
  if (!user) {
    return false
  };

  const path = await Path.findOne({ path: pathString });
  if (!path) {
    return false
  };

  // 1️⃣ User-specific permission
  const userPerm = await UserPermission.findOne({ userId: user._id, pathId: path._id });
  if (userPerm) {
    return resolveAction(userPerm, action)
  };

  // 2️⃣ Role-based permission (fallback)
  const rolePerm = await RolePermission.findOne({ roleId: user.roleId, pathId: path._id });
  if (rolePerm) {
    return resolveAction(rolePerm, action)
  };

  return false; // No permission
}

/**
 * Resolve which action permission to return
 */
function resolveAction(
  permission: { canView: boolean; canCreate: boolean; canEdit: boolean; canDelete: boolean },
  action: "view" | "create" | "edit" | "delete"
) {
  switch (action) {
    case "view": return permission.canView;
    case "create": return permission.canCreate;
    case "edit": return permission.canEdit;
    case "delete": return permission.canDelete;
    default: return false;
  }
}