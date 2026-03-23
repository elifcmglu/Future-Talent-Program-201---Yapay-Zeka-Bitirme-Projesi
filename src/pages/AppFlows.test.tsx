import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { VisitorPage } from './VisitorPage'
import { AdminPage } from './AdminPage'
import * as menuService from '../services/menuService'

describe('App critical flows', () => {
  it('bugun menusu yuklenir ve ozet gorunur', async () => {
    vi.spyOn(menuService, 'getMenuByDate').mockResolvedValueOnce({
      date: '2026-03-23',
      items: [
        { id: 'a1', name: 'Corba', kcal: 100, allergens: [] },
        { id: 'a2', name: 'Ana yemek', kcal: 400, allergens: [] }
      ]
    })

    render(
      <BrowserRouter>
        <VisitorPage />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/Toplam 2 yemek, 500 kcal/)).toBeInTheDocument()
    })
  })

  it('admin login ve menu kaydetme akisi calisir', async () => {
    const upsertSpy = vi.spyOn(menuService, 'upsertMenu').mockResolvedValueOnce()

    render(
      <BrowserRouter>
        <AdminPage />
      </BrowserRouter>
    )

    fireEvent.change(screen.getByLabelText('Kullanici adi'), { target: { value: 'admin' } })
    fireEvent.change(screen.getByLabelText('Sifre'), { target: { value: '123456' } })
    fireEvent.click(screen.getByRole('button', { name: 'Giris yap' }))

    fireEvent.change(screen.getByLabelText('Yemek adi'), { target: { value: 'Pilav' } })
    fireEvent.change(screen.getByLabelText('Kalori'), { target: { value: '350' } })
    fireEvent.click(screen.getByRole('button', { name: 'Menuyu kaydet' }))

    await waitFor(() => {
      expect(upsertSpy).toHaveBeenCalled()
      expect(screen.getByText('Menu kaydedildi')).toBeInTheDocument()
    })
  })
})
