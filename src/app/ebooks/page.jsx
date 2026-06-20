"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiBookOpen, FiSearch } from "react-icons/fi";

import { CardSkeleton } from "@/components/Skeleton";

export default function BrowseEbooks() {
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // ফিল্টার ও সার্চ স্টেটসমূহ
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        search,
        genre,
        sortBy,
        page: currentPage,
        limit: 6 
      });

      const res = await fetch(`http://localhost:5000/ebooks?${queryParams.toString()}`);
      const data = await res.json();
      
      setBooks(data.books || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error loading books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [currentPage, genre, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBooks();
  };

  return (
    <div className="min-gradient bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* 🌟 হেডার সেকশন উইথ মোশন */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-emerald-600 tracking-tight">
            Discover Original Ebooks
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-base sm:text-lg font-medium">
            Explore masterpieces written by creators worldwide. Immerse yourself in stories that matter.
          </p>
        </motion.div>

        {/* 🔍 ফিল্টারিং এবং সার্চ কন্ট্রোল প্যানেল */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-slate-200/60 grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
        >
          <form onSubmit={handleSearchSubmit} className="md:col-span-2 flex gap-2">
            <input
              type="text"
              placeholder="Search by book title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-emerald-500 text-sm text-slate-700 transition"
            />
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-md shadow-indigo-600/10 active:scale-95">
              Search
            </button>
          </form>

          <select 
            value={genre} 
            onChange={(e) => { setGenre(e.target.value); setCurrentPage(1); }} 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-emerald-500 transition cursor-pointer"
          >
            <option value="">All Genres</option>
            <option value="Fiction">Fiction</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Poetry">Poetry</option>
            <option value="Drama">Drama</option>
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }} 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-emerald-500 transition cursor-pointer"
          >
            <option value="newest">Latest Releases</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
          </select>
        </motion.div>

      
       

        {/* 📚 ইবুক লিস্ট গ্রিড উইথ অ্যানিমেশন/স্কেলিটন লোডার */}
{loading ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
   
    {[...Array(6)].map((_, index) => (
      <CardSkeleton key={index} />
    ))}
  </div>
) : books.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-white rounded-2xl border border-dashed border-slate-200 shadow-inner"
          >
           <div className="flex justify-center text-5xl text-slate-300 mb-3 animate-bounce">
  <FiSearch />
</div>
            <p className="text-slate-400 font-medium text-lg">No ebooks found matching your criteria.</p>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {books.map((book, index) => (
                <motion.div
                  key={book._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div className="p-5">
                    {/* কভার ইমেজ সেকশন */}
                    <div className="w-full h-56 bg-slate-50 rounded-xl mb-4 overflow-hidden relative shadow-inner border border-slate-100/80">
                      {book.image ? (
                        <img 
                          src={book.image} 
                          alt={book.title} 
                          className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=500";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                        <div className="text-5xl text-indigo-600 mb-2">
  <FiBookOpen />
</div>
                          <span className="text-xs font-semibold uppercase tracking-wider">No Cover</span>
                        </div>
                      )}
                      
                      {/* জেনার ব্যাজ */}
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-emerald-600 text-xs px-3 py-1.5 rounded-lg font-bold shadow-sm">
                        {book.genre || "General"}
                      </span>
                    </div>

                    {/* বইয়ের ইনফরমেশন */}
                    <h3 className="font-bold text-xl text-slate-800 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-sm text-slate-400 font-medium mt-1">
                      By <span className="text-slate-600">{book.author || "Unknown Author"}</span>
                    </p>
                  </div>

                  {/* বোতাম ও প্রাইজ লাইন */}
                  <div className="p-5 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center gap-3">
                    <div>
                      <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Price</span>
                      <span className="text-2xl font-black text-slate-900">${book.price}</span>
                    </div>
                    
                    {/* ডাইনামিক ডিটেইলস পেজ কানেকশন বাটন */}
                    <Link href={`/ebooks/${book._id}`} className="flex-1">
                      <button className="w-full bg-indigo-50 hover:bg-emerald-600 text-emerald-600 hover:text-white font-bold text-sm py-3 px-4 rounded-xl transition-all duration-300 shadow-sm border border-indigo-100 hover:border-emerald-600 active:scale-95 text-center">
                        View Details
                      </button>
                    </Link>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* 📄 পেজিনেশন কন্ট্রোল */}
        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center gap-4 pt-8"
          >
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 transition shadow-sm active:scale-95"
            >
              Previous
            </button>
            
            <span className="text-sm font-bold text-slate-500 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 transition shadow-sm active:scale-95"
            >
              Next
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}


