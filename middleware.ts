import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // اگر توکن داره ولی رفته به لاگین، بفرستش پنل
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/panel", request.url));
  }

  // اگر توکن نداره ولی روی لاگین هست، اجازه بده بمونه
  if (!token && pathname === "/login") {
    return NextResponse.next();
  }

  // اگر توکن نداره و جای دیگه رفته، بفرستش لاگین
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/panel/:path*", "/login"],
};
