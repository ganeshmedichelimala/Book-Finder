# 📚 Book Finder (React + Vite + Tailwind)

A fast, clean Book Finder that uses the **Google Books API**.

## ✨ Features

- 🔍 Search by title, author, or keyword
- 📖 Grid of results with thumbnail, title, and authors
- 🔗 Preview link to open the book on Google Books
- ⏭️ Pagination via a "Load More" button
- ⏳ Loading, error, and empty states
- 📱 Responsive, modern UI with Tailwind CSS

## 🚀 Live Demo

👉 [Book Finder](https://book-finder-eight-puce.vercel.app/)

## 🛠️ Tech Stack

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Books API](https://developers.google.com/books/docs/v1/using)

## ⚡ Run locally

```bash
npm install
npm run dev
```

## 🏗️ Build

```bash
npm run build
npm run preview
```

## 🌍 Deployment

### Vercel

- Import the repository
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

### Netlify

- Connect repo or drag & drop the `dist` folder after `npm run build`
- Build command: `npm run build`
- Publish directory: `dist`

## 🔌 API

Endpoint used:

```
https://www.googleapis.com/books/v1/volumes?q=<SEARCH_TERM>&startIndex=<N>&maxResults=20
```
