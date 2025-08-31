import React, { useEffect, useRef, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import BookCard from "./components/BookCard.jsx";

const API = "https://www.googleapis.com/books/v1/volumes";
const PAGE_SIZE = 20;

export default function App() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const controller = useRef(null);

  const handleSearch = (term) => {
    if (!term?.trim()) return;
    setQ(term.trim());
    setPage(1);
  };

  useEffect(() => {
    if (!q) return;
    if (controller.current) controller.current.abort();
    controller.current = new AbortController();
    const signal = controller.current.signal;
    const run = async () => {
      try {
        setLoading(true);
        setError("");
        const url = new URL(API);
        url.searchParams.set("q", q);
        url.searchParams.set("startIndex", String((page - 1) * PAGE_SIZE));
        url.searchParams.set("maxResults", String(PAGE_SIZE));
        url.searchParams.set("printType", "books");
        url.searchParams.set("projection", "lite");
        url.searchParams.set(
          "fields",
          "totalItems,items(id,volumeInfo(title,authors,imageLinks/thumbnail,previewLink))"
        );
        const res = await fetch(url.toString(), { signal });
        if (!res.ok) throw new Error("Network error");
        const json = await res.json();
        const mapped = (json.items || []).map((v) => ({
          id: v.id,
          title: v.volumeInfo?.title || "Untitled",
          authors: v.volumeInfo?.authors || [],
          thumbnail: v.volumeInfo?.imageLinks?.thumbnail || null,
          previewLink: v.volumeInfo?.previewLink || null,
        }));
        setTotalItems(json.totalItems || 0);
        setItems((prev) => (page === 1 ? mapped : [...prev, ...mapped]));
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message || "Error");
      } finally {
        setLoading(false);
      }
    };
    run();
    return () => controller.current?.abort();
  }, [q, page]);

  const canLoadMore = items.length < totalItems;

  return (
    <div className="min-h-full">
      <header className="border-b border-slate-800">
        <div className="mx-auto container-max px-4 py-5 flex items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-fuchsia-500"></div>
            <div>
              <div className="font-bold text-lg">Book Finder</div>
              <div className="text-xs text-slate-400">Google Books Search</div>
            </div>
          </div>
          <a
            className="badge"
            href="https://developers.google.com/books"
            target="_blank"
            rel="noreferrer"
          >
            API Docs
          </a>
        </div>
      </header>

      <main className="mx-auto container-max px-4 py-6 space-y-6">
        <div className="card p-4">
          <SearchBar onSearch={handleSearch} loading={loading} />
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="self-center text-sm text-slate-400">
              Results:{" "}
              <span className="font-medium text-slate-200">{totalItems}</span>
            </div>
            {q && (
              <div className="self-center text-sm text-slate-400 col-span-1 md:col-span-3">
                Query: <span className="font-medium text-slate-200">{q}</span>
              </div>
            )}
          </div>
        </div>

        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((b) => (
            <BookCard key={b.id + b.title} book={b} />
          ))}
        </section>

        {error && (
          <div className="card p-6 text-center text-rose-300 border-rose-800">
            Failed to load: {error}
          </div>
        )}
        {!loading && q && items.length === 0 && !error && (
          <div className="card p-6 text-center">
            No books found for this query.
          </div>
        )}

        <div className="flex items-center justify-center py-4">
          {canLoadMore && !loading && !error && (
            <button className="btn" onClick={() => setPage((p) => p + 1)}>
              Load More
            </button>
          )}
          {loading && (
            <div className="inline-flex items-center gap-3 px-4 py-3 border border-slate-800 rounded-xl">
              <div className="w-5 h-5 rounded-full border-2 border-slate-600 border-t-brand-500 animate-spin"></div>
              <span>Loading…</span>
            </div>
          )}
        </div>
      </main>

      <footer className="mx-auto container-max px-4 pb-10 text-xs text-slate-500">
        Data © Google Books
      </footer>
    </div>
  );
}
