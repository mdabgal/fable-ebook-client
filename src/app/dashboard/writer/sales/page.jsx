"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell 
} from "recharts";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

export default function SalesDashboard() {
  const { data: session } = authClient.useSession();
  const writerEmail = session?.user?.email;

  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!writerEmail) return;

    const fetchSales = async () => {
      try {
        const res = await fetch(`http://localhost:5000/writer/sales-history?email=${writerEmail}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setSalesData(data);
        }
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [writerEmail]);

  
  const getMonthlySales = () => {
    const monthlyMap = {};
    salesData.forEach((sale) => {
      const date = new Date(sale.date);
      const month = date.toLocaleString("en-US", { month: "short" }); // যেমন: Jan, Feb, Mar
      monthlyMap[month] = (monthlyMap[month] || 0) + Number(sale.price);
    });

    return Object.keys(monthlyMap).map((month) => ({
      name: month,
      Sales: monthlyMap[month],
    }));
  };





  
  const getGenreData = () => {
    const genreMap = {};
    salesData.forEach((sale) => {
      const genre = sale.genre || "Unknown";
      genreMap[genre] = (genreMap[genre] || 0) + 1; 
    });

    return Object.keys(genreMap).map((genre) => ({
      name: genre,
      value: genreMap[genre],
    }));
  };

  if (loading) {
    return <div className="text-center py-10 font-medium text-slate-500">Loading Dashboard Data...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      <h2 className="text-2xl font-bold text-slate-800">Sales Analytics & History</h2>

  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-5 rounded-xl shadow border border-slate-100"
        >
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Monthly Sales ($)</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getMonthlySales()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Sales" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

       
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-5 rounded-xl shadow border border-slate-100"
        >
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Ebooks Sold by Genre</h3>
          <div className="w-full h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getGenreData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getGenreData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

    
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow border border-slate-100 overflow-hidden"
      >
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-700">Recent Transactions</h3>
        </div>

        {salesData.length === 0 ? (
          <div className="text-center py-10 text-slate-400">No sales records found yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 text-sm font-semibold uppercase">
                  <th className="py-3 px-5">Reader Name</th>
                  <th className="py-3 px-5">Book Title</th>
                  <th className="py-3 px-5">Genre</th>
                  <th className="py-3 px-5">Purchase Date</th>
                  <th className="py-3 px-5 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {salesData.map((sale) => (
                  <tr key={sale._id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-5">
                      <p className="font-medium text-slate-900">{sale.readerName}</p>
                      <p className="text-xs text-slate-400">{sale.readerEmail}</p>
                    </td>
                    <td className="py-3 px-5 font-medium text-indigo-600">{sale.ebookTitle}</td>
                    <td className="py-3 px-5">
                      <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                        {sale.genre || "N/A"}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-slate-500">
                      {new Date(sale.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-5 text-right font-semibold text-emerald-600">
                      ${Number(sale.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}

