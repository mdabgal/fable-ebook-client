"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function HistoryPage() {
  const { data: session } = authClient.useSession();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      if (!session) return;

      // const token = session?.data?.access_token; // আগে console.log(session) দিয়ে verify করো

      const res = await fetch(
        `http://localhost:5000/my-purchase/${session?.user?.email}`,
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );

      const data = await res.json();
      console.log(data)
      setHistory(data);
    };

    getHistory();
  }, [session]);
console.log(history)
  return (
    <div>
      <h1>Reading History</h1>

      {history.map((item) => (
        <div key={item._id}>
          <p>{item.bookId}</p>
          <p>{item.amount}</p>
        </div>
      ))}
    </div>
  );
}