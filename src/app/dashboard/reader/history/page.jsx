
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function HistoryPage() {
  const { data: session } = authClient.useSession();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      if (!session?.user?.email) return;

      const res = await fetch(
        `http://localhost:5000/my-purchase/${session.user.email}`
      );

      const data = await res.json();
        console.log("Purchase History:", data);
        
      setHistory(data);
    };

    getHistory();
  }, [session?.user?.email]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Purchase History
      </h1>

      {history.length === 0 ? (
        <p>No purchases found.</p>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 shadow"
            >
              <p>
                <strong>Book ID:</strong> {item.bookId}
              </p>

              <p>
                <strong>Price:</strong> ${item.amount}
              </p>

              <p>
                <strong>User:</strong> {item.userEmail}
              </p>

            <p>
              <b>Date:</b>{" "}
              {item.purchaseDate
                ? new Date(item.purchaseDate).toLocaleDateString()
                : new Date(item.date).toLocaleDateString()}
            </p>

            <p>
              <b>Status:</b> {item.status || "Paid"}
            </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
