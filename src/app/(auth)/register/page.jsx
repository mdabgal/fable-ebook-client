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
const [imageFile, setImageFile] = useState(null);
const [confirmPassword, setConfirmPassword] = useState("");
const uploadToImgBB = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.data.url;
};
  

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (password !== confirmPassword) {
  toast.error("Passwords do not match");
  return;
}

    setLoading(true);

    try {
      let imageUrl = "https://i.ibb.co/2tZ5z3K/user.png";

      if (imageFile) {
        imageUrl = await uploadToImgBB(imageFile);
      }

      const { data, error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
        role: email === "admin@fable.com" ? "admin" : role,
          image: imageUrl,
      });

      if (authError) {
        toast.error(authError.message || "Registration failed");
        setLoading(false);
        return;
      }

    const {data:jwtdata} = await authClient.token();



const token = jwtdata.token
// console.log(token)

if (token) {
  localStorage.setItem("token", token);
  console.log("JWT TOKEN =", token);
} else {
  console.log("Token not found");
}

      toast.success("Registration successful! Redirecting to login...");

     
      // await authClient.signOut();

      setTimeout(() => {
        router.push("/");
      }, 2000);

    } catch (err) {
      // console.error(err);
      toast.error("Something went wrong. Please try again.");
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
  type="file"
  accept="image/*"
  className="w-full px-3 py-2 border rounded-lg"
  onChange={(e) => setImageFile(e.target.files[0])}
/>

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
  type="password"
  placeholder="Confirm Password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  className="w-full px-3 py-2 rounded-lg border"
/>

          
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


