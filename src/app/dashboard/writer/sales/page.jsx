import { FaMoneyBillWave } from "react-icons/fa";

export default function SalesPage() {
  return (
    <div>
    <h1 className="text-2xl font-bold flex items-center gap-2">
  <FaMoneyBillWave className="text-green-600" />
  Sales History
</h1>

      <div className="mt-4 bg-white p-6 rounded-xl shadow">
        <p>No sales data yet</p>
      </div>
    </div>
  );
}