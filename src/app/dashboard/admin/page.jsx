


"use client";

import { useEffect, useState } from "react";
import { FaUsers, FaBook, FaMoneyBillWave } from "react-icons/fa";

import {
  Bar,
  Pie,
} from "react-chartjs-2";

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

export default function AdminPage() {
  const [stats, setStats] = useState({
    users: 0,
    writers: 0,
    ebooks: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = authClient.useSession();

const token = session?.session?.token;

  

useEffect(() => {
  if (!token) return;

  const fetchStats = async () => {
    try {
      setLoading(true); 

      const res = await fetch("http://localhost:5000/admin/stats", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      const data = await res.json();
      setStats(data.data || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchStats();
}, [token]);
  const barData = {
    labels: ["Users", "Writers", "Ebooks", "Revenue"],
    datasets: [
      {
        label: "Statistics Overview",
        data: [stats.users, stats.writers, stats.ebooks, stats.revenue],
        backgroundColor: ["#3b82f6", "#8b5cf6", "#10b981", "#f97316"],
      },
    ],
  };

  
  const pieData = {
    labels: ["Users", "Writers", "Ebooks", "Revenue"],
    datasets: [
      {
        data: [stats.users, stats.writers, stats.ebooks, stats.revenue],
        backgroundColor: ["#3b82f6", "#8b5cf6", "#10b981", "#f97316"],
      },
    ],
  };

 
  if (loading)
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading Dashboard...
      </div>
    );

  
  if (error)
    return (
      <div className="text-center mt-10 text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

    
      <h1 className="text-3xl font-bold mb-8">
         Admin Dashboard
      </h1>

      
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <FaUsers className="text-4xl text-blue-500 mb-3" />
          <h2 className="text-xl font-bold">Total Users</h2>
          <p className="text-2xl font-semibold">{stats.users}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <FaBook className="text-4xl text-emerald-500 mb-3" />
          <h2 className="text-xl font-bold">Total Ebooks</h2>
          <p className="text-2xl font-semibold">{stats.ebooks}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <FaMoneyBillWave className="text-4xl text-orange-500 mb-3" />
          <h2 className="text-xl font-bold">Total Revenue</h2>
          <p className="text-2xl font-semibold">
            ${stats.revenue}
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold mb-4">
            Platform Stats (Bar)
          </h3>
          <Bar data={barData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold mb-4">
            Distribution (Pie)
          </h3>
          <Pie data={pieData} />
        </div>

      </div>

    </div>
  );
}



// "use client";

// import { useEffect, useState } from "react";
// import { FaUsers, FaBook, FaMoneyBillWave, FaUserEdit } from "react-icons/fa";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";
// import { authClient } from "@/lib/auth-client";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// export default function AdminPage() {
//   const [stats, setStats] = useState({
//     users: 0,
//     writers: 0,
//     ebooks: 0,
//     revenue: 0,
//     monthlySales: [],
//     genreData: [],
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { data: session } = authClient.useSession();
//   const token = session?.session?.token;

//   useEffect(() => {
//     if (!token) return;

//     const fetchStats = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch("http://localhost:5000/admin/stats", {
//          headers: { 
//         "Content-Type": "application/json",
//         "authorization": `Bearer ${token}` 
//       },
//         });

//         if (!res.ok) throw new Error("Failed to fetch dashboard stats");
        
//         const data = await res.json();
//         setStats(data);
//       } catch (err) {
//         console.error("Fetch Error:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, [token]);

//   // চার্টের ডাটা ফরম্যাট করা
//   const barData = {
//     labels: stats.monthlySales.map((item) => `Month ${item._id}`),
//     datasets: [{
//       label: "Monthly Revenue ($)",
//       data: stats.monthlySales.map((item) => item.total),
//       backgroundColor: "#3b82f6",
//     }],
//   };

//   const pieData = {
//     labels: stats.genreData.map((item) => item._id),
//     datasets: [{
//       data: stats.genreData.map((item) => item.count),
//       backgroundColor: ["#f87171", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa"],
//     }],
//   };

//   if (loading) return <div className="text-center mt-20 text-emerald-600 font-bold">Loading Analytics...</div>;
//   if (error) return <div className="text-center mt-20 text-red-500">Error: {error}</div>;

//   return (
//     <div className="p-6 bg-slate-50 min-h-screen">
//       <h1 className="text-3xl font-bold mb-8 text-slate-800">Admin Dashboard</h1>

//       {/* Analytics Overview Cards */}
//       <div className="grid md:grid-cols-4 gap-6 mb-10">
//         <div className="bg-white p-6 rounded-xl shadow-sm border">
//           <FaUsers className="text-3xl text-blue-500 mb-2" />
//           <p className="text-sm text-slate-500">Total Users</p>
//           <h2 className="text-2xl font-bold">{stats.users}</h2>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border">
//           <FaUserEdit className="text-3xl text-purple-500 mb-2" />
//           <p className="text-sm text-slate-500">Total Writers</p>
//           <h2 className="text-2xl font-bold">{stats.writers}</h2>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border">
//           <FaBook className="text-3xl text-emerald-500 mb-2" />
//           <p className="text-sm text-slate-500">Total Ebooks</p>
//           <h2 className="text-2xl font-bold">{stats.ebooks}</h2>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border">
//           <FaMoneyBillWave className="text-3xl text-orange-500 mb-2" />
//           <p className="text-sm text-slate-500">Total Revenue</p>
//           <h2 className="text-2xl font-bold">${stats.revenue}</h2>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="bg-white p-6 rounded-xl shadow-sm border">
//           <h3 className="text-lg font-bold mb-4">Monthly Revenue Flow</h3>
//           <Bar data={barData} />
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border">
//           <h3 className="text-lg font-bold mb-4">Ebooks Distribution by Genre</h3>
//           <Pie data={pieData} />
//         </div>
//       </div>
//     </div>
//   );
// }