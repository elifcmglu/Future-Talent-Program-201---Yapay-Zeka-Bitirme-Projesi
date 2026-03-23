import { getShiftedDateKey, getTodayDateKey } from '../utils/date'
import type { DailyMenu } from '../types/menu'

const sampleMenus: Omit<DailyMenu, 'date'>[] = [
  {
    items: [
      { id: 'm1-i1', name: 'Mercimek corbasi', kcal: 210, allergens: [] },
      { id: 'm1-i2', name: 'Tavuk sote', kcal: 460, allergens: [] },
      { id: 'm1-i3', name: 'Pirinç pilavi', kcal: 320, allergens: ['gluten'] }
    ]
  },
  {
    items: [
      { id: 'm2-i1', name: 'Domates corbasi', kcal: 190, allergens: ['milk'] },
      { id: 'm2-i2', name: 'Etli nohut', kcal: 480, allergens: [] },
      { id: 'm2-i3', name: 'Coban salata', kcal: 110, allergens: [] }
    ]
  },
  {
    items: [
      { id: 'm3-i1', name: 'Ezogelin corbasi', kcal: 220, allergens: ['gluten'] },
      { id: 'm3-i2', name: 'Izgara kofte', kcal: 520, allergens: ['egg'] },
      { id: 'm3-i3', name: 'Yogurt', kcal: 140, allergens: ['milk'] }
    ]
  },
  {
    items: [
      { id: 'm4-i1', name: 'Sebze corbasi', kcal: 170, allergens: [] },
      { id: 'm4-i2', name: 'Kuru fasulye', kcal: 430, allergens: [] },
      { id: 'm4-i3', name: 'Bulgur pilavi', kcal: 300, allergens: ['gluten'] }
    ]
  },
  {
    items: [
      { id: 'm5-i1', name: 'Yayla corbasi', kcal: 230, allergens: ['milk'] },
      { id: 'm5-i2', name: 'Firinda tavuk', kcal: 470, allergens: [] },
      { id: 'm5-i3', name: 'Makarna', kcal: 360, allergens: ['gluten', 'egg'] }
    ]
  },
  {
    items: [
      { id: 'm6-i1', name: 'Tarhana corbasi', kcal: 210, allergens: ['gluten'] },
      { id: 'm6-i2', name: 'Taze fasulye', kcal: 290, allergens: [] },
      { id: 'm6-i3', name: 'Cacik', kcal: 120, allergens: ['milk'] }
    ]
  },
  {
    items: [
      { id: 'm7-i1', name: 'Sehriye corbasi', kcal: 200, allergens: ['gluten'] },
      { id: 'm7-i2', name: 'Tas kebabi', kcal: 540, allergens: [] },
      { id: 'm7-i3', name: 'Revani', kcal: 390, allergens: ['gluten', 'egg', 'milk'] }
    ]
  }
]

export const createWeeklySeedMenus = () => {
  const today = getTodayDateKey()
  return sampleMenus.reduce(
    (acc, menu, index) => {
      const date = getShiftedDateKey(today, index)
      acc[date] = {
        date,
        items: menu.items.map((item) => ({ ...item }))
      }
      return acc
    },
    {} as Record<string, DailyMenu>
  )
}
