"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import {
  FaBars,
  FaTimes,
  FaBookOpen,
  FaUserCircle,
} from "react-icons/fa";

import {
  MdDashboard,
  MdLogout,
} from "react-icons/md";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pathname = usePathname();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
  };

  const navLink = (path) =>
    pathname === path
      ? "text-emerald-600 font-semibold"
      : "text-slate-600 hover:text-emerald-600";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">

    
      <div className="bg-emerald-600 text-white text-center text-sm py-2 flex items-center justify-center gap-2">
  <FaBookOpen className="text-base" />
  <span>Discover & Read Original Ebooks on Fable</span>
</div>

      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

       
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <FaBookOpen
            size={28}
            className="text-emerald-600"
          />
          <span className="font-bold text-xl text-slate-900">
            Fable
          </span>
        </Link>

      
        <ul className="hidden md:flex items-center gap-8 text-sm">

          <li>
            <Link href="/" className={navLink("/")}>
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/browse"
              className={navLink("/browse")}
            >
              Browse Ebooks
            </Link>
          </li>

          {user && (
            <li>
              <Link
                href={`/dashboard/${user?.role}`}
                className="text-slate-600 hover:text-emerald-600"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>

    
        <div className="hidden md:flex items-center gap-4">

          {!user ? (
            <>
              <Link
                href="/login"
                className="text-slate-600 hover:text-emerald-600"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">

              <button
                onClick={() =>
                  setDropdownOpen(!dropdownOpen)
                }
                className="flex items-center gap-2"
              >
                <FaUserCircle
                  size={34}
                  className="text-emerald-600"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">

                  <div className="p-4 border-b bg-slate-50">
                    <h4 className="font-semibold">
                      {user?.name}
                    </h4>

                    <p className="text-sm text-slate-500">
                      {user?.email}
                    </p>

                    <span className="inline-block mt-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                      {user?.role}
                    </span>
                  </div>

                  <Link
                    href={`/dashboard/${user?.role}`}
                    className="flex items-center gap-2 px-4 py-3 hover:bg-slate-50"
                  >
                    <MdDashboard />
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 text-red-600"
                  >
                    <MdLogout />
                    Logout
                  </button>

                </div>
              )}
            </div>
          )}
        </div>

      
        <button
          className="md:hidden text-2xl"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          {menuOpen ? (
            <FaTimes />
          ) : (
            <FaBars />
          )}
        </button>

      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">

          <div className="flex flex-col p-4 gap-4">

            <Link href="/">
              Home
            </Link>

            <Link href="/browse">
              Browse Ebooks
            </Link>

            {user && (
              <Link
                href={`/dashboard/${user?.role}`}
              >
                Dashboard
              </Link>
            )}

            {!user ? (
              <>
                <Link href="/login">
                  Login
                </Link>

                <Link
                  href="/register"
                  className="bg-emerald-600 text-white text-center py-2 rounded-lg"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-left text-red-600"
              >
                Logout
              </button>
            )}

          </div>
        </div>
      )}
    </header>
  );
}