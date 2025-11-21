import React, { useEffect, useState } from 'react'

function Ideas({ backendUrl, phase }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const url = phase ? `${backendUrl}/api/ideas?phase=${phase}` : `${backendUrl}/api/ideas`
    setLoading(true)
    setError(null)
    fetch(url)
      .then(r => r.json())
      .then(data => setItems(data.items || []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [backendUrl, phase])

  return (
    <section className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">What to do</h2>
        <select value={phase || ''} onChange={() => {}} className="hidden"/>
      </div>
      {loading && <p className="text-blue-300/80">Loading ideas...</p>}
      {error && <p className="text-rose-400">{error}</p>}
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((it, i) => (
          <div key={i} className="bg-slate-900/70 rounded-xl p-4 border border-slate-700">
            <p className="text-blue-300 text-xs uppercase tracking-wide mb-1">{it.phase}</p>
            <p className="text-white font-semibold">{it.title}</p>
            <p className="text-blue-200/90 text-sm mt-1">{it.description}</p>
          </div>
        ))}
        {(!loading && items.length === 0) && (
          <p className="text-blue-300/80">No ideas yet.</p>
        )}
      </div>
    </section>
  )}

export default Ideas
