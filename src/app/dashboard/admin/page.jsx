

"use client";

import { useEffect, useState } from "react";
import {
  FaUsers,
  FaUserEdit,
  FaBook,
  FaMoneyBillWave,
} from "react-icons/fa";

import { Bar, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { authClient } from "@/lib/auth-client";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AdminDashboard() {
  const { data: session } = authClient.useSession();

  const token = session?.session?.token;

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    users: 0,
    writers: 0,
    totalEbooks: 0,
    totalSold: 0,
    revenue: 0,
    monthlySales: [],
    genreData: [],
  });

  useEffect(() => {
    if (!token) return;

    const fetchStats = async () => {
      try {
        const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/stats`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        setStats(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading Dashboard...
      </div>
    );
  }

  const barData = {
    labels: stats.monthlySales.map(
      (item) => `Month ${item._id}`
    ),

    datasets: [
      {
        label: "Monthly Revenue",

        data: stats.monthlySales.map(
          (item) => item.total
        ),

        backgroundColor: "#10b981",
      },
    ],
  };

  const pieData = {
    labels: stats.genreData.map(
      (item) => item._id || "Unknown"
    ),

    datasets: [
      {
        data: stats.genreData.map(
          (item) => item.count
        ),

        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#06b6d4",
          "#14b8a6",
        ],
      },
    ],
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* Analytics Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <FaUsers className="text-4xl text-blue-500 mb-3" />

          <h2 className="font-semibold text-gray-600">
            Total Users
          </h2>

          <p className="text-3xl font-bold">
            {stats.users}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <FaUserEdit className="text-4xl text-purple-500 mb-3" />

          <h2 className="font-semibold text-gray-600">
            Total Writers
          </h2>

          <p className="text-3xl font-bold">
            {stats.writers}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <FaBook className="text-4xl text-emerald-500 mb-3" />

          <h2 className="font-semibold text-gray-600">
            Ebooks Sold
          </h2>

          <p className="text-3xl font-bold">
            {stats.totalSold}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <FaMoneyBillWave className="text-4xl text-orange-500 mb-3" />

          <h2 className="font-semibold text-gray-600">
            Total Revenue
          </h2>

          <p className="text-3xl font-bold">
            ${stats.revenue}
          </p>
        </div>

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Monthly Sales Chart
          </h2>

          <Bar data={barData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Ebooks By Genre
          </h2>

          <Pie data={pieData} />
        </div>

      </div>
    </div>
  );
}