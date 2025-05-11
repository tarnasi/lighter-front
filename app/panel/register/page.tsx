import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default async function LoginPage({}: Props) {
  return (
    <div className="flex bg-white min-h-screen text-black justify-center w-full">
      <form
        action=""
        method="POST"
        className="h-full w-100 md:w-1/2 lg:w-1/3 mt-8 p-4 rounded shadow-xl"
      >
        <Link href="/" className="flex justify-center items-center gap-2 border-b border-gray-200 pb-2">
          <Image src="/logo/logo-3.png" alt="tinyfire" width={64} height={64} />
        </Link>
        <div className="flex flex-col mt-6 mb-4">
          <label htmlFor="mobile" className="mb-2">
            موبایل
          </label>
          <input
            className="border border-gray-500 p-2 rounded"
            type="text"
            name="mobile"
            id="mobile"
            placeholder="09991112233"
            autoComplete="tel"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="mb-2">
            ایمیل
          </label>
          <input
            className="border border-gray-500 p-2 rounded"
            type="password"
            name="email"
            id="email"
            placeholder="example@email.com"
            autoComplete="email"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="birthday" className="mb-2">
            تاریخ تولد
          </label>
          <input
            className="border border-gray-500 p-2 rounded"
            type="date"
            name="birthday"
            id="birthday"
            placeholder="example@email.com"
            autoComplete="bday-day"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password" className="mb-2">
            پسورد
          </label>
          <input
            className="border border-gray-500 p-2 rounded"
            type="password"
            name="password"
            id="password"
            placeholder="*******"
            autoComplete="current-password"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="confirm-password" className="mb-2">
            تکرار پسورد
          </label>
          <input
            className="border border-gray-500 p-2 rounded"
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="*******"
            autoComplete="new-password"
          />
        </div>
        <div className="flex flex-col mt-8">
          <button type="submit" className="bg-teal-600 hover:bg-teal-700 hover:cursor-pointer py-2 px-8 text-white">ورود</button>
        </div>
      </form>
    </div>
  );
}
