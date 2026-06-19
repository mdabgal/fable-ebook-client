import Sidebar from "@/components/Sidebar";



export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1 p-6 pt-20 md:pt-6">
        {children}
      </main>

    </div>
  );
}