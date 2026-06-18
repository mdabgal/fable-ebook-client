export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-5">
        <h1 className="text-xl font-bold">📚 Fable Dashboard</h1>

        <nav className="mt-6 flex flex-col gap-3">
          <a href="/dashboard" className="hover:text-emerald-400">Home</a>
          <a href="/dashboard/writer" className="hover:text-emerald-400">Writer</a>
          <a href="/dashboard/reader" className="hover:text-emerald-400">Reader</a>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 bg-slate-50">
        {children}
      </main>

    </div>
  );
}