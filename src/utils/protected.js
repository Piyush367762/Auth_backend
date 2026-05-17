export function isProtectedRoute(pathname: string) {
  return pathname.startsWith("/dashboard") || pathname.startsWith("/settings")
}
export function isPublicRoute(pathname: string) {
  return ["/login", "/register", "/forgot-password"].includes(pathname)
}
