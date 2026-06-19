"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/users");

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Manage Users
      </h1>

      {users.map((user) => (
        <div
          key={user._id}
          className="bg-white p-4 rounded-lg shadow mb-3"
        >
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <span>{user.role}</span>
        </div>
      ))}
    </div>
  );
}