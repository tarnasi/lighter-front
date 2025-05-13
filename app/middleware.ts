import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// مسیرهایی که محافظت می‌شن
const protectedRoutes = ["/panel",];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname);

  // اگه مسیر محافظت‌شده باشه و توکن نباشه → ری‌دایرکت به لاگین
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = request.cookies.get("accessToken")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/panel/login", request.url));
    }
  }

  // اجازه عبور به بقیه
  return NextResponse.next();
}

// تنظیم مسیرهایی که middleware روشون اعمال شه
export const config = {
  matcher: ["/panel/:path*",],
};
