



"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaPenNib, FaBook, FaChartLine } from "react-icons/fa";

export default function WriterHome() {
  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-slate-800">
        Writer Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-xl shadow"
        >
          <FaPenNib className="text-emerald-600 text-2xl" />
          <h2 className="font-bold mt-3">Upload Ebook</h2>
          <p className="text-sm text-slate-500">Add new books easily</p>

          <Link
            href="/dashboard/writer/upload"
            className="text-emerald-600 mt-3 inline-block"
          >
            Go →
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-xl shadow"
        >
          <FaBook className="text-blue-600 text-2xl" />
          <h2 className="font-bold mt-3">Manage Books</h2>
          <p className="text-sm text-slate-500">Edit or delete ebooks</p>

          <Link
            href="/dashboard/writer/manage"
            className="text-blue-600 mt-3 inline-block"
          >
            Go →
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-xl shadow"
        >
          <FaChartLine className="text-purple-600 text-2xl" />
          <h2 className="font-bold mt-3">Sales</h2>
          <p className="text-sm text-slate-500">View earnings</p>

          <Link
            href="/dashboard/writer/sales"
            className="text-purple-600 mt-3 inline-block"
          >
            Go →
          </Link>
        </motion.div>

      </div>

    </div>
  );
}