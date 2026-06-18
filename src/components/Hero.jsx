"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-emerald-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">

        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
              <BookOpen size={16} />
              Digital Ebook Platform
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
            >
              Discover & Read
              <span className="block text-emerald-600">
                Original Ebooks
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-lg text-slate-600 leading-8 max-w-xl"
            >
              Explore thousands of original ebooks from talented writers around
              the world. Read, bookmark, and support authors through a modern
              digital reading experience.
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/browse"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition"
              >
                Browse Ebooks
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
              >
                Become a Writer
              </Link>
            </motion.div>

            {/* STATS */}
            <div className="flex gap-8 mt-10">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">10K+</h3>
                <p className="text-slate-500 text-sm">Readers</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">500+</h3>
                <p className="text-slate-500 text-sm">Writers</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">2K+</h3>
                <p className="text-slate-500 text-sm">Ebooks</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1000"
                alt="ebook"
                className="w-full h-[450px] object-cover rounded-3xl shadow-2xl"
              />

              {/* Floating Card */}
              <div className="absolute -bottom-5 left-5 bg-white shadow-xl rounded-2xl px-5 py-4">
                <p className="text-sm text-slate-500">
                  Featured Collection
                </p>
                <h4 className="font-semibold text-slate-900">
                  Best Seller Ebooks
                </h4>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}