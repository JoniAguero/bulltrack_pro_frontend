import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#111714]">
      <Sidebar className="fixed left-0 top-0 bottom-0 z-50 w-[300px] border-none hidden lg:flex" />
      <div className="flex-1 lg:ml-[300px] flex flex-col min-h-screen w-full">
        <Header />
        
        {/* Main Content Area with 40px Top Radius */}
        <main className="flex-1 bg-[#F3F4F6] rounded-tl-[30px] rounded-tr-[30px] lg:rounded-tl-[40px] lg:rounded-tr-[40px] mt-0 overflow-hidden relative"> 
           <div className="h-full w-full overflow-y-auto p-4 md:p-6 lg:p-8">
              {children}
           </div>
        </main>
      </div>
    </div>
  );
}
