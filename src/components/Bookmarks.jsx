"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaInfoCircle } from "react-icons/fa";
import Link from "next/link";

export default function Bookmarks() {
  const { data: session } = authClient.useSession();

   const token = session?.session?.token;
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

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
            'Authorization': `Bearer ${token}` 
        }
      });
      if (res.ok) {
        toast.success("Bookmark removed");
        setBookmarks((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error("Failed to remove bookmark");
    }
  };

  if (loading) return <div>Loading bookmarks...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Bookmarks</h2>
      {bookmarks.length === 0 ? (
        <p>No bookmarked ebooks found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {bookmarks.map((book) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-xl shadow border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <img src={book.image} alt={book.title} className="h-64 w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{book.title}</h3>
                   <p className="text-gray-500">{book.author}</p>
                  <p className="text-emerald-600 font-semibold mt-2">
                    ${book.price}
                  </p>
                  <div className="flex gap-2">
                    <Link href={`/ebooks/${book.bookId}`} className="flex items-center gap-1 bg-emerald-100 text-emerald-600 px-4 py-2 rounded-lg hover:bg-blue-700">
                      <FaInfoCircle /> Details
                    </Link>
                    <button
                      onClick={() => removeBookmark(book._id)}
                      className="flex items-center gap-1 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200"
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