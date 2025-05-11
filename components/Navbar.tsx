"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { IoHome } from "react-icons/io5";
import { RiLoginBoxLine } from "react-icons/ri";

type Props = {};

const logo_name = "پخش سوسنی";

export default function Navbar({}: Props) {
  return (
    <nav className="px-4 md:px-16 lg:px-32 xl:px-64 bg-white text-gray-800">
      <div className="flex items-center justify-between h-14">
        <Link href="/" className="flex justify-center items-center gap-2">
          <Image src="/logo/logo-3.png" alt="tinyfire" width={32} height={32} />
          <div className="text-lg tracking-wide font-bold">{logo_name}</div>
        </Link>
        <div className="flex items-center justify-center gap-3">
          <Link href="/" className="text-teal-600 hover:text-teal-900">
            خانه
          </Link>
          <div className="flex gap-1">
            <Link
              href="/panel/register"
              className="text-teal-600 hover:text-teal-900"
            >
              ثبت نام
            </Link>
            <span>/</span>
            <Link
              href="/panel/login"
              className="text-teal-600 hover:text-teal-900"
            >
              ورود
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
