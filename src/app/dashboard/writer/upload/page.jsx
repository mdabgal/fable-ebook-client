"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPenNib } from "react-icons/fa";
import toast from "react-hot-toast";

export default function UploadPage() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };




const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const toastId = toast.loading("Uploading ebook...");

  try {
    const res = await fetch("http://localhost:5000/ebooks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    toast.success("Ebook uploaded successfully! ", {
      id: toastId,
    });

    setForm({
      title: "",
      author: "",
      price: "",
      image: "",
    });
  } catch (err) {
    toast.error("Upload failed! Try again ", {
      id: toastId,
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow"
    >

      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <FaPenNib className="text-emerald-600" />
        Upload New Ebook
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Book Title"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author Name"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-3 rounded-lg"
        />

        <button
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700"
        >
          {loading ? "Uploading..." : "Upload Ebook"}
        </button>

      </form>

    </motion.div>
  );
}