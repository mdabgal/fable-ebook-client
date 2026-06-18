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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const { error: authError } = await authClient.signUp.email({
//         email,
//         password,
//         name,
//         data: { role },
//       });

//       if (authError) {
//         setError(authError.message || "Registration failed");
//       } else {
//         router.push("/");
//         router.refresh();
//       }
//     } catch (err) {
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

// const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       // data: { role } এর পরিবর্তে role সরাসরি পাঠানো হয়েছে
//       const { error: authError } = await authClient.signUp.email({
//         email,
//         password,
//         name,
//         role, //  সরাসরি রুট লেভেলে পাঠাতে হবে
//       });

//       if (authError) {
//         setError(authError.message || "Registration failed");
//       } else {
//         router.push("/");
//         router.refresh();
//       }
//     } catch (err) {
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
     
      const { error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
        role, 
      });

      if (authError) {
        toast.error(authError.message || "Registration failed"); // 👈 এরর টোস্ট
      } else {
       
        toast.success("Registration successful! Redirecting to login...");
        
       
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      toast.error("Something went wrong");
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

       
        <h2 className="text-3xl font-bold text-center text-slate-900">
          Create your Fable Account
        </h2>

        <p className="text-center text-sm text-slate-500 mt-2">
          Join readers & writers worldwide
        </p>

      
        {error && (
          <div className="mt-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
            {error}
          </div>
        )}

       
        <form onSubmit={handleRegister} className="mt-6 space-y-5">

          
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

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

       
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition"
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
  className="w-full flex items-center justify-center gap-2 border border-slate-200 py-2 rounded-lg hover:bg-slate-100 transition"
>
  <FcGoogle className="text-xl" />
  <span>Continue with Google</span>
</button>
      
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