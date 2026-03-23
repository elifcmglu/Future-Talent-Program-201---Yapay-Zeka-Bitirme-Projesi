export type AllergenKey = 'gluten' | 'milk' | 'egg'

export type MenuItem = {
  id: string
  name: string
  kcal: number
  allergens: AllergenKey[]
}

export type DailyMenu = {
  date: string
  items: MenuItem[]
}

export const allergenLabelMap: Record<AllergenKey, string> = {
  gluten: 'Gluten',
  milk: 'Sut',
  egg: 'Yumurta'
}

export const allergenEmojiMap: Record<AllergenKey, string> = {
  gluten: '🌾',
  milk: '🥛',
  egg: '🥚'
}
