



"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPenNib, FaCloudUploadAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { imageUpload } from "@/utils/imageUpload"; 
export default function UploadPage() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    image: "", 
  });

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const toastId = toast.loading("Uploading cover image to ImgBB...");
    setUploadingImage(true);

    try {
      const url = await imageUpload(file); 

      if (url) {
        setForm((prev) => ({ ...prev, image: url })); 
        toast.success("Image uploaded successfully! 📸", { id: toastId });
      } else {
        toast.error("Image upload failed!", { id: toastId });
      }
    } catch (err) {
      toast.error("Error uploading image!", { id: toastId });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!form.image) {
      toast.error("Please upload a cover image first!");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Saving ebook to server...");

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
          required
        />

        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author Name"
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-3 rounded-lg"
          required
        />

        
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center cursor-pointer hover:border-emerald-500 transition">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="bookCover"
            disabled={uploadingImage || loading}
          />
          <label htmlFor="bookCover" className="cursor-pointer block">
            <FaCloudUploadAlt className="mx-auto text-4xl text-slate-400 mb-1" />
            <span className="text-sm text-slate-600 font-medium">
              {uploadingImage ? "Uploading to ImgBB..." : "Click to upload Book Cover"}
            </span>
          </label>
        </div>

        
        {form.image && (
          <div className="mt-2 p-2 border rounded-lg bg-slate-50 flex items-center gap-4">
            <img src={form.image} alt="Book Cover Preview" className="h-20 w-16 object-cover rounded-md shadow" />
            <p className="text-xs text-emerald-600 font-semibold">Image Ready for Server!</p>
          </div>
        )}

        <button
          disabled={loading || uploadingImage}
          className={`w-full py-3 rounded-lg text-white font-medium transition ${
            loading || uploadingImage ? "bg-slate-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {loading ? "Saving Ebook..." : "Upload Ebook"}
        </button>
      </form>
    </motion.div>
  );
}