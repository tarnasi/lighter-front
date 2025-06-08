import BottomNavigation from "@/components/dashboard/BottomNavigation";
import Navbar from "@/components/Navbar";


export default async function DashboardPage() {
  return (
    <div className="w-full relative min-h-screen">
      <Navbar isUserPanel={true} />
      <BottomNavigation />
    </div>
  )
}

