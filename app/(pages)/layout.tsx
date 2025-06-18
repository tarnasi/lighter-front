import Navbar from "@/components/Navbar";
import AppBottomNavigation from "@/components/dashboard/AppBottomNavigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full relative min-h-screen">
      <div className="px-4 py-2 md:px-16 lg:px-32 xl:px-64 bg-white text-gray-800 border-b border-gray-200">
        <Navbar isUserPanel={true} />
      </div>
      <div className="px-4 pt-4 pb-14 md:px-16 lg:px-32 xl:px-64 text-gray-800">
        {children}
      </div>
      <AppBottomNavigation />
    </div>
  );
}
