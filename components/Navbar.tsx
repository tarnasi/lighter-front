"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { useUserStore } from "@/stores/userStore";
import { useUserMeLazy } from "@/hooks/useUser";
import { useMessageStore } from "@/stores/messageStore";
import LoadingSkeleton from "./LoadingSkeleton";

const logo_name = "فروشگاه";

type props = {
  isUserPanel?: boolean;
  isRoot?: boolean
};

export default function Navbar({ isUserPanel = false, isRoot = false }: props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  const { showMessage } = useMessageStore();

  const { getMe, called, userData, loading } = useUserMeLazy();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      setIsLoggedIn(true);
      if (!called && !user) {
        getMe();
      }
    }
  }, []);

  useEffect(() => {
    if (userData?.me) {
      setUser(userData.me);
    }
  }, [userData, setUser]);

  if (loading) <LoadingSkeleton />;

  const handleLogout = () => {
    showMessage({
      key: "loading",
      type: "info",
      content: "در حال حروج از داشبورد",
    });
    setTimeout(() => {
      Cookies.remove("accessToken");
      Cookies.remove("me");
      setIsLoggedIn(false);
      window.location.href = "/";
    }, 500);
  };

  return (
    <nav className={`text-gray-800 ${isRoot ? "px-4 py-2 md:px-16 lg:px-32 xl:px-64 bg-white border-b border-gray-200" : ''}`}>
      <div className="flex items-center justify-between h-14">
        <Link href="/" className="flex justify-center items-center gap-2">
          <Image src="/logo/logo-3.png" alt="logo" width={48} height={48} />
          <div className="text-sm md:text-lg tracking-wide font-bold">
            {logo_name}
          </div>
        </Link>

        <div className="flex items-center justify-center gap-3 text-xs md:text-lg">
          <Link
            href="/"
            className="text-teal-600 hover:text-teal-900 text-sm md:text-base"
          >
            خانه
          </Link>

          {!isLoggedIn ? (
            <div className="flex gap-3">
              <Link
                href="/register"
                className="text-teal-600 hover:text-teal-900 text-sm md:text-base"
              >
                ثبت نام
              </Link>
              <Link
                href="/login"
                className="text-teal-600 hover:text-teal-900 text-sm md:text-base"
              >
                ورود
              </Link>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <Link
                href={isUserPanel ? "/dashboard" : "/panel"}
                className="text-teal-600 hover:text-teal-900 text-sm md:text-base"
              >
                داشبورد
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-800 text-sm md:text-base hover:cursor-pointer"
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
