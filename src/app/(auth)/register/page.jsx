"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("reader");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
        data: { role },
      });

      if (authError) {
        setError(authError.message || "Registration failed");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      setError("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-slate-100">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-slate-900">
          Create your Fable Account
        </h2>

        <p className="text-center text-sm text-slate-500 mt-2">
          Join readers & writers worldwide
        </p>

        {/* ERROR */}
        {error && (
          <div className="mt-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleRegister} className="mt-6 space-y-5">

          {/* NAME */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ROLE */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("reader")}
              className={`py-2 rounded-lg border transition ${
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
              className={`py-2 rounded-lg border transition ${
                role === "writer"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              Writer
            </button>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px bg-slate-200 w-full"></div>
          <span className="text-xs text-slate-400">OR</span>
          <div className="h-px bg-slate-200 w-full"></div>
        </div>

        {/* GOOGLE */}
       <button
  onClick={handleGoogleLogin}
  className="w-full flex items-center justify-center gap-2 border border-slate-200 py-2 rounded-lg hover:bg-slate-100 transition"
>
  <FcGoogle className="text-xl" />
  <span>Continue with Google</span>
</button>
        {/* LOGIN LINK */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Already have account?{" "}
          <Link href="/login" className="text-emerald-600 font-medium">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}