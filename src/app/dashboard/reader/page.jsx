import { FaBookReader, FaHeart, FaHistory } from "react-icons/fa";

export default function ReaderDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        📖 Reader Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <FaBookReader className="text-4xl text-emerald-500 mb-3" />
          <h2 className="text-xl font-bold">Books Read</h2>
          <p className="text-slate-500">Track your reading progress</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <FaHeart className="text-4xl text-red-500 mb-3" />
          <h2 className="text-xl font-bold">Favorites</h2>
          <p className="text-slate-500">Saved ebooks collection</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <FaHistory className="text-4xl text-blue-500 mb-3" />
          <h2 className="text-xl font-bold">History</h2>
          <p className="text-slate-500">Reading activity</p>
        </div>

      </div>
    </div>
  );
}