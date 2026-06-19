// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client";

// export default function Sidebar() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [mounted, setMounted] = useState(false);

//   // Better-Auth থেকে সেশন ও লোডিং স্টেট নেওয়া
//   const { data: session, isLoading } = authClient.useSession();

//   if (isLoading) {
//   return (
//     <aside className="w-64 bg-slate-900 text-white p-6">
//       Loading...
//     </aside>
//   );
// }

//   const role = session?.user?.role || "reader"; // ডিফল্ট রোল reader

//   // Hydration Error ফিক্স করার জন্য মাউন্ট চেকিং
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // লগআউট হ্যান্ডলার
//   const handleLogout = async () => {
//     try {
//       await authClient.signOut();
//       router.push("/login");
//       router.refresh(); // সেশন ক্লিয়ার করে লেআউট রিফ্রেশ করার জন্য
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   // লোডিং অথবা মাউন্ট হওয়ার আগের স্টেট (Hydration Safe)
//   if (!mounted || isLoading) {
//     return (
//       <aside className="w-64 min-h-screen bg-slate-900 text-white p-6 flex items-center justify-center border-r border-slate-800">
//         <div className="flex flex-col items-center gap-2">
//           <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
//           <p className="text-sm text-slate-400">Loading Session...</p>
//         </div>
//       </aside>
//     );
//   }

//   // ইউজার লগইন না থাকলে লগইন পেজে যাওয়ার অপশন
//   if (!session) {
//     return (
//       <aside className="w-64 min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center justify-center gap-4 border-r border-slate-800">
//         <p className="text-slate-400 text-sm text-center">No active session found</p>
//         <Link 
//           href="/login" 
//           className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors w-full text-center"
//         >
//           Go to Login
//         </Link>
//       </aside>
//     );
//   }

//   // রোল (Role) অনুযায়ী ড্যাশবোর্ড মেনু নির্ধারণ [cite: 101]
//   const menuItems = {
//     // ১. রাইটার মেনু (Writer Dashboard)
//       writer: [
//     { name: "Dashboard Home", path: "/dashboard/writer" },
//     { name: "Upload New Ebook", path: "/dashboard/writer/upload" },
//     { name: "Manage Ebooks", path: "/dashboard/writer/manage" },
//     { name: "Sales History", path: "/dashboard/writer/sales" },
//   ],
    
//     // ২. রিডার মেনু (Reader/User Dashboard)
//     reader: [
//       { name: "Browse Ebooks", path: "/browse" },
//       { name: "My Purchases", path: "/dashboard/purchases" },
//       { name: "Reading History", path: "/dashboard/history" },
//     ],
//     // ৩. অ্যাডমিন মেনু (Admin Panel)
//     admin: [
//       { name: "Admin Home", path: "/dashboard/admin" },
//       { name: "Manage Users", path: "/dashboard/admin/users" },
//       { name: "All Ebooks", path: "/dashboard/admin/ebooks" },
//       { name: "Transactions", path: "/dashboard/admin/transactions" },
//     ],
//   };

//   // বর্তমান ইউজারের রোল অনুযায়ী মেনু ফিল্টার করা
//   const currentMenu = menuItems[role] || menuItems["reader"];

//   return (
//     <aside className="w-64 min-h-screen bg-slate-900 text-white p-6 flex flex-col justify-between border-r border-slate-800 shrink-0">
//       <div>
//         {/* ব্র্যান্ড লোগো বা নাম */}
//         <div className="mb-8 border-b border-slate-800 pb-4">
//           <Link href="/" className="text-2xl font-bold tracking-wide text-emerald-400">
//             Fable <span className="text-xs text-slate-400 block capitalize">Role: {role}</span>
//           </Link>
//         </div>

//         {/* ইউজার প্রোফাইল সেকশন */}
//         <div className="flex items-center gap-3 mb-6 p-2 bg-slate-800/50 rounded-xl">
//           <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white uppercase text-sm">
//             {session?.user?.name ? session.user.name.slice(0, 2) : "U"}
//           </div>
//           <div className="overflow-hidden">
//             <h4 className="text-sm font-medium truncate">{session?.user?.name}</h4>
//             <p className="text-xs text-slate-400 truncate">{session?.user?.email}</p>
//           </div>
//         </div>

//         {/* ডাইনামিক নেভিগেশন লিংকসমূহ */}
//         <nav className="space-y-1.5">
//           <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider pl-2 mb-2">
//             Navigation
//           </p>
//           {currentMenu.map((item) => {
//             const isActive = pathname === item.path;
//             return (
//               <Link
//                 key={item.path}
//                 href={item.path}
//                 className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
//                   isActive
//                     ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/30"
//                     : "text-slate-400 hover:bg-slate-800 hover:text-white"
//                 }`}
//               >
//                 {item.name}
//               </Link>
//             );
//           })}
//         </nav>
//       </div>

//       {/* সাইডবারের নিচের বাটন (যেমন: হোম ও লগআউট) */}
//       <div className="space-y-2 pt-4 border-t border-slate-800">
//         <Link
//           href="/"
//           className="flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
//         >
//           Back to Home
//         </Link>
//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white rounded-lg transition-all"
//         >
//           Sign Out
//         </button>
//       </div>
//     </aside>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaBookOpen, 
  FaHistory, 
  FaCloudUploadAlt, 
  FaTasks, 
  FaChartLine, 
  FaUsers, 
  FaBook, 
  FaExchangeAlt, 
  FaSignOutAlt,
  FaArrowLeft
} from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isLoading } = authClient.useSession();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // lock scroll when mobile menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  if (!mounted || isLoading) {
    return (
      <aside className="hidden md:flex w-64 min-h-screen bg-slate-900 text-white flex-col items-center justify-center border-r border-slate-800 animate-pulse">
        <div className="text-sm text-slate-400">Loading Session...</div>
      </aside>
    );
  }

  if (!session) {
    return (
      <aside className="hidden md:flex w-64 min-h-screen bg-slate-900 text-white flex-col items-center justify-center p-6 border-r border-slate-800">
        <p className="text-xs text-slate-400 mb-4 text-center">You are not logged in.</p>
        <Link href="/login" className="w-full bg-emerald-600 hover:bg-emerald-700 text-center py-2 rounded-lg text-sm font-semibold transition">
          Go to Login
        </Link>
      </aside>
    );
  }

  const role = session?.user?.role || "reader";

  // রোল ভিত্তিক আইকনসহ মেনু আইটেম
  const menuItems = {
    writer: [
      { name: "Dashboard Home", path: "/dashboard/writer", icon: <FaHome /> },
      { name: "Upload New Ebook", path: "/dashboard/writer/upload", icon: <FaCloudUploadAlt /> },
      { name: "Manage Ebooks", path: "/dashboard/writer/manage", icon: <FaTasks /> },
      { name: "Sales History", path: "/dashboard/writer/sales", icon: <FaChartLine /> },
    ],
    reader: [
      { name: "Dashboard Home", path: "/dashboard/reader", icon: <FaBookOpen /> },
      { name: "My Purchases", path: "/dashboard/reader/purchases", icon: <FaBook /> },
      { name: "Reading History", path: "/dashboard/reader/history", icon: <FaHistory /> },
    ],
    admin: [
      { name: "Admin Home", path: "/dashboard/admin", icon: <FaHome /> },
      { name: "Manage Users", path: "/dashboard/admin/users", icon: <FaUsers /> },
      { name: "All Ebooks", path: "/dashboard/admin/ebooks", icon: <FaBook /> },
      { name: "Transactions", path: "/dashboard/admin/transactions", icon: <FaExchangeAlt /> },
    ],
  };

  const currentMenu = menuItems[role] || [];

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // শেয়ার্ড নেভিগেশন লিংক রেন্ডারার ফাংশন
  const renderNavLinks = (closeMobileMenu = false) => {
    return currentMenu.map((item) => {
      const active = pathname === item.path;
      return (
        <Link
          key={item.path}
          href={item.path}
          onClick={() => closeMobileMenu && setOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
            active
              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/30"
              : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
          }`}
        >
          <span className={`text-base ${active ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}>
            {item.icon}
          </span>
          {item.name}
        </Link>
      );
    });
  };

  return (
    <>
      {/* ========================================================== */}
      {/* 📱 MOBILE TOP NAVBAR */}
      {/* ========================================================== */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 text-white flex items-center justify-between px-6 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-lg text-white">F</div>
          <span className="font-bold text-xl tracking-tight text-white">Fable</span>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition"
          aria-label="Open Menu"
        >
          <FaBars size={18} />
        </button>
      </header>

      {/* MOBILE BACKDROP OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
        />
      )}

      {/* ========================================================== */}
      {/* 📱 MOBILE SIDEBAR DRAWER */}
      {/* ========================================================== */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-slate-900 text-white z-50 flex flex-col justify-between transform transition-transform duration-300 ease-in-out border-r border-slate-800 md:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div>
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-slate-800/60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white">F</div>
              <span className="font-bold text-xl text-white">Fable</span>
            </div>
            <button 
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <FaTimes size={16} />
            </button>
          </div>

          {/* User Status Tag */}
          <div className="px-6 py-4 bg-slate-950/40 border-b border-slate-800/40 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-sm uppercase">
              {session?.user?.name ? session.user.name.substring(0, 2) : "U"}
            </div>
            <div>
              <p className="text-sm font-semibold truncate max-w-[180px]">{session?.user?.name || "User"}</p>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium uppercase tracking-wider">{role}</span>
            </div>
          </div>

          {/* Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-260px)]">
            {renderNavLinks(true)}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800/60 bg-slate-950/20 space-y-2">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition py-2"
          >
            <FaArrowLeft size={10} /> Back to main home
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white py-2.5 rounded-xl text-sm font-semibold transition duration-200"
          >
            <FaSignOutAlt size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* ========================================================== */}
      {/* 🖥️ DESKTOP SIDEBAR */}
      {/* ========================================================== */}
      <aside className="hidden md:flex w-64 min-h-screen bg-slate-900 text-white border-r border-slate-800 flex-col justify-between sticky top-0 h-screen">
        <div>
          {/* Header */}
          <div className="p-6 border-b border-slate-800/60 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white">F</div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white leading-tight">Fable</h1>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Workspace</span>
            </div>
          </div>

          {/* Menu Links */}
          <nav className="p-4 space-y-1.5">
            {renderNavLinks(false)}
          </nav>
        </div>

        {/* Bottom User Info & Logout (Sticky Footer) */}
        <div className="p-4 border-t border-slate-800/60 bg-slate-950/40 space-y-3">
          {/* Mini Profile Info */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-sm uppercase shadow-sm shadow-emerald-700/50">
              {session?.user?.name ? session.user.name.substring(0, 2) : "FI"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-200 truncate">{session?.user?.name || "Fable User"}</p>
              <p className="text-xs text-slate-400 capitalize truncate">{role} Account</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-1">
            <Link
              href="/"
              className="flex items-center gap-2 justify-center w-full text-xs text-slate-400 hover:text-slate-200 py-1.5 transition rounded-lg hover:bg-slate-800/40"
            >
              <FaArrowLeft size={10} /> Exit Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            >
              <FaSignOutAlt size={14} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* 💡 মোবাইল ভিউতে যাতে কন্টেন্ট সাইডবারের নিচে ঢাকা না পড়ে, সেজন্য Dashboard Layout ফাইলে `main` ট্যাগটিতে মোবাইল মোডে `pt-16` (Padding Top) থাকা নিশ্চিত করবেন। */}
    </>
  );
}