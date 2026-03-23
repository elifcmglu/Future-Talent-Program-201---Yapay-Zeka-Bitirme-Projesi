import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { PageShell } from '../components/PageShell'
import { DateNavigator } from '../components/DateNavigator'
import { getMenuByDate } from '../services/menuService'
import { getTodayDateKey } from '../utils/date'
import type { DailyMenu } from '../types/menu'
import { MenuCard } from '../components/MenuCard'
import { logError } from '../services/logger'

export const VisitorPage = () => {
  const [selectedDate, setSelectedDate] = useState(getTodayDateKey())
  const [menu, setMenu] = useState<DailyMenu | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const totalKcal = useMemo(() => {
    if (!menu) {
      return 0
    }

    return menu.items.reduce((acc, item) => acc + item.kcal, 0)
  }, [menu])

  useEffect(() => {
    const handleFetchMenu = async () => {
      setIsLoading(true)
      setErrorMessage('')
      try {
        const result = await getMenuByDate(selectedDate)
        setMenu(result)
      } catch (error) {
        setMenu(null)
        setErrorMessage('Menu verisi alinirken hata olustu')
        logError('Ziyaretci menu yukleme hatasi', { error: String(error), selectedDate })
      } finally {
        setIsLoading(false)
      }
    }

    handleFetchMenu()
  }, [selectedDate])

  return (
    <PageShell
      title="Yemekhane Menü Uygulaması"
      description="Gunun menusu, kalori toplami ve alerjen bilgileri"
    >
      <DateNavigator dateKey={selectedDate} onChange={setSelectedDate} />

      <section className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-base font-medium text-slate-900">Bugünün özeti</h2>
        {isLoading ? (
          <p className="mt-2 text-sm text-slate-600">Menu yukleniyor...</p>
        ) : errorMessage ? (
          <p className="mt-2 text-sm text-rose-600">{errorMessage}</p>
        ) : menu ? (
          <p className="mt-2 text-sm text-slate-600">
            Toplam {menu.items.length} yemek, {totalKcal} kcal
          </p>
        ) : (
          <p className="mt-2 text-sm text-slate-600">Bu tarih icin menu bulunamadi.</p>
        )}
      </section>

      {menu ? (
        <section className="mt-4 space-y-3">
          {menu.items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </section>
      ) : null}

      <div className="mt-4">
        <Link
          to="/admin"
          aria-label="Yönetici paneline git"
          className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          Yönetici paneline git
        </Link>
      </div>
    </PageShell>
  )
}
