"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  LayoutDashboard,
  LogIn,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Browse Ebooks",
      href: "/browse",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 lg:px-8">
        
        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="rounded-xl bg-emerald-100 p-2">
            <BookOpen
              size={24}
              className="text-emerald-600"
            />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Fable
            </h1>

            <p className="text-xs text-slate-500">
              Ebook Platform
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium transition ${
                pathname === link.href
                  ? "text-emerald-600"
                  : "text-slate-700 hover:text-emerald-600"
              }`}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-slate-700 transition hover:bg-slate-100"
          >
            <LogIn size={18} />
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-emerald-600 px-5 py-2 text-white transition hover:bg-emerald-700"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu */}

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}

      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="flex flex-col gap-4 p-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-medium text-slate-700"
              >
                {link.title}
              </Link>
            ))}

            <Link
              href="/login"
              className="rounded-lg border border-slate-200 px-4 py-2 text-center"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-center text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}