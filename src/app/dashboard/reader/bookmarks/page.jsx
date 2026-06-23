"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function BookmarksPage() {
  const { data: session } = authClient.useSession();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!session?.user?.email) return;

      const res = await fetch(
        `http://localhost:5000/bookmarks/${session.user.email}`
      );

      const data = await res.json();
      setBooks(data);
    };

    fetchBookmarks();
  }, [session?.user?.email]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookmarks</h1>

      {books.length === 0 ? (
        <p>No bookmarks found</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {books.map((item) => (
            <div key={item._id} className="border p-3 rounded">

              {/* IMAGE */}
              <img
                src={item.coverImage}
                className="h-40 w-full object-cover rounded"
              />

              <h2 className="font-bold mt-2">{item.ebookName}</h2>
              <p>{item.writer}</p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}