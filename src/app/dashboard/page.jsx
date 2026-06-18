"use client";

import { motion } from "framer-motion";
import { FiBookOpen, FiUsers, FiTrendingUp } from "react-icons/fi";

export default function DashboardPage() {
  const stats = [
    { id: 1, title: "Total Ebooks", value: 12, icon: <FiBookOpen /> },
    { id: 2, title: "Readers", value: 120, icon: <FiUsers /> },
    { id: 3, title: "Sales", value: 45, icon: <FiTrendingUp /> },
  ];

  return (
    <div className="p-6">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold"
      >
        📊 Dashboard Overview
      </motion.h1>

      <p className="text-gray-500 mt-2">
        Welcome back! Here is your ebook performance.
      </p>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        {stats.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="text-2xl text-emerald-600">
              {item.icon}
            </div>

            <h2 className="text-2xl font-bold mt-3">
              {item.value}
            </h2>

            <p className="text-gray-500">
              {item.title}
            </p>
          </motion.div>
        ))}

      </div>

    </div>
  );
}