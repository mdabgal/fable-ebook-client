"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaBook,
  FaUser,
  FaDollarSign,
  FaLayerGroup,
} from "react-icons/fa";

export default function ManagePage() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/ebooks")
      .then((res) => res.json())
      .then((data) => {
        setEbooks(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-slate-800">
          <FaLayerGroup className="text-emerald-600" />
          Manage Ebooks
        </h1>
      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {ebooks.map((book, index) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05, // stagger effect
              }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 border border-slate-100"
            >

              {/* IMAGE */}
              <img
                src={book.image}
                alt={book.title}
                className="h-40 w-full object-cover rounded-xl mb-4"
              />

              {/* TITLE */}
              <h2 className="text-lg font-bold flex items-center gap-2">
                <FaBook className="text-emerald-600" />
                {book.title}
              </h2>

              {/* AUTHOR */}
              <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                <FaUser />
                {book.author}
              </p>

              {/* PRICE */}
              <p className="mt-2 text-emerald-600 font-bold flex items-center gap-2">
                <FaDollarSign />
                {book.price}
              </p>

            </motion.div>
          ))}

        </div>
      )}
    </div>
  );
}