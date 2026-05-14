import { useState } from "react";
import { Search } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import EventCard from "../components/EventCard.jsx";
import { events, categories } from "../data/events.js";

export default function EventsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = events.filter((e) => {
    const matchesSearch = e.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || e.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          {/* Page header */}
          <div className="mb-8">
            <p className="text-xs font-syne font-semibold uppercase tracking-widest text-amber-600 mb-1">
              Discover
            </p>
            <h1 className="font-syne font-extrabold text-3xl text-amber-950">
              All Events
            </h1>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-900" />
              <input
                type="text"
                placeholder="Search events..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-amber-200 rounded-xl text-sm font-dm text-amber-950 placeholder:text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-950 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-dm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-amber-950 text-white"
                    : "bg-amber-100 text-amber-600 hover:bg-amber-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-sm font-dm text-amber-700 mb-6">
            {filtered.length} event{filtered.length !== 1 ? "s" : ""} found
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Search className="w-10 h-10 text-amber-700 mb-4" />
              <h3 className="font-syne font-bold text-lg text-amber-950 mb-1">
                No events found
              </h3>
              <p className="font-dm text-amber-700 text-sm">
                Try a different search term or category.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
