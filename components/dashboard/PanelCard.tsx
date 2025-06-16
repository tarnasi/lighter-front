// app/panel/components/PanelCard.tsx
import Link from "next/link";
import { ReactNode } from "react";

type PanelCardProps = {
  title: string;
  icon: ReactNode;
  href: string;
};

export default function PanelCard({ title, icon, href }: PanelCardProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between p-4 rounded-2xl shadow-md hover:bg-sky-100 hover:text-black dark:hover:bg-sky-700 dark:hover:text-white transition"
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div className="text-base font-medium">{title}</div>
      </div>
      <div className="text-white">&rarr;</div>
    </Link>
  );
}
