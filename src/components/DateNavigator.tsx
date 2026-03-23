import type { ChangeEvent, KeyboardEvent } from 'react'
import { formatDateLabel, getShiftedDateKey } from '../utils/date'

type DateNavigatorProps = {
  dateKey: string
  onChange: (nextDate: string) => void
}

export const DateNavigator = ({ dateKey, onChange }: DateNavigatorProps) => {
  const handlePreviousDayClick = () => {
    onChange(getShiftedDateKey(dateKey, -1))
  }

  const handleNextDayClick = () => {
    onChange(getShiftedDateKey(dateKey, 1))
  }

  const handleDateInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      return
    }

    onChange(event.target.value)
  }

  const handlePreviousDayKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return
    }

    event.preventDefault()
    handlePreviousDayClick()
  }

  const handleNextDayKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return
    }

    event.preventDefault()
    handleNextDayClick()
  }

  return (
    <section className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          aria-label="Onceki gun"
          onClick={handlePreviousDayClick}
          onKeyDown={handlePreviousDayKeyDown}
          className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
        >
          Geri
        </button>

        <p className="text-center text-sm font-medium text-slate-800">{formatDateLabel(dateKey)}</p>

        <button
          type="button"
          aria-label="Sonraki gun"
          onClick={handleNextDayClick}
          onKeyDown={handleNextDayKeyDown}
          className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
        >
          Ileri
        </button>
      </div>

      <label className="mt-3 block text-sm text-slate-600">
        Tarih sec
        <input
          type="date"
          value={dateKey}
          onChange={handleDateInputChange}
          className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:border-slate-400 focus:outline-none"
        />
      </label>
    </section>
  )
}
