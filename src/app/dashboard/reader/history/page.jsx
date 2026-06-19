import { FaHistory } from "react-icons/fa";

export default function HistoryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        <FaHistory className="text-blue-500" />
        Reading History
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <p>Your reading history will appear here.</p>
      </div>
    </div>
  );
}