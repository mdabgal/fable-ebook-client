"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiBookOpen, FiArrowRight } from "react-icons/fi";
import { FaUserPen } from "react-icons/fa6";
import Link from "next/link";

export default function FeaturedEbooks() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const res = await fetch("http://localhost:5000/ebooks/featured");
        const data = await res.json();
        setEbooks(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEbooks();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 text-emerald-600">
            <FiBookOpen className="text-2xl" />
            <span className="text-sm font-semibold uppercase tracking-wide">
              Featured Collection
            </span>
          </div>

          <h2 className="text-4xl font-bold mt-3 text-slate-900">
            Discover Premium Ebooks
          </h2>

          <p className="text-slate-500 mt-2">
            Handpicked books from top writers around the world
          </p>
        </motion.div>

       
        {loading ? (
          <div className="text-center text-slate-500 py-10">
            Loading amazing ebooks...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">

            {ebooks.map((book, index) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-100 transition"
              >

                {/* IMAGE */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                 
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full shadow">
                    ${book.price}
                  </div>
                </div>

               
                <div className="p-5">

                  <h3 className="text-lg font-bold text-slate-800 line-clamp-1">
                    {book.title}
                  </h3>

                  
                  <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                    <FaUserPen className="text-xs" />
                    {book.author}
                  </p>

                  
                  <Link href={`/ebooks/${book._id}`}>
                    <button className="mt-5 w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white py-2.5 rounded-xl transition font-medium">
                      View Details
                      <FiArrowRight className="group-hover:translate-x-1 transition" />
                    </button>
                  </Link>

                </div>
              </motion.div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}