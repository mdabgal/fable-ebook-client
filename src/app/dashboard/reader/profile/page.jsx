"use client";

import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl">

      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {/* 🔥 PROFILE IMAGE */}
      <div className="flex justify-center mb-6">
        <img
          src={session?.user?.image || "https://i.ibb.co/2tZ5z3K/user.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
      </div>

      {/* INFO */}
      <div className="space-y-3 text-center">
        <p><b>Name:</b> {session?.user?.name}</p>
        <p><b>Email:</b> {session?.user?.email}</p>
        <p><b>Role:</b> user</p>
      </div>

    </div>
  );
}