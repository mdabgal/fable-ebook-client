"use client";

import { useEffect, useState } from "react";
import { FaUserShield, FaUserEdit, FaTrash, FaSpinner } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast"; // npm install react-hot-toast

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // কোন বাটনে ক্লিক হয়েছে তা ট্র্যাক করার জন্য

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
console.log(users)
  const changeRole = async (id, role) => {
    setActionLoading(id);
    try {
      await fetch(`http://localhost:5000/users/${id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      toast.success(`User role updated to ${role}`);
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update role");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><FaSpinner className="animate-spin text-4xl text-emerald-500" /></div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Toaster />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manage Users</h1>
          <p className="text-slate-500">Platform user administration panel</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 shadow-sm rounded-xl px-6 py-3">
          <p className="text-sm text-emerald-700 font-medium">Total Users</p>
          <p className="text-3xl font-bold text-emerald-600">{users.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-slate-600 uppercase text-xs tracking-wider">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Array.isArray(users) &&
              users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">{user.name || "N/A"}</td>
                  <td className="px-6 py-4 text-slate-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                      user.role === "admin" ? "bg-green-100 text-green-700" : 
                      user.role === "writer" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {["reader", "writer", "admin"].map((role) => (
                        <button
                          key={role}
                          disabled={actionLoading === user._id}
                          onClick={() => changeRole(user._id, role)}
                          className={`btn btn-xs ${actionLoading === user._id ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          {role === "admin" && <FaUserShield />}
                          {role === "writer" && <FaUserEdit />}
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}