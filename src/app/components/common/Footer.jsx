import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsBook } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">

        {/* GRID */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND SECTION */}
          <div>
            <div className="flex items-center gap-2">
              <BsBook className="text-emerald-600 text-2xl" />
              <h2 className="text-2xl font-bold text-slate-900">
                Fable
              </h2>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Discover, read and share original ebooks
              from talented writers around the world.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-4 font-semibold text-slate-900">
              Quick Links
            </h3>

            <div className="space-y-3 text-slate-600">
              <Link href="/" className="block hover:text-emerald-600 transition">
                Home
              </Link>

              <Link href="/browse" className="block hover:text-emerald-600 transition">
                Browse Ebooks
              </Link>

              <Link href="/dashboard" className="block hover:text-emerald-600 transition">
                Dashboard
              </Link>

              <Link href="#" className="block hover:text-emerald-600 transition">
                Contact
              </Link>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="mb-4 font-semibold text-slate-900">
              Newsletter
            </h3>

            <p className="text-sm text-slate-600 mb-3">
              Get latest ebook updates
            </p>

            <div className="flex overflow-hidden rounded-xl border border-slate-200">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 text-sm text-slate-800 outline-none"
              />

              <button className="bg-emerald-600 px-5 text-white hover:bg-emerald-700 flex items-center justify-center">
                <MdEmail size={18} />
              </button>
            </div>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="mb-4 font-semibold text-slate-900">
              Follow Us
            </h3>

            <div className="flex gap-4">

              <a
                href="#"
                className="rounded-full border border-slate-200 p-3 text-slate-600 hover:bg-emerald-600 hover:text-white transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="rounded-full border border-slate-200 p-3 text-slate-600 hover:bg-emerald-600 hover:text-white transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="rounded-full border border-slate-200 p-3 text-slate-600 hover:bg-emerald-600 hover:text-white transition"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="rounded-full border border-slate-200 p-3 text-slate-600 hover:bg-emerald-600 hover:text-white transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Fable. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}