

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

import { MdDashboard, MdLogout } from "react-icons/md";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;
   
  const handleLogout = async () => {
    await authClient.signOut();
  };

  const navLink = (path) =>
    pathname === path
      ? "text-emerald-600 font-semibold"
      : "text-slate-600 hover:text-emerald-600";

 
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">

      {/* Top bar */}
      <div className="bg-emerald-600 text-white text-center text-sm py-2 flex items-center justify-center gap-2">
        <FaBookOpen className="text-base" />
        <span>Discover & Read Original Ebooks on Fable</span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2">
          <FaBookOpen size={28} className="text-emerald-600" />
          <span className="font-bold text-xl text-slate-900">
            Fable
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 text-sm">

          <li>
            <Link href="/" className={navLink("/")}>Home</Link>
          </li>

          <li>
            <Link 
  href="/ebooks" 
  className="text-slate-600 hover:text-indigo-600 font-medium transition"
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

        {/* Auth */}
        <div className="hidden md:flex items-center gap-4">

          {!user ? (
            <>
              <Link href="/login">Login</Link>
              <Link
                href="/register"
                className="bg-emerald-600 text-white px-5 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">

              <button onClick={() => setDropdownOpen(!dropdownOpen)}>
               <Image
    src={user?.image || "https://i.ibb.co.com/VWG6sh99/photo-1541643600914-78b084683601.avif"}
    alt="user"
    height={20}
    width={20}
    className="w-9 h-9 rounded-full object-cover border"
  />
              </button>
{/* {
  console.log(user)
} */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white shadow-lg rounded-xl">

                  <div className="p-4 border-b bg-slate-50">
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-sm text-slate-500">{user?.email}</p>
                  </div>

                  <Link
                    href={`/dashboard/${user?.role}`}
                    className="flex items-center gap-2 px-4 py-3"
                  >
                    <MdDashboard /> Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-red-600"
                  >
                    <MdLogout /> Logout
                  </button>

                </div>
              )}
            </div>
          )}
        </div>

        
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </nav>

      {menuOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-3">
          <Link href="/">Home</Link>
        <Link 
  href="/ebooks" 
  className="text-slate-600 hover:text-indigo-600 font-medium transition"
>
  Browse Ebooks
</Link>

          {user && (
            <Link href={`/dashboard/${user?.role}`}>Dashboard</Link>
          )}

          {!user ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="text-red-600">
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}