import React, { useState, useMemo } from 'react'

const PHASE_LABELS = {
  period: { label: 'Period', color: 'bg-rose-500' },
  follicular: { label: 'Follicular', color: 'bg-sky-500' },
  ovulation: { label: 'Ovulation', color: 'bg-emerald-500' },
  luteal: { label: 'Luteal', color: 'bg-amber-500' },
}

function CycleCalculator({ backendUrl, onPhaseChange }) {
  const [cycleStart, setCycleStart] = useState('')
  const [cycleLength, setCycleLength] = useState(28)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const phaseInfo = result ? PHASE_LABELS[result.phase] : null

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${backendUrl}/api/cycle/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cycle_start: cycleStart, cycle_length: Number(cycleLength) }),
      })
      if (!res.ok) throw new Error('Failed to calculate')
      const data = await res.json()
      setResult(data)
      onPhaseChange?.(data.phase)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6 md:p-8">
      <h2 className="text-xl font-bold text-white mb-4">Cycle Checker</h2>
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Last period start</label>
          <input type="date" className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg px-3 py-2"
            value={cycleStart} onChange={(e) => setCycleStart(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Average cycle length</label>
          <input type="number" min={21} max={35} className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg px-3 py-2"
            value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} />
        </div>
        <div className="flex items-end">
          <button disabled={loading} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50">
            {loading ? 'Checking...' : 'Calculate'}
          </button>
        </div>
      </form>

      {error && <p className="text-rose-400 mt-3">{error}</p>}

      {result && (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="bg-slate-900/70 rounded-xl p-4 border border-slate-700">
            <p className="text-sm text-blue-200/80">Today</p>
            <p className="text-2xl font-bold text-white">Day {result.day_in_cycle}</p>
          </div>
          <div className="bg-slate-900/70 rounded-xl p-4 border border-slate-700">
            <p className="text-sm text-blue-200/80">Phase</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${phaseInfo?.color}`}></span>
              <p className="text-2xl font-bold text-white">{PHASE_LABELS[result.phase].label}</p>
            </div>
          </div>
          <div className="bg-slate-900/70 rounded-xl p-4 border border-slate-700">
            <p className="text-sm text-blue-200/80">Next period starts</p>
            <p className="text-2xl font-bold text-white">{result.next_period_start}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default CycleCalculator
