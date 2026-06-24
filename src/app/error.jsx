"use client";

export default function Error({
  error,
  reset,
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-red-600">
        Something went wrong
      </h1>

      <p className="text-gray-500 mt-2">
        An unexpected error occurred.
      </p>

      <button
        onClick={() => reset()}
        className="mt-5 px-4 py-2 bg-emerald-600 text-white rounded-lg"
      >
        Reload
      </button>
    </div>
  );
}