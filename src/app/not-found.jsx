import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
     

      <h1 className="text-4xl font-bold text-slate-800">
        Page Not Found
      </h1>

      <p className="text-slate-500 mt-3">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="mt-6 px-5 py-3 bg-emerald-600 text-white rounded-lg"
      >
        Go Home
      </Link>
    </div>
  );
}