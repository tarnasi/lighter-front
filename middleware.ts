import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const userJson = request.cookies.get("me")?.value;
  const { pathname } = request.nextUrl;

  let user: { role?: string } | null = null;

  try {
    if (userJson) {
      user = JSON.parse(userJson);
    }
  } catch (err) {
    console.error("Invalid me cookie:", err);
  }

  // 🚫 Not logged in at all
  if (!token || !user) {
    const publicRoutes = ["/dashboard/orders"];
    if (pathname === "/login" || publicRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🚫 If logged in and role is `user`, redirect away from admin panel
  if (pathname.startsWith("/panel") && user?.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 🚫 If logged-in user tries to visit /login, redirect to /panel
  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/panel", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/panel/:path*", "/login", "/dashboard/:path*"], // optionally add /user/dashboard protection
};
