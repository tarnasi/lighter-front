"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { useUserStore } from "@/stores/userStore";
import { useLazyQuery } from "@apollo/client";

import { ME_QUERY } from "@/apollo/queries";

const logo_name = "فروشگاه";

type props = {
  isPanel: boolean
}


export default function Navbar({isPanel}: props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  const [getMe, { called, data, loading }] = useLazyQuery(ME_QUERY, {
    fetchPolicy: "network-only"
  });

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
    if (data?.me) {
      setUser(data.me);
    }
  }, [data, setUser])

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("me");
    setIsLoggedIn(false);
    window.location.href = "/"; // یا /login یا هر جا
  };

  return (
    <nav className='px-4 md:px-16 lg:px-32 xl:px-64 bg-white text-gray-800 border-b border-gray-200'>
      <div className="flex items-center justify-between h-14">
        <Link href="/" className="flex justify-center items-center gap-2">
          <Image src="/logo/logo-3.png" alt="logo" width={48} height={48} />
          <div className="text-sm md:text-lg tracking-wide font-bold">
            {logo_name}
          </div>
        </Link>

        <div className="flex items-center justify-center gap-3 text-xs md:text-lg">
          <Link href="/" className="text-teal-600 hover:text-teal-900 text-sm md:text-base">
            خانه
          </Link>

          {!isLoggedIn ? (
            <div className="flex gap-1">
              <Link
                href="/register"
                className="text-teal-600 hover:text-teal-900 text-sm md:text-base"
              >
                ثبت نام
              </Link>
              <Link href="/login" className="text-teal-600 hover:text-teal-900 text-sm md:text-base">
                ورود
              </Link>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <Link href="/panel" className="text-teal-600 hover:text-teal-900 text-sm md:text-base">
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
