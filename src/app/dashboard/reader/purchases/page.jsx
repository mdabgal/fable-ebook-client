// "use client";

// import { authClient } from "@/lib/auth-client";
// import { useEffect, useState } from "react";

// export default function PurchasesPage() {
//   const [purchases, setPurchases] = useState([]);



//  const { data: session } = authClient.useSession();
//    const [history, setHistory] = useState([]);
 
//    useEffect(() => {
//      const getHistory = async () => {
//        if (!session) return;
 
//        // const token = session?.data?.access_token; // আগে console.log(session) দিয়ে verify করো
 
//        const res = await fetch(
//          `http://localhost:5000/my-purchase/${session?.user?.email}`,
//          // {
//          //   headers: {
//          //     Authorization: `Bearer ${token}`,
//          //   },
//          // }
//        );
 
//        const data = await res.json();
//        console.log(data)
//        setHistory(data);
//      };
 
//      getHistory();
//    }, [session]);
//  console.log(history)

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">
//         My Purchases
//       </h1>

//       <div className="bg-white p-6 rounded-xl shadow">
//         {purchases.length === 0 ? (
//           <p>No purchases found</p>
//         ) : (
//           purchases.map((item) => (
//             <div
//               key={item._id}
//               className="border-b py-3"
//             >
//               <p>Book ID: {item.bookId}</p>
//               <p>Price: ${item.amount}</p>
//               <p>
//                 Date:{" "}
//                 {new Date(item.date).toLocaleDateString()}
//               </p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState([]);

  const { data: session } = authClient.useSession();

  useEffect(() => {
    const getHistory = async () => {
      if (!session) return;

      const res = await fetch(
        `http://localhost:5000/my-purchase/${session?.user?.email}`
      );

      const data = await res.json();
      console.log(data);

      setPurchases(data);
    };

    getHistory();
  }, [session]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Purchases</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        {purchases.length === 0 ? (
          <p>No purchases found</p>
        ) : (
          purchases.map((item) => (
            <div key={item._id} className="border-b py-3">
              <p>Book ID: {item.bookId}</p>
              <p>Price: ${item.amount}</p>
              <p>
                Date: {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}