

"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminEbooksPage() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = authClient.useSession();
  const [deleteId, setDeleteId] = useState(null);
const [deleteLoading, setDeleteLoading] = useState(false);

const token = session?.session?.token;



  const fetchEbooks = async () => {
    try {
        if (!token) return;
      setLoading(true);

     const res = await fetch(
  "http://localhost:5000/admin/ebooks",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      const data = await res.json();

          console.log("ADMIN EBOOKS DATA:", data); 

    setEbooks(Array.isArray(data) ? data : data.data || []);

console.log("ebooks:", ebooks);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEbooks();
  }, [token]);


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



// const deleteBook = async (id) => {
//   const ok = confirm("Delete this ebook?");
//   if (!ok) return;

//   try {
//     const res = await fetch(`http://localhost:5000/ebooks/${id}`, {
//       method: "DELETE",
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     });

//     if (!res.ok) {
//       throw new Error("Delete failed");
//     }

//     toast.success("Ebook deleted successfully");

//     fetchEbooks();
//   } catch (error) {
//     toast.error("Failed to delete ebook");
//   }
// };



const deleteBook = async () => {
  try {
    setDeleteLoading(true);

    const res = await fetch(`http://localhost:5000/ebooks/${deleteId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Delete failed");
    }

    toast.success("Ebook deleted successfully ");

    setDeleteId(null);
    fetchEbooks();
  } catch (error) {
    toast.error(error.message || "Failed to delete ebook ");
  } finally {
    setDeleteLoading(false);
  }
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
           All Ebooks
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
                    onClick={() => setDeleteId(book._id)}
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
    



{deleteId && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    
    <div className="bg-white rounded-xl shadow-lg p-6 w-[320px]">

      <h2 className="text-lg font-bold text-gray-800 mb-2">
        Delete Ebook?
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-2">

        <button
          onClick={() => setDeleteId(null)}
          className="px-3 py-1 text-sm rounded bg-gray-200"
        >
          Cancel
        </button>

        <button
          onClick={deleteBook}
          disabled={deleteLoading}
          className="px-3 py-1 text-sm rounded bg-red-500 text-white"
        >
          {deleteLoading ? "Deleting..." : "Delete"}
        </button>

      </div>

    </div>

  </div>


  )}
  </div>

  );
}

