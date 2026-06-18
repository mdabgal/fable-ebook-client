"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EbookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`http://localhost:5000/ebooks/${id}`);
      const data = await res.json();
      setBook(data);
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={book.image}
        className="w-full h-80 object-cover rounded-xl"
      />

      <h1 className="text-3xl font-bold mt-4">{book.title}</h1>

      <p className="text-gray-500 mt-2">By {book.author}</p>

      <p className="text-emerald-600 font-bold mt-3 text-xl">
        ${book.price}
      </p>
    </div>
  );
}