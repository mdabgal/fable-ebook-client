import { FaUsers, FaBook, FaMoneyBillWave } from "react-icons/fa";

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        👑 Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <FaUsers className="text-4xl text-blue-500 mb-3" />
          <h2 className="text-xl font-bold">Users</h2>
          <p className="text-slate-500">Manage all users</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <FaBook className="text-4xl text-emerald-500 mb-3" />
          <h2 className="text-xl font-bold">Ebooks</h2>
          <p className="text-slate-500">Manage all ebooks</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <FaMoneyBillWave className="text-4xl text-orange-500 mb-3" />
          <h2 className="text-xl font-bold">Transactions</h2>
          <p className="text-slate-500">Track payments</p>
        </div>

      </div>
    </div>
  );
}