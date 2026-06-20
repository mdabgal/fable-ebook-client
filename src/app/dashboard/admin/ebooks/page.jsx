// "use client";

// import { useEffect, useState } from "react";

// export default function AdminEbooksPage() {
//   const [ebooks, setEbooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchEbooks = async () => {
//     try {
//       setLoading(true);

//       const res = await fetch("http://localhost:5000/admin/ebooks");
//       const data = await res.json();

//       setEbooks(data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEbooks();
//   }, []);

//   const updateStatus = async (id, status) => {
//     await fetch(`http://localhost:5000/ebooks/${id}/status`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ status }),
//     });

//     fetchEbooks();
//   };

//   const deleteBook = async (id) => {
//     const confirmDelete = confirm("Delete this ebook?");
//     if (!confirmDelete) return;

//     await fetch(`http://localhost:5000/ebooks/${id}`, {
//       method: "DELETE",
//     });

//     fetchEbooks();
//   };

//   if (loading) return <p className="p-6">Loading ebooks...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">
//         Manage All Ebooks
//       </h1>

//       <div className="overflow-x-auto">
//         <table className="table w-full border">

//           <thead className="bg-gray-100">
//             <tr>
//               <th>Title</th>
//               <th>Writer</th>
//               <th>Price</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {ebooks.map((book) => (
//               <tr key={book._id} className="border-t">

//                 <td>{book.title}</td>

//                 <td>{book.writerEmail || "Unknown"}</td>

//                 <td>${book.price}</td>

//                 <td>
//                   <span
//                     className={
//                       book.status === "published"
//                         ? "text-green-600"
//                         : "text-red-500"
//                     }
//                   >
//                     {book.status}
//                   </span>
//                 </td>

//                 <td className="space-x-2">

//                   <button
//                     onClick={() =>
//                       updateStatus(book._id, "published")
//                     }
//                     className="px-2 py-1 bg-green-500 text-white rounded"
//                   >
//                     Publish
//                   </button>

//                   <button
//                     onClick={() =>
//                       updateStatus(book._id, "unpublished")
//                     }
//                     className="px-2 py-1 bg-yellow-500 text-white rounded"
//                   >
//                     Unpublish
//                   </button>

//                   <button
//                     onClick={() => deleteBook(book._id)}
//                     className="px-2 py-1 bg-red-500 text-white rounded"
//                   >
//                     Delete
//                   </button>

//                 </td>
//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

export default function AdminEbooksPage() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEbooks = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/admin/ebooks");
      const data = await res.json();

      setEbooks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEbooks();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/ebooks/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    fetchEbooks();
  };

  const deleteBook = async (id) => {
    const ok = confirm("Delete this ebook?");
    if (!ok) return;

    await fetch(`http://localhost:5000/ebooks/${id}`, {
      method: "DELETE",
    });

    fetchEbooks();
  };

  if (loading) {
    return (
      <div className="p-10 text-gray-500 text-sm">
        Loading ebooks...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          📚 All Ebooks
        </h1>
        <p className="text-gray-500 text-sm">
          Manage publishing, status and content
        </p>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Writer</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {ebooks.map((book, index) => (
              <tr
                key={book._id}
                className={`border-t hover:bg-gray-50 transition ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >

                <td className="p-3 font-medium text-gray-800">
                  {book.title}
                </td>

                <td className="p-3 text-gray-600">
                  {book.writerEmail || "Unknown"}
                </td>

                <td className="p-3 font-semibold text-gray-700">
                  ${book.price}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      book.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {book.status}
                  </span>
                </td>

                <td className="p-3 flex gap-2 flex-wrap">

                  <button
                    onClick={() =>
                      updateStatus(book._id, "published")
                    }
                    className="px-3 py-1 text-xs rounded-md bg-green-600 text-white hover:bg-green-700"
                  >
                    Publish
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(book._id, "unpublished")
                    }
                    className="px-3 py-1 text-xs rounded-md bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    Unpublish
                  </button>

                  <button
                    onClick={() => deleteBook(book._id)}
                    className="px-3 py-1 text-xs rounded-md bg-red-500 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}