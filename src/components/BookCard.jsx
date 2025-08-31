import React from "react";

export default function BookCard({ book }) {
  const authors = book.authors?.slice(0, 3).join(", ") || "Unknown";
  const href = book.previewLink || "#";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="card p-3 hover:ring-2 hover:ring-brand-500 transition block"
    >
      <div className="aspect-[3/4] w-full bg-slate-800 rounded-xl overflow-hidden mb-3 flex items-center justify-center">
        {book.thumbnail ? (
          <img
            src={book.thumbnail}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-slate-500 text-sm">No cover</span>
        )}
      </div>
      <div className="space-y-1">
        <div className="font-semibold line-clamp-2">{book.title}</div>
        <div className="text-sm text-slate-400 line-clamp-1">{authors}</div>
        {book.previewLink && (
          <div className="text-xs text-brand-400">Preview ↗</div>
        )}
      </div>
    </a>
  );
}
