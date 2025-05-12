"use client";

import { useQuery } from "@apollo/client";
import { USER_LIST_QUERY } from "@/apollo/queries";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const UserTable = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(USER_LIST_QUERY);

  useEffect(() => {
    if (error?.message.includes("مجاز")) {
      router.push("/");
    }
  }, [error]);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">لیست کاربران</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">موبایل</th>
            <th className="p-2 border">ایمیل</th>
            <th className="p-2 border">نقش</th>
            <th className="p-2 border">تاریخ تولد</th>
          </tr>
        </thead>
        <tbody>
          {data?.userList?.map((user: any) => (
            <tr key={user.id}>
              <td className="p-2 border">{user.mobile}</td>
              <td className="p-2 border">{user.email || "-"}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border">
                {user.birthday
                  ? new Date(user.birthday).toLocaleDateString("fa-IR")
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
