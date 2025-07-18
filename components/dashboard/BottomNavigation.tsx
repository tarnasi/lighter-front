"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeOutlined,
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import { useOrderStore } from "@/stores/useOrderStore";

const navItems = [
  {
    key: "favorites",
    label: "علاقمندی‌ها",
    icon: <HeartOutlined style={{ fontSize: "20px" }} />,
    href: "/dashboard/interest",
  },
  {
    key: "home",
    label: "خانه",
    icon: <HomeOutlined style={{ fontSize: "20px" }} />,
    href: "/dashboard",
  },
  {
    key: "profile",
    label: "پروفایل",
    icon: <UserOutlined style={{ fontSize: "20px" }} />,
    href: "/dashboard/profile",
  },
  {
    key: "ticket",
    label: "تیکت",
    icon: <MailOutlined style={{ fontSize: "20px" }} />,
    href: "/dashboard/tockets",
    badge: 8,
  },
];

export default function BottomNavAntd() {
  const pathname = usePathname();

  // گرفتن تعداد کل اقلام سبد خرید از Zustand
  const items = useOrderStore((state) => state.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav className="fixed bottom-0 w-full md:hidden border-t bg-white z-50 shadow-md">
      <div className="flex justify-around items-center h-16">
        {/* سبد خرید با تعداد داینامیک */}
        <Link
          key="basket"
          href="/dashboard/orders"
          className="flex flex-col items-center justify-center text-[11px] hover:text-blue-600"
        >
          <div className="relative flex flex-col items-center justify-center">
            <Badge
              count={totalQuantity}
              offset={[-4, 4]}
              size="small"
              showZero={false}
              className="cursor-pointer"
            >
              <ShoppingCartOutlined style={{ fontSize: "20px" }} />
            </Badge>
            <span
              className={`mt-1 ${
                isActive("/dashboard/orders")
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600"
              }`}
            >
              سبد خرید
            </span>
          </div>
        </Link>

        {/* بقیه آیتم‌ها */}
        {navItems.map((item) => {
          const active = isActive(item.href);
          const textColor = active
            ? "text-blue-600 font-semibold"
            : "text-gray-600";

          return (
            <Link
              key={item.key}
              href={item.href}
              className="flex flex-col items-center justify-center text-[11px] hover:text-blue-600"
            >
              <div className="relative flex flex-col items-center justify-center">
                {item.badge ? (
                  <Badge count={item.badge} offset={[-4, 4]} size="small">
                    <div className={textColor}>{item.icon}</div>
                  </Badge>
                ) : (
                  <div className={textColor}>{item.icon}</div>
                )}
                <span className={`mt-1 ${textColor}`}>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
