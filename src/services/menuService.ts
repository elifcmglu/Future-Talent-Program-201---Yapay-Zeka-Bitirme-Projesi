import type { DailyMenu } from '../types/menu'
import { createWeeklySeedMenus } from './menuSeed'
import { db, isFirebaseEnabled } from './firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { logError, logInfo } from './logger'

const storageKey = 'campus-eating-menus'
const cacheTtlMs = 1000 * 60 * 2
const memoryCache = new Map<string, { expiresAt: number; menu: DailyMenu | null }>()
const didSeedKey = 'campus-eating-seeded'

const getCachedMenu = (date: string) => {
  const cacheValue = memoryCache.get(date)
  if (!cacheValue) {
    return undefined
  }

  if (Date.now() > cacheValue.expiresAt) {
    memoryCache.delete(date)
    return undefined
  }

  return cacheValue.menu
}

const setCachedMenu = (date: string, menu: DailyMenu | null) => {
  memoryCache.set(date, {
    expiresAt: Date.now() + cacheTtlMs,
    menu
  })
}

export const getMenuByDate = async (date: string) => {
  const cachedMenu = getCachedMenu(date)
  if (typeof cachedMenu !== 'undefined') {
    return cachedMenu
  }

  await ensureSeedData()

  if (isFirebaseEnabled && db) {
    try {
      const snapshot = await getDoc(doc(db, 'menus', date))
      const menu = snapshot.exists() ? (snapshot.data() as DailyMenu) : null
      setCachedMenu(date, menu)
      return menu
    } catch (error) {
      logError('Firebase menu okuma hatasi', { date, error: String(error) })
    }
  }

  const menus = getAllMenusSync()
  const menu = menus[date] ?? null
  setCachedMenu(date, menu)
  return menu
}

export const upsertMenu = async (menu: DailyMenu) => {
  await ensureSeedData()

  if (isFirebaseEnabled && db) {
    try {
      await setDoc(doc(db, 'menus', menu.date), menu)
      setCachedMenu(menu.date, menu)
      logInfo('Firebase menu kaydi basarili', { date: menu.date })
      return
    } catch (error) {
      logError('Firebase menu kaydi hatasi', { date: menu.date, error: String(error) })
    }
  }

  const menus = getAllMenusSync()
  menus[menu.date] = menu
  setAllMenusSync(menus)
  setCachedMenu(menu.date, menu)
  logInfo('Local menu kaydi basarili', { date: menu.date })
}

const getAllMenusSync = () => {
  const rawValue = localStorage.getItem(storageKey)

  if (!rawValue) {
    return {} as Record<string, DailyMenu>
  }

  try {
    return JSON.parse(rawValue) as Record<string, DailyMenu>
  } catch {
    return {}
  }
}

const setAllMenusSync = (menus: Record<string, DailyMenu>) => {
  localStorage.setItem(storageKey, JSON.stringify(menus))
}

const ensureSeedData = async () => {
  if (localStorage.getItem(didSeedKey) === '1') {
    return
  }

  const currentMenus = getAllMenusSync()
  if (Object.keys(currentMenus).length > 0) {
    localStorage.setItem(didSeedKey, '1')
    return
  }

  const seededMenus = createWeeklySeedMenus()
  setAllMenusSync(seededMenus)
  localStorage.setItem(didSeedKey, '1')
  logInfo('Haftalik seed veri yuklendi', { days: Object.keys(seededMenus).length })
}
