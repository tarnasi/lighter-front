import type { Metadata } from "next";
import "./globals.css";
import ApolloWrapper from "@/apollo/ApolloWrapper";

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
    <ApolloWrapper>
      <html lang="fa" dir="rtl">
        <body className={`antialiased bg-white`}>{children}</body>
      </html>
    </ApolloWrapper>
  );
}
