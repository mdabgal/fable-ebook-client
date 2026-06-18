"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiBookOpen, FiTrash2 } from "react-icons/fi";

export default function WriterDashboard() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET MY EBOOKS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/ebooks");
        const data = await res.json();
        setEbooks(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // DELETE EBOOK
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/ebooks/${id}`, {
        method: "DELETE",
      });

      setEbooks(ebooks.filter((book) => book._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold flex items-center gap-2"
      >
        <FiBookOpen className="text-emerald-600" />
        My Ebooks
      </motion.h1>

      <p className="text-gray-500 mt-2">
        Manage your published ebooks
      </p>

     
      {loading ? (
        <p className="mt-6 text-gray-500">Loading ebooks...</p>
      ) : ebooks.length === 0 ? (
        <p className="mt-6 text-red-500">No ebooks found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          {ebooks.map((book, index) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >

             
              <h2 className="text-xl font-bold">
                {book.title}
              </h2>

             
              <p className="text-sm text-gray-500 mt-1">
                By {book.author}
              </p>

          
              <p className="mt-2 text-emerald-600 font-bold">
                ${book.price}
              </p>

           
              <button
                onClick={() => handleDelete(book._id)}
                className="mt-4 flex items-center gap-2 text-red-500 hover:text-red-700"
              >
                <FiTrash2 />
                Delete
              </button>

            </motion.div>
          ))}

        </div>
      )}

    </div>
  );
}