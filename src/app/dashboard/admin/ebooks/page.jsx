import { FaBook } from "react-icons/fa";

export default function EbooksPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        <FaBook className="text-emerald-500" />
        All Ebooks
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <p>All ebooks will appear here.</p>
      </div>
    </div>
  );
}