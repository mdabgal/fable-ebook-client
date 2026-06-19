import { FaShoppingCart } from "react-icons/fa";

export default function PurchasesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        <FaShoppingCart className="text-emerald-500" />
        My Purchases
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <p>Your purchased ebooks will appear here.</p>
      </div>
    </div>
  );
}