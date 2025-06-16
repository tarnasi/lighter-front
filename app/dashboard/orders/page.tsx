import BottomNavigation from "@/components/dashboard/BottomNavigation";
import Navbar from "@/components/Navbar";
import Orders from "@/components/Orders";

export default async function DashboardPage() {
  return (
    <div className="w-full relative min-h-screen">
      <Navbar isUserPanel={true} />
      <Orders />
      <BottomNavigation />
    </div>
  );
}
