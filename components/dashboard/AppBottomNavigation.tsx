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
    iconSize: 20,
    icon: HeartOutlined,
    href: "/dashboard/interest",
  },
  {
    key: "home",
    label: "خانه",
    iconSize: 28,
    icon: HomeOutlined,
    href: "/",
  },
  {
    key: "profile",
    label: "پروفایل",
    iconSize: 20,
    icon: UserOutlined,
    href: "/dashboard/profile",
  },
  {
    key: "ticket",
    label: "تیکت",
    iconSize: 20,
    icon: MailOutlined,
    href: "/dashboard/tickets",
    badge: 8,
  },
];

export default function AppBottomNavigation() {
  const pathname = usePathname();

  // گرفتن لیست اقلام سبد خرید از Zustand
  const items = useOrderStore((state) => state.items);
  // محاسبه مجموع تعداد کالاها
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  // helper برای فعال بودن مسیر
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="fixed bottom-0 w-full md:hidden border-t bg-white z-50 shadow-md">
      <div className="grid grid-cols-5 items-center h-20 text-[11px]">
        {/* آیتم سبد خرید با تعداد داینامیک */}
        <Link
          key="basket"
          href="/dashboard/orders"
          className="flex flex-col items-center justify-center hover:text-blue-500 transition-colors"
        >
          <div className="relative flex flex-col items-center justify-center">
            <Badge
              count={totalQuantity}
              offset={[-4, 4]}
              size="small"
              showZero={false}
              className="cursor-pointer"
            >
              <ShoppingCartOutlined
                className="transition-transform"
                style={{
                  fontSize: "20px",
                  color: isActive("/dashboard/orders") ? "#3B82F6" : "#4B5563",
                }}
              />
            </Badge>
            <span
              className={`mt-1 ${
                isActive("/dashboard/orders")
                  ? "text-blue-500 font-bold"
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
            ? "text-blue-500 font-bold"
            : "text-gray-600";
          const iconColor = active ? "#3B82F6" : "#4B5563";

          const IconComponent = item.icon;

          return (
            <Link
              key={item.key}
              href={item.href}
              className="flex flex-col items-center justify-center hover:text-blue-500 transition-colors"
            >
              <div className="relative flex flex-col items-center justify-center">
                {item.badge ? (
                  <Badge count={item.badge} offset={[-4, 4]} size="small">
                    <IconComponent
                      className="transition-transform"
                      style={{
                        fontSize: `${item.iconSize}px`,
                        color: iconColor,
                        transform:
                          item.key === "home" && active
                            ? "scale(1.2)"
                            : "scale(1)",
                      }}
                    />
                  </Badge>
                ) : (
                  <IconComponent
                    className="transition-transform"
                    style={{
                      fontSize: `${item.iconSize}px`,
                      color: iconColor,
                      transform:
                        item.key === "home" && active
                          ? "scale(1.2)"
                          : "scale(1)",
                    }}
                  />
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
