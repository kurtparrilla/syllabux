export function getDashboardPath(role) {
  if (role === "instructor") return "/instructor/dashboard";
  return "/learn/dashboard";
}
