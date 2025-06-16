"use client";

import Link from "next/link";

type StatusType = "open" | "closed" | "pending";

const translate_status = {
  open: "باز",
  pending: "بسته",
  closed: "در حال بررسی",
};

type Ticket = {
  id: string;
  title: string;
  status: StatusType;
  updatedAt: string;
};

// Dummy data — replace with real API response later
const tickets: Ticket[] = [
  {
    id: "1",
    title: "کویل ازتون گرفتم خرابه و نشتی داره چطور میتونیم عوضش کنید؟",
    status: "open",
    updatedAt: "2025-06-14",
  },
  {
    id: "2",
    title: "مخصول آسیب دیده میخوام برگشت بزنم",
    status: "pending",
    updatedAt: "2025-06-12",
  },
  {
    id: "3",
    title: "تخفیف برای حویس بزارید",
    status: "closed",
    updatedAt: "2025-06-10",
  },
];

const statusColorMap: Record<StatusType, string> = {
  open: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  closed: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
};

export default function TicketListPage() {
  return (
    <section className="p-4 pt-2 pb-20 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">تیکت های من</h1>

      <div className="flex flex-col gap-4">
        {tickets.map((ticket) => (
          <Link
            key={ticket.id}
            href={`/panel/tickets/${ticket.id}`}
            className="block p-4 rounded-xl shadow-sm dark:bg-white bg-zinc-800 dark:hover:bg-gray-50 hover:bg-zinc-700 transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-base font-medium truncate">{ticket.title}</h2>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  statusColorMap[ticket.status]
                }`}
              >
                {translate_status[ticket.status]}
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {ticket.updatedAt}
            </div>
          </Link>
        ))}
      </div>

      {/* Optional: New Ticket Button */}
      <div className="fixed bottom-16 right-4 sm:bottom-8">
        <Link
          href="/panel/tickets/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          + New Ticket
        </Link>
      </div>
    </section>
  );
}
