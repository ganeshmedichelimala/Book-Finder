import React, { useState } from 'react'

export default function SearchBar({ onSearch, loading }) {
  const [term, setTerm] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch?.(term)
  }

  return (
    <form onSubmit={submit} className="flex gap-2 flex-col md:flex-row">
      <input
        className="input flex-1"
        placeholder="Search books by title…"
        value={term}
        onChange={e => setTerm(e.target.value)}
      />
      <button className="btn" disabled={loading} type="submit">
        {loading ? 'Searching…' : 'Search'}
      </button>
    </form>
  )
}
