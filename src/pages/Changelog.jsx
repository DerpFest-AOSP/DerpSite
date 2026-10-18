import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { formatPostDate } from '../data/blog'
import { getSortedChangelog, splitChange } from '../data/changelog'

const Changelog = () => {
  const days = useMemo(() => getSortedChangelog(), [])
  const { hash } = useLocation()
  const [query, setQuery] = useState('')
  const [openDates, setOpenDates] = useState(() => new Set(days.slice(0, 1).map((day) => day.date)))

  const normalizedQuery = query.trim().toLowerCase()
  const visibleDays = useMemo(() => {
    if (!normalizedQuery) return days
    return days
      .map((day) => ({
        ...day,
        changes: day.changes.filter((change) => change.toLowerCase().includes(normalizedQuery)),
      }))
      .filter((day) => day.changes.length > 0)
  }, [days, normalizedQuery])

  const isSearching = normalizedQuery.length > 0
  const allOpen = days.every((day) => openDates.has(day.date))

  useEffect(() => {
    const date = hash.slice(1)
    if (!days.some((day) => day.date === date)) return
    setOpenDates((prev) => new Set(prev).add(date))
    requestAnimationFrame(() => document.getElementById(date)?.scrollIntoView({ block: 'start' }))
  }, [hash, days])

  const toggleDay = (date) => {
    setOpenDates((prev) => {
      const next = new Set(prev)
      if (next.has(date)) next.delete(date)
      else next.add(date)
      return next
    })
  }

  const jumpToDay = (date) => {
    setQuery('')
    setOpenDates((prev) => new Set(prev).add(date))
    window.history.replaceState(null, '', `#${date}`)
    requestAnimationFrame(() => document.getElementById(date)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-8 w-72 h-72 bg-gradient-to-r from-[#33bbff] to-[#1de099] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-8 w-96 h-96 bg-gradient-to-r from-[#1de099] to-[#33bbff] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 py-12 px-4 max-w-6xl mx-auto">
        <header className="mb-10 md:mb-14">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-5">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#33bbff] to-[#1de099] gradient-shift">Changelog</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            Dated changes that have landed in the DerpFest source.
          </p>
        </header>

        <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-10">
          <aside className="hidden lg:block">
            <nav className="sticky top-8" aria-label="Changelog dates">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">Jump to</h2>
              <ul className="space-y-1 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
                {days.map((day) => (
                  <li key={day.date}>
                    <button
                      type="button"
                      onClick={() => jumpToDay(day.date)}
                      className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors duration-200 hover:bg-white/10 ${
                        openDates.has(day.date) ? 'text-white' : 'text-white/60'
                      }`}
                    >
                      <span>{formatPostDate(day.date)}</span>
                      <span className="text-xs text-white/40">{day.changes.length}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="min-w-0">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <label className="relative flex-1">
                <span className="sr-only">Search changes</span>
                <SearchIcon />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search changes, e.g. DerpLauncher or lyrics"
                  className="w-full rounded-2xl bg-white/5 border border-white/10 pl-11 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#33bbff]/60 focus:bg-white/10 transition-colors duration-200"
                />
              </label>
              {!isSearching && (
                <button
                  type="button"
                  onClick={() => setOpenDates(allOpen ? new Set() : new Set(days.map((day) => day.date)))}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors duration-200"
                >
                  {allOpen ? 'Collapse all' : 'Expand all'}
                </button>
              )}
            </div>

            {isSearching && (
              <p className="mb-6 text-sm text-white/50" aria-live="polite">
                {visibleDays.reduce((total, day) => total + day.changes.length, 0)} matching changes across {visibleDays.length} {visibleDays.length === 1 ? 'day' : 'days'}
              </p>
            )}

            <ol className="space-y-4">
              {visibleDays.map((day) => (
                <DayCard
                  key={day.date}
                  day={day}
                  open={isSearching || openDates.has(day.date)}
                  locked={isSearching}
                  onToggle={() => toggleDay(day.date)}
                  highlight={normalizedQuery}
                />
              ))}
            </ol>

            {isSearching && visibleDays.length === 0 && (
              <p className="rounded-3xl bg-white/5 border border-white/10 p-8 text-center text-white/60">
                No changes match “{query.trim()}”.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function DayCard({ day, open, locked, onToggle, highlight }) {
  const components = [...new Set(day.changes.map((change) => splitChange(change).component).filter(Boolean))]
  const panelId = `changes-${day.date}`

  return (
    <li id={day.date} className="scroll-mt-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl overflow-hidden">
      <h2>
        <button
          type="button"
          onClick={onToggle}
          disabled={locked}
          aria-expanded={open}
          aria-controls={panelId}
          className="w-full flex items-start gap-4 p-5 md:p-6 text-left enabled:hover:bg-white/5 transition-colors duration-200"
        >
          <span className="mt-2 h-3 w-3 shrink-0 rounded-full bg-gradient-to-r from-[#33bbff] to-[#1de099]"></span>
          <span className="flex-1 min-w-0">
            <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-xl md:text-2xl font-bold text-white">{formatPostDate(day.date, 'long')}</span>
              <span className="text-sm text-white/50">{day.changes.length} {day.changes.length === 1 ? 'change' : 'changes'}</span>
            </span>
            {!open && components.length > 0 && (
              <span className="mt-2 block text-sm text-white/45 truncate">{components.join(' · ')}</span>
            )}
          </span>
          {!locked && <ChevronIcon open={open} />}
        </button>
      </h2>

      <div id={panelId} className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden" inert={!open}>
          <ul className="space-y-3 px-5 pb-6 md:px-6 md:pb-8 md:pl-[3.25rem]">
            {day.changes.map((change) => {
              const { component, text } = splitChange(change)
              return (
                <li key={change} className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-white/80 leading-relaxed">
                  <span aria-hidden="true" className="text-[#1de099]">•</span>
                  {component && (
                    <span className="rounded-md bg-[#33bbff]/15 border border-[#33bbff]/30 px-2 py-0.5 text-xs font-semibold text-[#33bbff]">
                      <Highlight text={component} query={highlight} />
                    </span>
                  )}
                  <span className="flex-1 min-w-0">
                    <Highlight text={text} query={highlight} />
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </li>
  )
}

function Highlight({ text, query }) {
  if (!query) return text
  const index = text.toLowerCase().indexOf(query)
  if (index === -1) return text
  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded bg-[#1de099]/25 px-0.5 text-white">{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  )
}

function ChevronIcon({ open }) {
  return (
    <svg
      className={`mt-1.5 h-5 w-5 shrink-0 text-white/60 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg
      className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
    </svg>
  )
}

export default Changelog
