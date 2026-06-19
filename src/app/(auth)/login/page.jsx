"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await authClient.signIn.email({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || "Login failed");
        return;
      }

      // 🔥 Better-Auth সেশন নেওয়া
      const session = await authClient.getSession();
      const user = session?.user;

      // 🔄 রোল অনুযায়ী ড্যাশবোর্ডে রিডাইরেক্ট
      if (user?.role === "admin") {
        router.push("/dashboard/admin");
      } else if (user?.role === "writer") {
        router.push("/dashboard/writer");
      } else {
        router.push("/dashboard/reader");
      }

      router.refresh();

    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      
      await authClient.signIn.social({
        provider: "google",
        // 💡 এখানে callbackURL পরিবর্তন করে /dashboard দেওয়া হলো।
        // আপনার /dashboard/page.jsx ফাইলে ইউজারের রোল অনুযায়ী রিডাইরেক্ট করার লজিক লিখে রাখতে হবে।
        callbackURL: "/dashboard", 
      });
    } catch {
      setError("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-slate-100">

        <h2 className="text-3xl font-bold text-center text-slate-900">
          Welcome Back
        </h2>

        <p className="text-center text-sm text-slate-500 mt-2">
          Login to continue reading ebooks
        </p>

        {error && (
          <div className="mt-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px bg-slate-200 w-full"></div>
          <span className="text-xs text-slate-400">OR</span>
          <div className="h-px bg-slate-200 w-full"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-slate-200 py-2 rounded-lg hover:bg-slate-100 transition font-medium disabled:opacity-50"
        >
          <FcGoogle className="text-xl" />
          {loading ? "Connecting..." : "Continue with Google"}
        </button>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don’t have an account?{" "}
          <Link href="/register" className="text-emerald-600 font-medium hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}