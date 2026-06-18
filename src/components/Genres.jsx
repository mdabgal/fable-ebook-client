"use client";

export default function Genres() {
  const genres = [
    "Fiction",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Fantasy",
    "Horror",
    "Biography",
    "Self-Help",
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-10">
          Browse by Genres
        </h2>

        {/* Grid */}
        <div className="flex flex-wrap justify-center gap-4">

          {genres.map((genre, index) => (
            <button
              key={index}
              className="px-5 py-2 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-emerald-600 hover:text-white transition"
            >
              {genre}
            </button>
          ))}

        </div>

      </div>
    </section>
  );
}