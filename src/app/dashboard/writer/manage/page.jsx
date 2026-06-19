
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaEdit, FaBookOpen, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // মোডাল স্টেটসমূহ
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // এডিট ফর্মের স্টেট
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // বইগুলোর ডেটা ফেচ করা
  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:5000/ebooks");
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Failed to load books!");
    } finally {
      loading && setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ডিলিট মোডাল ওপেন করার ফাংশন
  const openDeleteModal = (book) => {
    setSelectedBook(book);
    setIsDeleteModalOpen(true);
  };

  // ডিলিট নিশ্চিত করার হ্যান্ডলার
  const handleConfirmDelete = async () => {
    if (!selectedBook) return;
    const id = selectedBook._id;
    const toastId = toast.loading("Deleting book...");
    setIsDeleteModalOpen(false);

    try {
      const res = await fetch(`http://localhost:5000/ebooks/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Book deleted successfully! 🗑️", { id: toastId });
        setBooks(books.filter((book) => book._id !== id));
      } else {
        toast.error("Failed to delete book", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    } finally {
      setSelectedBook(null);
    }
  };

  // এডিট মোডাল ওপেন করার ফাংশন
  const openEditModal = (book) => {
    setSelectedBook(book);
    setEditTitle(book.title);
    setEditAuthor(book.author);
    setEditPrice(book.price);
    setIsEditModalOpen(true);
  };

  // এডিট বা আপডেট ফর্ম সাবমিট হ্যান্ডলার
  const handleUpdateBook = async (e) => {
    e.preventDefault();
    if (!selectedBook) return;

    if (!editTitle || !editAuthor || !editPrice) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsUpdating(true);
    const toastId = toast.loading("Updating book...");

    try {
      const res = await fetch(`http://localhost:5000/ebooks/${selectedBook._id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          author: editAuthor,
          price: Number(editPrice),
        }),
      });

      if (res.ok) {
        const updatedData = await res.json();
        toast.success("Book updated successfully! ", { id: toastId });

        
        setBooks(
          books.map((b) =>
            b._id === selectedBook._id
              ? { ...b, title: editTitle, author: editAuthor, price: editPrice }
              : b
          )
        );
        setIsEditModalOpen(false);
      } else {
        toast.error("Failed to update book", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow"
      >
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-6 text-slate-800">
          <FaBookOpen className="text-emerald-600" />
          Manage Your Ebooks
        </h1>

        {loading ? (
          <div className="text-center py-10 text-slate-500">Loading your books...</div>
        ) : books.length === 0 ? (
          <div className="text-center py-10 text-slate-500">No books found. Upload one first!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 uppercase text-xs tracking-wider border-b">
                  <th className="p-4 font-semibold">Cover</th>
                  <th className="p-4 font-semibold">Title</th>
                  <th className="p-4 font-semibold">Author</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {books.map((book) => (
                  <tr key={book._id} className="hover:bg-slate-50 transition">
                    <td className="p-4">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded shadow-sm border"
                      />
                    </td>
                    <td className="p-4 font-semibold text-slate-900">{book.title}</td>
                    <td className="p-4">{book.author}</td>
                    <td className="p-4 font-medium text-emerald-600">${book.price}</td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center items-center gap-3">
                      
                        <button
                          onClick={() => openEditModal(book)}
                          className="p-2 text-green-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit Book"
                        >
                          <FaEdit size={16} />
                        </button>

                        {/* ডিলিট বাটন */}
                        <button
                          onClick={() => openDeleteModal(book)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete Book"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* ─── ১. কাস্টম ডিলিট মোডাল (AnimatePresence সহ) ─── */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl border border-slate-100"
            >
              <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Ebook?</h3>
              <p className="text-slate-600 text-sm mb-6">
                Are you sure you want to delete <span className="font-semibold text-slate-900">"{selectedBook?.title}"</span>? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── ২. কাস্টম এডিট মোডাল (AnimatePresence সহ) ─── */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl border border-slate-100 relative"
            >
              {/* ক্রস বাটন মোডাল বন্ধ করার জন্য */}
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition"
              >
                <FaTimes size={18} />
              </button>

              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FaEdit className="text-green-600" /> Update Ebook Info
              </h3>

              <form onSubmit={handleUpdateBook} className="space-y-4">
                {/* বুক টাইটেল ইনপুট */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Book Title
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500 text-sm text-slate-800 bg-slate-50 focus:bg-white transition"
                    placeholder="E.g. The Great Gatsby"
                  />
                </div>

                {/* লেখক ইনপুট */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={editAuthor}
                    onChange={(e) => setEditAuthor(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-sm text-slate-800 bg-slate-50 focus:bg-white transition"
                    placeholder="E.g. F. Scott Fitzgerald"
                  />
                </div>

                {/* দাম ইনপুট */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-sm text-slate-800 bg-slate-50 focus:bg-white transition"
                    placeholder="E.g. 9.99"
                  />
                </div>

                {/* অ্যাকশন বাটন সমূহ */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-5 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-blue-400 rounded-lg transition shadow-md"
                  >
                    {isUpdating ? "Saving Changes..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}