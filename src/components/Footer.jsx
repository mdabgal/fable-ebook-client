"use client";

import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">

      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-emerald-600">
              Fable
            </h2>
            <p className="text-sm text-slate-600 mt-3 leading-6">
              Discover, read and publish original ebooks.
              A platform for readers and writers worldwide.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/browse">Browse Ebooks</Link></li>
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms</Link></li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="font-semibold mb-3">Newsletter</h3>

            <p className="text-sm text-slate-600 mb-3">
              Get latest ebook updates
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 border rounded-l-lg focus:outline-none"
              />
              <button className="bg-emerald-600 text-white px-4 rounded-r-lg">
                Join
              </button>
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex gap-3 mt-4 text-xl text-slate-600">
              <FaFacebook className="hover:text-emerald-600 cursor-pointer" />
              <FaInstagram className="hover:text-emerald-600 cursor-pointer" />
              <FaTwitter className="hover:text-emerald-600 cursor-pointer" />
              <FaLinkedin className="hover:text-emerald-600 cursor-pointer" />
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t mt-10 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Fable. All rights reserved.
        </div>

      </div>

    </footer>
  );
}