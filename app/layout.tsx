import type { Metadata } from "next";
import dayjs from 'dayjs'
import jalali from 'dayjs-jalali'
import "./globals.css";

dayjs.extend(jalali)

export const metadata: Metadata = {
  title: "پخش سوسنی",
  description: "محصولات ویپ - پاد - فندک های آشپزخانه",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
