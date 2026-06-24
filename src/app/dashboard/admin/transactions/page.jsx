"use client";

import { TableRowSkeleton } from "@/components/Skeleton";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = authClient.useSession();


const token = session?.session?.token;

  const fetchTransactions = async () => {
     if (!token) return;
    try {
      setLoading(true);

     const res = await fetch(
  "http://localhost:5000/admin/transactions",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      const data = await res.json();

      setTransactions(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [token]);


  // if (loading) {
  //   return <p className="p-6 text-gray-500">Loading transactions...</p>;
  // }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
           Transactions
        </h1>
        <p className="text-gray-500 text-sm">
          All payment and purchase history
        </p>
      </div>

      
      <div className="bg-white shadow border rounded-2xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Transaction ID</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">User Email</th>
              <th className="p-3 text-left">Writer Email</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          {/* <tbody>

            {transactions.map((t, index) => (
              <tr
                key={t._id}
                className={`border-t hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >

            
                <td className="p-3 text-xs text-gray-600">
                  {t.transactionId || t._id}
                </td>

         
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full
                      ${
                        t.type === "purchase"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                  >
                    {t.type}
                  </span>
                </td>

          
                <td className="p-3 text-gray-700">
                  {t.userEmail}
                </td>

               
                <td className="p-3 text-gray-700">
                  {t.writerEmail || "N/A"}
                </td>

              
                <td className="p-3 font-semibold text-green-600">
                  ${t.amount}
                </td>

            
                <td className="p-3 text-gray-500">
                  {new Date(t.date).toLocaleDateString()}
                </td>

              </tr>
            ))}

          </tbody> */}


<tbody>

  {loading ? (
    [...Array(8)].map((_, index) => (
      <TableRowSkeleton key={index} />
    ))
  ) : (
    transactions.map((t, index) => (
      <tr
        key={t._id}
        className={`border-t hover:bg-gray-50 ${
          index % 2 === 0 ? "bg-white" : "bg-gray-50"
        }`}
      >
        <td className="p-3 text-xs text-gray-600">
          {t.transactionId || t._id}
        </td>

        <td className="p-3">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              t.type === "purchase"
                ? "bg-blue-100 text-blue-700"
                : "bg-purple-100 text-purple-700"
            }`}
          >
            {t.type}
          </span>
        </td>

        <td className="p-3 text-gray-700">
          {t.userEmail}
        </td>

        <td className="p-3 text-gray-700">
          {t.writerEmail || "N/A"}
        </td>

        <td className="p-3 font-semibold text-green-600">
          ${t.amount}
        </td>

        <td className="p-3 text-gray-500">
          {new Date(t.date).toLocaleDateString()}
        </td>
      </tr>
    ))
  )}

</tbody>



        </table>

      </div>
    </div>
  );
}
