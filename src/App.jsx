import React, { useMemo, useState } from 'react'
import Header from './components/Header'
import CycleCalculator from './components/CycleCalculator'
import ExplainPhase from './components/ExplainPhase'
import Ideas from './components/Ideas'

function App() {
  const backendUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])
  const [phase, setPhase] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06),transparent_50%)]"></div>
      <div className="relative max-w-5xl mx-auto px-4 py-10 md:py-16">
        <Header />

        <div className="grid gap-6 md:grid-cols-2">
          <CycleCalculator backendUrl={backendUrl} onPhaseChange={setPhase} />
          <ExplainPhase backendUrl={backendUrl} phase={phase} />
        </div>

        <div className="mt-6">
          <Ideas backendUrl={backendUrl} phase={phase} />
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://your-shopify-store.example.com" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
          >
            Visit the Shop
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
