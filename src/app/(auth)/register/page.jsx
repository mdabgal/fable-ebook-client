"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("reader");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ইমেল ও পাসওয়ার্ড দিয়ে রেজিস্ট্রেশন হ্যান্ডলার
  const handleRegister = async (e) => {
    e.preventDefault();

    // প্রাথমিক ভ্যালিডেশন চেক
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      // Better-Auth সাইন-আপ কল
      const { data, error: authError } = await authClient.signUp.email({
        email: email,
        password: password,
        name: name,
        data: {
          // যদি ইমেলটি admin@fable.com হয়, তবে অটোমেটিক 'admin' রোল সেট হবে, অন্যথায় সিলেক্ট করা রোল যাবে
          role: email === "admin@fable.com" ? "admin" : role,
        },
      });

      if (authError) {
        toast.error(authError.message || "Registration failed");
      } {
        toast.success("Registration successful! Redirecting to login...");

        // 🔥 FIX: অটো-লগইন সেশন ক্লিয়ার করা যাতে লগইন পেজে কোনো সমস্যা না হয়
        await authClient.signOut();
        
        // ২ সেকেন্ড পর লগইন পেজে রিডাইরেক্ট করা হচ্ছে যেন ইউজার টোস্টটি দেখতে পায়
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // গুগল সোশ্যাল লগইন হ্যান্ডলার
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // গুগল লগইন সফল হলে হোম পেজে নিয়ে যাবে
      });
    } catch (err) {
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
        
        <h2 className="text-3xl font-bold text-center text-slate-900">
          Create your Fable Account
        </h2>

        <p className="text-center text-sm text-slate-500 mt-2">
          Join readers & writers worldwide
        </p>

        <form onSubmit={handleRegister} className="mt-6 space-y-5">
          
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* রোল সিলেকশন বাটন */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("reader")}
              className={`py-2 rounded-lg border transition font-medium ${
                role === "reader"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              Reader
            </button>

            <button
              type="button"
              onClick={() => setRole("writer")}
              className={`py-2 rounded-lg border transition font-medium ${
                role === "writer"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              Writer
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition font-semibold"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px bg-slate-200 w-full"></div>
          <span className="text-xs text-slate-400">OR</span>
          <div className="h-px bg-slate-200 w-full"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-slate-200 py-2 rounded-lg hover:bg-slate-100 transition font-medium text-slate-700"
        >
          <FcGoogle className="text-xl" />
          <span>Continue with Google</span>
        </button>
        
        <p className="text-center text-sm text-slate-500 mt-6">
          Already have account?{" "}
          <Link href="/login" className="text-emerald-600 font-medium hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}