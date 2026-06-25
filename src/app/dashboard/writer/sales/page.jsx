"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { TableRowSkeleton } from "@/components/Skeleton";

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

        // console.log("Writer Email:", email); // DEBUG

        if (!email) return;

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/writer/sales-history?email=${email}`
        );

        const data = await res.json();

        // console.log("Sales Data:", data); // DEBUG

        setSales(data);
      } catch (err) {
        // console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [session]);

 

  return (
 


<div className="p-10">
  <h1 className="text-2xl font-bold">Sales History</h1>

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
      {loading ? (
        [...Array(5)].map((_, index) => (
          <TableRowSkeleton key={index} />
        ))
      ) : sales.length === 0 ? (
        <tr>
          <td colSpan={4} className="text-center py-8">
            No sales found yet.
          </td>
        </tr>
      ) : (
        sales.map((s) => (
          <tr key={s._id} className="text-center border-t">
            <td>{s.ebookTitle}</td>
            <td>{s.readerEmail}</td>
            <td>{s.price}</td>
            <td>{new Date(s.date).toLocaleString()}</td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>





  );
}