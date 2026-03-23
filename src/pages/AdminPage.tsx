import { Link } from 'react-router-dom'
import { useState, type FormEvent } from 'react'
import { PageShell } from '../components/PageShell'
import type { AllergenKey, DailyMenu, MenuItem } from '../types/menu'
import { allergenLabelMap } from '../types/menu'
import { getTodayDateKey } from '../utils/date'
import { upsertMenu } from '../services/menuService'
import { logError } from '../services/logger'

const defaultUsername = import.meta.env.VITE_ADMIN_USERNAME ?? 'admin'
const defaultPassword = import.meta.env.VITE_ADMIN_PASSWORD ?? '123456'

const allergenValues = Object.keys(allergenLabelMap) as AllergenKey[]

export const AdminPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [date, setDate] = useState(getTodayDateKey())
  const [message, setMessage] = useState('')
  const [items, setItems] = useState<MenuItem[]>([
    { id: crypto.randomUUID(), name: '', kcal: 0, allergens: [] }
  ])

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (username !== defaultUsername || password !== defaultPassword) {
      setMessage('Kullanici adi veya sifre hatali')
      return
    }

    setIsLoggedIn(true)
    setMessage('')
  }

  const handleAddItemClick = () => {
    const nextItem: MenuItem = {
      id: crypto.randomUUID(),
      name: '',
      kcal: 0,
      allergens: []
    }
    setItems((prevItems) => [...prevItems, nextItem])
  }

  const handleDeleteItemClick = (id: string) => {
    if (items.length === 1) {
      return
    }

    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const handleItemNameChange = (id: string, value: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== id) {
          return item
        }
        return { ...item, name: value }
      })
    )
  }

  const handleItemKcalChange = (id: string, value: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== id) {
          return item
        }
        return { ...item, kcal: value }
      })
    )
  }

  const handleAllergenChange = (id: string, allergen: AllergenKey) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== id) {
          return item
        }

        const hasAllergen = item.allergens.includes(allergen)
        if (hasAllergen) {
          return {
            ...item,
            allergens: item.allergens.filter((value) => value !== allergen)
          }
        }

        return { ...item, allergens: [...item.allergens, allergen] }
      })
    )
  }

  const handleMenuSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validItems = items.filter((item) => item.name.trim().length > 0)
    if (validItems.length === 0) {
      setMessage('En az bir yemek adi girilmeli')
      return
    }

    const payload: DailyMenu = {
      date,
      items: validItems
    }

    try {
      await upsertMenu(payload)
      setMessage('Menu kaydedildi')
    } catch (error) {
      setMessage('Menu kaydedilemedi')
      logError('Admin menu kaydetme hatasi', { error: String(error), date })
    }
  }

  if (!isLoggedIn) {
    return (
      <PageShell title="Yonetici Girisi" description="Menu yonetimi icin giris yap">
        <form onSubmit={handleLoginSubmit} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <label className="block text-sm text-slate-700">
            Kullanici adi
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-slate-800 focus:border-slate-400 focus:outline-none"
              aria-label="Kullanici adi"
            />
          </label>

          <label className="mt-3 block text-sm text-slate-700">
            Sifre
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-slate-800 focus:border-slate-400 focus:outline-none"
              aria-label="Sifre"
            />
          </label>

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Giris yap
          </button>
        </form>

        {message ? <p className="mt-3 text-sm text-rose-600">{message}</p> : null}
      </PageShell>
    )
  }

  return (
    <PageShell
      title="Yonetici Paneli"
      description="Tarih bazli menu olustur ve guncelle"
    >
      <form onSubmit={handleMenuSave} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
        <label className="block text-sm text-slate-700">
          Tarih
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-slate-800 focus:border-slate-400 focus:outline-none"
          />
        </label>

        <div className="mt-4 space-y-4">
          {items.map((item, index) => (
            <article key={item.id} className="rounded-lg border border-slate-200 p-3">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-800">Yemek {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => handleDeleteItemClick(item.id)}
                  className="rounded-md border border-rose-200 px-2 py-1 text-xs text-rose-600 hover:bg-rose-50"
                >
                  Sil
                </button>
              </div>

              <label className="block text-sm text-slate-700">
                Yemek adi
                <input
                  value={item.name}
                  onChange={(event) => handleItemNameChange(item.id, event.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-slate-800 focus:border-slate-400 focus:outline-none"
                />
              </label>

              <label className="mt-2 block text-sm text-slate-700">
                Kalori
                <input
                  type="number"
                  min={0}
                  value={item.kcal}
                  onChange={(event) => handleItemKcalChange(item.id, Number(event.target.value))}
                  className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-slate-800 focus:border-slate-400 focus:outline-none"
                />
              </label>

              <div className="mt-2">
                <p className="text-sm text-slate-700">Alerjenler</p>
                <div className="mt-1 flex flex-wrap gap-3">
                  {allergenValues.map((allergen) => (
                    <label key={`${item.id}-${allergen}`} className="inline-flex items-center gap-2 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={item.allergens.includes(allergen)}
                        onChange={() => handleAllergenChange(item.id, allergen)}
                      />
                      {allergenLabelMap[allergen]}
                    </label>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddItemClick}
          className="mt-4 rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Yemek satiri ekle
        </button>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Menuyu kaydet
          </button>
        </div>
      </form>

      {message ? <p className="mt-3 text-sm text-emerald-700">{message}</p> : null}

      <div className="mt-4">
        <Link
          to="/"
          aria-label="Ana sayfaya don"
          className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          Ana sayfaya don
        </Link>
      </div>
    </PageShell>
  )
}
