import UserProfileForm from "@/components/forms/UserProfileForm";
import Navbar from "@/components/Navbar";
import PageTitle from "@/components/PageTitle";
import React from "react";

type Props = {};

const UserProfilePage = async (props: Props) => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <PageTitle title="پروفایل" returnLink="/panel" returnTitle="برگشت" />
      <UserProfileForm />
    </div>
  );
};

export default UserProfilePage;
