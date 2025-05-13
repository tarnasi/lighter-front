"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";

const logo_name = "پخش سوسنی";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("user");
    window.location.href = "/"; // یا /login یا هر جا
  };

  return (
    <nav className="px-4 md:px-16 lg:px-32 xl:px-64 bg-white text-gray-800">
      <div className="flex items-center justify-between h-14">
        <Link href="/" className="flex justify-center items-center gap-2">
          <Image src="/logo/logo-3.png" alt="logo" width={32} height={32} />
          <div className="text-lg tracking-wide font-bold">{logo_name}</div>
        </Link>

        <div className="flex items-center justify-center gap-3">
          <Link href="/" className="text-teal-600 hover:text-teal-900">
            خانه
          </Link>

          {!isLoggedIn ? (
            <div className="flex gap-1">
              <Link
                href="/register"
                className="text-teal-600 hover:text-teal-900"
              >
                ثبت نام
              </Link>
              <span>/</span>
              <Link href="/login" className="text-teal-600 hover:text-teal-900">
                ورود
              </Link>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <span className="text-sm text-gray-600">خوش آمدید</span>
              <Link href="/panel" className="text-teal-600 hover:text-teal-900">
                داشبورد
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                خروج
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
