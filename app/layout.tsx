// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import ApolloWrapper from "@/apollo/ApolloWrapper";
import moment from "moment-jalaali";
import "moment/locale/fa";

moment.locale("fa");
moment.loadPersian({ dialect: "persian-modern" });

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
      <body className="antialiased">
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
