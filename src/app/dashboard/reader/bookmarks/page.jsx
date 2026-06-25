




"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; 
import { FaTrash, FaInfoCircle } from "react-icons/fa"; 

export default function BookmarksPage() {

  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
    const { data: session } = authClient.useSession();
  
 
  const token = session?.session?.token;
  console.log("SESSION =", session);
console.log("TOKEN =", token);

  useEffect(() => {
   if (!session?.user?.email || !token) {
        setLoading(false);
        return;
    }

   
    fetch(
       `${process.env.NEXT_PUBLIC_API_URL}/bookmarks/${session?.user.email}`,
       {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json'
    }
  })
      .then((res) => res.json())
      .then((data) => {
        setBookmarks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load bookmarks");
        setLoading(false);
      });
  }, [session?.user?.email]);

  const removeBookmark = async (id) => {
    try {
      const res = await fetch(
       `${process.env.NEXT_PUBLIC_API_URL}/bookmarks/${id}`,
         {
        method: "DELETE",
          
    headers: {
      Authorization: `Bearer ${token}`,
    },
  
      });

      if (res.ok) {
        toast.success("Bookmark removed");
        setBookmarks((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error("Failed to remove bookmark");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading bookmarks...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Bookmarks</h1>

      {bookmarks.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No bookmarked ebooks found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {bookmarks.map((book) => (
              
              <motion.div
                key={book._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                // className="bg-white rounded-xl shadow-2xl border overflow-hidden"
                className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-64 w-full object-cover"
                />

                <div className="p-4">
                  <h2 className="font-bold text-lg">{book.title}</h2>
                  <p className="text-gray-500">{book.author}</p>
                  <p className="text-emerald-600 font-semibold mt-2">
                    ${book.price}
                  </p>

                  <div className="flex gap-2 mt-4">
                    <Link
                      href={`/ebooks/${book.bookId}`}
                      className="flex-1 flex items-center justify-center  gap-2 bg-emerald-100 text-emerald-600 py-2 rounded-lg hover:bg-emerald-200 transition"
                    >
                      <FaInfoCircle /> View Details
                    </Link>

                    <button
                      onClick={() => removeBookmark(book._id)}
                      className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition"
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}