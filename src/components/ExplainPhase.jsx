import React, { useEffect, useState } from 'react'

const PHASE_LABELS = {
  period: { label: 'Period', color: 'bg-rose-500' },
  follicular: { label: 'Follicular', color: 'bg-sky-500' },
  ovulation: { label: 'Ovulation', color: 'bg-emerald-500' },
  luteal: { label: 'Luteal', color: 'bg-amber-500' },
}

function ExplainPhase({ backendUrl, phase }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!phase) return
    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${backendUrl}/api/explain?phase=${phase}`)
        if (!res.ok) throw new Error('Failed to load')
        const json = await res.json()
        setData(json)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [phase, backendUrl])

  return (
    <section className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">What's going on?</h2>
        {phase && (
          <div className="flex items-center gap-2">
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${PHASE_LABELS[phase]?.color}`}></span>
            <span className="text-blue-200">{PHASE_LABELS[phase]?.label}</span>
          </div>
        )}
      </div>
      {!phase && <p className="text-blue-300/80">Use the cycle checker to see an explanation here.</p>}
      {loading && <p className="text-blue-300/80">Loading...</p>}
      {error && <p className="text-rose-400">{error}</p>}
      {data && (
        <div>
          <p className="text-white/90 mb-3">{data.summary}</p>
          <ul className="list-disc pl-5 space-y-2 text-blue-100">
            {data.tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default ExplainPhase
