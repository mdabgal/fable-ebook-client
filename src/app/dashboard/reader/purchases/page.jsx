




"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState([]);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const getHistory = async () => {
      if (!session?.user?.email) return;

      const res = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}/my-purchase/${session.user.email}`
      );

      const data = await res.json();
      setPurchases(data);
    };

    getHistory();
  }, [session?.user?.email]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        My Purchases
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">
        {purchases.length === 0 ? (
          <p>No purchases found</p>
        ) : (
          purchases.map((item) => (
            <div key={item._id} className="border-b py-3">
 

              {/* 🔥 IMAGE HERE */}
              <img
                src={item.coverImage}
                alt={item.ebookName}
                className="w-16 h-20 object-cover rounded"
              />

              <p><b>Ebook Name:</b> {item.ebookName}</p>
              <p><b>Writer:</b> {item.writer}</p>

              <p><b>Price:</b> ${item.amount}</p>

              <p>
                <b>Date:</b>{" "}
                {new Date(item.purchaseDate || item.date).toLocaleDateString()}
              </p>

              <p><b>Status:</b> {item.status || "Paid"}</p>

            </div>
          ))
        )}
      </div>
    </div>
  );
}