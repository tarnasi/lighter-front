"use client";

import { useQuery } from "@apollo/client";
import { USER_LIST_QUERY } from "@/apollo/queries";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "../LoadingSkeleton";

import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import JalaliDateConverter from "../JalaliDateConverter";
import Link from "next/link";

const UserTable = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(USER_LIST_QUERY);

  useEffect(() => {
    if (error?.message.includes("مجاز")) {
    }
  }, [error]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="px-4 md:px-16 lg:px-32 xl:px-64 bg-white text-gray-800">
      <div className="hidden md:block overflow-x-auto py-8">
        <Link
          href="/panel/users/create"
          className="border border-gra bg-white w-full rounded p-1 text-sm hover:bg-gray-200 text-center"
        >
          ایجاد کاربر جدید
        </Link>
        <table className="w-full min-w-[600px] border mt-4">
          <thead>
            <tr className="bg-teal-800 text-gray-200 text-sm">
              <th className="p-2 border">موبایل</th>
              <th className="p-2 border">ایمیل</th>
              <th className="p-2 border">نقش</th>
              <th className="p-2 border">تاریخ تولد</th>
              <th className="p-2 border">اکشن</th>
            </tr>
          </thead>
          <tbody>
            {data?.userList?.map((user: any) => (
              <tr key={user.id} className="text-sm text-black">
                <td className="p-2 border">{user.mobile}</td>
                <td className="p-2 border">{user.email || "-"}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border">
                  <JalaliDateConverter datetime={user.birthday} />
                </td>
                <td className="p-2 border">
                  <div className="flex items-center justify-evenly gap-2">
                    <span>
                      <FaEdit />
                    </span>
                    <span>
                      <FaTrashCan className="text-red-600" />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden grid grid-cols-1 gap-4 py-4">
        {data?.userList?.map((user: any) => (
          <div
            key={user.id}
            className="border px-4 pb-1 pt-3 rounded text-sm border-gray-200"
          >
            <div>
              <p>
                <strong>موبایل:</strong> {user.full_name}
              </p>
              <p>
                <strong>موبایل:</strong> {user.mobile}
              </p>
              <p>
                <strong>ایمیل:</strong> {user.email || "-"}
              </p>
              <p>
                <strong>نقش:</strong> {user.role}
              </p>
              <p>
                <strong>تاریخ تولد:</strong>{" "}
                <JalaliDateConverter datetime={user.birthday} />
              </p>
            </div>
            <div className="flex items-center justify-evenly mt-4 border-t-2 pt-6 pb-4">
              <Link
                href={`/panel/users/update`}
                className="flex items-center justify-evenly gap-2 shadow px-8 p-2 text-blue-400 hover:text-blue-900 hover:cursor-pointer"
              >
                <FaEdit /> ویرایش
              </Link>
              <button
                className="shadow px-8 p-2 text-red-500 hover:text-red-800 flex items-center justify-evenly gap-2 hover:cursor-pointer"
                // onClick={() => handleDeleteCategory(category.id)}
              >
                <FaTrashCan />
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
