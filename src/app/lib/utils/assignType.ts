export async function assignType(isFirstUser: boolean): Promise<string> {
  const typeName = isFirstUser ? "admin" : "default";
  return typeName;
}
