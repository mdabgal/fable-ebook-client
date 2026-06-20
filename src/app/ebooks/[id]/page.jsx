"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function EbookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/ebooks/${id}`);
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id]);

  // Stripe Checkout হ্যান্ডলার
  const handleBuyNow = async () => {
    if (!book) return;
    setPaymentLoading(true);
    try {
      const res = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: book._id,
          title: book.title,
          price: book.price,
          image: book.image,
        }),
      });
      const data = await res.json();
      if (data.id) {
        window.location.href = data.id; // Stripe-এর অফিসিয়াল পেমেন্ট পেজে রিডাইরেক্ট করবে
      } else {
        alert("Payment session creation failed!");
      }
    } catch (error) {
      console.error("Payment Error:", error);
    } finally {
      setPaymentLoading(false);
    }
  };

  // 🦴 ১. অ্যাসাইনমেন্ট রিকোয়ারমেন্ট অনুযায়ী সুন্দর "Skeleton Loader"
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
          <div className="w-full h-[400px] bg-slate-200 rounded-2xl"></div>
          <div className="space-y-6 py-4">
            <div className="h-4 bg-slate-200 rounded-md w-24"></div>
            <div className="h-10 bg-slate-200 rounded-md w-3/4"></div>
            <div className="h-6 bg-slate-200 rounded-md w-1/2"></div>
            <div className="h-20 bg-slate-200 rounded-md w-full"></div>
            <div className="h-12 bg-slate-200 rounded-xl w-full mt-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <p className="text-slate-500 font-bold text-lg">Book Not Found!</p>
        <Link href="/ebooks" className="text-emerald-600 mt-2 font-medium hover:underline">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* ব্যাক বাটন */}
      <div className="max-w-5xl mx-auto mb-6">
        <Link href="/ebooks" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-600 transition">
          ← Back to Browse
        </Link>
      </div>

      {/* 🌟 প্রিমিয়াম ডিটেইলস কার্ড উইথ মোশন */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-100/80 border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-10"
      >
    
        <div className="w-full h-[350px] md:h-[480px] bg-slate-50 rounded-2xl overflow-hidden shadow-inner border border-slate-100 relative group">
          <img
            src={book.image || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e"}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=500";
            }}
          />
          <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md uppercase tracking-wider">
            {book.genre || "Original"}
          </span>
        </div>

        {/* ডান পাশ: বইয়ের সমস্ত মেটাডেটা ও পেমেন্ট বাটন */}
        <div className="flex flex-col justify-between py-2 space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
              {book.title}
            </h1>
            
            <p className="text-sm font-medium text-slate-400">
              Written by <span className="text-emerald-600 font-bold text-base">{book.author}</span>
            </p>

            <div className="h-px bg-slate-100 my-4" />

            {/* ডেসক্রিপশন (যদি ডাটাবেজে থাকে, না থাকলে প্রফেশনাল ডেমো টেক্সট) */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">About This Ebook</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {book.description || "Immerse yourself in this remarkable digital creation. This ebook brings you a curated reading experience crafted with passion and detail. Perfect for collectors and modern readers alike."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-400 block font-medium">Status</span>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide bg-emerald-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                  {book.status || "Available"}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-400 block font-medium">Format</span>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide bg-slate-200 px-2 py-0.5 rounded-md mt-1 inline-block">
                  Digital PDF
                </span>
              </div>
            </div>
          </div>

          {/* প্রাইজ এবং বাই নাও অ্যাকশন এরিয়া */}
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Price</span>
              <span className="text-3xl font-black text-slate-900">${book.price}</span>
            </div>

            {/* Stripe পেমেন্ট ট্রিগার বাটন */}
            <button
              onClick={handleBuyNow}
              disabled={paymentLoading}
              className="w-full bg-gradient-to-r from- emerald-600 to-emerald-600 hover:from-emerald-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {paymentLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Connecting to Stripe...
                </>
              ) : (
                "Proceed to Buy Now"
              )}
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
}