"use client";

export default function TopWriters() {
  const writers = [
    { id: 1, name: "John Doe", books: 12 },
    { id: 2, name: "Sarah Khan", books: 20 },
    { id: 3, name: "Alex Roy", books: 8 },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-10">
          Top Writers
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {writers.map((writer) => (
            <div
              key={writer.id}
              className="bg-slate-50 p-6 rounded-xl text-center shadow hover:shadow-lg transition"
            >

              {/* Avatar */}
              <div className="w-16 h-16 mx-auto bg-emerald-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
                {writer.name.charAt(0)}
              </div>

              {/* Name */}
              <h3 className="mt-4 text-lg font-semibold text-slate-800">
                {writer.name}
              </h3>

              {/* Books */}
              <p className="text-sm text-slate-500 mt-1">
                📚 {writer.books} Books
              </p>

              <button className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                View Profile
              </button>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}