import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { DateNavigator } from './DateNavigator'

describe('DateNavigator', () => {
  it('ileri geri butonlari ve date picker ile tarihi gunceller', () => {
    const handleChange = vi.fn()

    render(<DateNavigator dateKey="2026-03-23" onChange={handleChange} />)

    fireEvent.click(screen.getByRole('button', { name: 'Onceki gun' }))
    fireEvent.click(screen.getByRole('button', { name: 'Sonraki gun' }))
    fireEvent.change(screen.getByLabelText('Tarih sec'), { target: { value: '2026-03-30' } })

    expect(handleChange).toHaveBeenCalled()
    expect(handleChange).toHaveBeenCalledWith('2026-03-30')
  })
})
