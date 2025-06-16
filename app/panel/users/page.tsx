import Navbar from "@/components/Navbar";
import PageTitle from "@/components/PageTitle";
import UserTable from "@/components/panel/tables/UserTables";
import React from "react";

type Props = {};

const UsersPage = async (props: Props) => {
  return (
    <div className="bg-white min-h-screen">
      <PageTitle title="لیست کاربران" returnLink="/panel" returnTitle="برگشت" />
      <UserTable />
    </div>
  );
};

export default UsersPage;
