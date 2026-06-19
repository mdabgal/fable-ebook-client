import { FaMoneyBillWave } from "react-icons/fa";

export default function TransactionsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        <FaMoneyBillWave className="text-orange-500" />
        Transactions
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <p>Payment history will appear here.</p>
      </div>
    </div>
  );
}