import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MenuCard } from './MenuCard'

describe('MenuCard', () => {
  it('yemek adini kaloriyi ve alerjenleri gosterir', () => {
    render(
      <MenuCard
        item={{
          id: 'item-1',
          name: 'Tavuk sote',
          kcal: 450,
          allergens: ['egg', 'milk']
        }}
      />
    )

    expect(screen.getByText('Tavuk sote')).toBeInTheDocument()
    expect(screen.getByText('450 kcal')).toBeInTheDocument()
    expect(screen.getByText(/Yumurta/)).toBeInTheDocument()
    expect(screen.getByText(/Sut/)).toBeInTheDocument()
  })
})
