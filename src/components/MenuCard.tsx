import { allergenEmojiMap, allergenLabelMap, type MenuItem } from '../types/menu'

type MenuCardProps = {
  item: MenuItem
}

export const MenuCard = ({ item }: MenuCardProps) => {
  return (
    <article
      className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
      tabIndex={0}
      aria-label={`${item.name} yemek karti`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
        <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
          {item.kcal} kcal
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {item.allergens.length === 0 ? (
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">Alerjen yok</span>
        ) : (
          item.allergens.map((allergen) => {
            return (
              <span
                key={`${item.id}-${allergen}`}
                className="rounded-md bg-amber-50 px-2 py-1 text-xs text-amber-700"
              >
                {allergenEmojiMap[allergen]} {allergenLabelMap[allergen]}
              </span>
            )
          })
        )}
      </div>
    </article>
  )
}
