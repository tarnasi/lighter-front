import Navbar from "@/components/Navbar";
import PageTitle from "@/components/PageTitle";
import InfoCards from "@/components/panel/InfoCards";
import React from "react";

type Props = {};

const PanelPage = async (props: Props) => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <PageTitle title="پنل مدیریت" returnLink="/" returnTitle="رفتن به سایت" />
      <InfoCards />
    </div>
  );
};

export default PanelPage;
