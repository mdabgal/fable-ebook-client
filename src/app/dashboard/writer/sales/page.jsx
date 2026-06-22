"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SalesPage() {
  const { data: session } = authClient.useSession();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);

        const email =
          session?.user?.email || session?.data?.user?.email;

        console.log("Writer Email:", email); // DEBUG

        if (!email) return;

        const res = await fetch(
          `http://localhost:5000/writer/sales-history?email=${email}`
        );

        const data = await res.json();

        console.log("Sales Data:", data); // DEBUG

        setSales(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [session]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Sales History</h1>

      {sales.length === 0 ? (
        <p>No sales found yet.</p>
      ) : (
        <table className="w-full border mt-5">
          <thead>
            <tr>
              <th>Book</th>
              <th>Buyer</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((s) => (
              <tr key={s._id} className="text-center border-t">
                <td>{s.ebookTitle}</td>
                <td>{s.readerEmail}</td>
                <td>{s.price}</td>
                <td>{new Date(s.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}