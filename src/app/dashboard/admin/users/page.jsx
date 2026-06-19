import { FaUsersCog } from "react-icons/fa";

export default function UsersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        <FaUsersCog className="text-blue-500" />
        Manage Users
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <p>All registered users will appear here.</p>
      </div>
    </div>
  );
}