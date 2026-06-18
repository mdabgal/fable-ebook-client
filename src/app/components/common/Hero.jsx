"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 lg:py-28 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-emerald-600 font-medium"
          >
            <BookOpen size={18} />
            Digital Ebook Platform
          </motion.div>

          {/* heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-4xl md:text-5xl font-bold text-slate-900 leading-tight"
          >
            Discover & Read <br />
            <span className="text-emerald-600">
              Original Ebooks
            </span>
          </motion.h1>

          {/* paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-slate-600 text-lg leading-7"
          >
            Fable connects readers with talented writers around the world.
            Explore, read, and purchase unique ebooks in one platform.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/browse"
              className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition"
            >
              Browse Ebooks
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/register"
              className="flex items-center justify-center px-6 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
            >
              Become a Writer
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="overflow-hidden rounded-2xl shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
              alt="ebook"
              className="w-full h-[420px] object-cover"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}