import React from "react";
import Navbar from "@/components/Navbar";
import PageTitle from "@/components/PageTitle";
import InfoCards from "@/components/panel/InfoCards";
import { FaHouseUser } from "react-icons/fa";
import { IoReorderFourOutline } from "react-icons/io5";
import { IoTicket } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import Link from "next/link";

type Props = {};

const PanelPage = async (props: Props) => {
  return (
    <div className="bg-white min-h-screen">
      <PageTitle title="پنل مدیریت" returnLink="/" returnTitle="رفتن به سایت" />
      <InfoCards />
      <div className="px-4 md:px-16 lg:px-32 xl:px-64 bg-white text-gray-800 my-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 p-8 mx-5 border border-dashed gap-4">
          <Link
            href="/panel/user/profile"
            className="flex gap-1 items-center justify-center p-4 rounded bg-red-400 text-white hover:cursor-pointer hover:bg-orange-500 hover:shadow-xl transition-all transition-discrete"
          >
            <FaHouseUser /> پروفایل
          </Link>

          <Link
            href="/panel/user/orders"
            className="flex gap-1 items-center justify-center p-4 rounded bg-red-400 text-white hover:cursor-pointer hover:bg-orange-500 hover:shadow-xl transition-all transition-discrete"
          >
            <IoReorderFourOutline /> سفارشات
          </Link>
          <Link
            href="/panel/user/orders"
            className="flex gap-1 items-center justify-center p-4 rounded bg-red-400 text-white hover:cursor-pointer hover:bg-orange-500 hover:shadow-xl transition-all transition-discrete"
          >
            <IoTicket /> تیکت ها
          </Link>
          <Link
            href="/panel/user/orders"
            className="flex gap-1 items-center justify-center p-4 rounded bg-red-400 text-white hover:cursor-pointer hover:bg-orange-500 hover:shadow-xl transition-all transition-discrete"
          >
            <GiReceiveMoney /> هزینه ها
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PanelPage;
