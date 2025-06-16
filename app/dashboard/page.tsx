// app/panel/page.tsx
"use client";

import PanelCard from "@/components/dashboard/PanelCard";
import { FaShoppingBasket, FaUser, FaTicketAlt } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

export default async function DashboardMainPAge() {
  return (
    <section className="p-4 pt-2 pb-20 max-w-xl mx-auto">
      <div className="flex flex-col gap-4">
        <PanelCard
          title="سفارشات‌"
          icon={<FaShoppingBasket />}
          href="/dashboard/orders"
        />
        <PanelCard
          title="تیکت ها"
          icon={<FaTicketAlt />}
          href="/dashboard/tickets"
        />
        <PanelCard
          title="پروفایل"
          icon={<FaUser />}
          href="/dashboard/profile"
        />
        <PanelCard
          title="سوالات متداول"
          icon={<MdSupportAgent />}
          href="/dashboard/help"
        />
      </div>
    </section>
  );
}
