"use client";

import Link from "next/link";
import { useState } from "react";

import { GrMenu } from "react-icons/gr";

type Props = {};

const Menu = (props: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GrMenu
        className="cursor-pointer text-2xl"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute bg-white text-black left-0 top-15 w-full h-[calc(100vh-60px)] gap-8 text-xl text-center lg:pr-32">
          <div
          className="grid grid-cols-2 text-lg gap-2 pt-2"
          >
            <Link href="/salt">
              <div className="text-sky-600 hover:text-teal-600 hover:shadow">سالت و جویس</div>
            </Link>
            <Link href="/device/one/time">
              <div className="text-sky-600 hover:text-teal-600 hover:shadow">دستگاه یکبار مصرف</div>
            </Link>
            <Link href="/coil/cartridge">
              <div className="text-sky-600 hover:text-teal-600 hover:shadow">کویل و کارتریج</div>
            </Link>
            <Link href="/pod/vape">
              <div className="text-sky-600 hover:text-teal-600 hover:shadow">پاد ها و ویپ ها</div>
            </Link>
            <Link href="/antike">
              <div className="text-sky-600 hover:text-teal-600 hover:shadow">فندک آنتیک</div>
            </Link>
            <Link href="/accessory">
              <div className="text-sky-600 hover:text-teal-600 hover:shadow">اکسسوری</div>
            </Link>
            <Link href="/home/market/light">
              <div className="text-sky-600 hover:text-teal-600 hover:shadow">فندک خانگی</div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
