import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Button from '../components/atomic/Button';
import React from 'react';

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})
describe('Button', () => {
  it('renderiza el texto', () => {
    render(
      <MemoryRouter>
        <Button texto="Go to home" BtnClass="btn-primary" path="/" />
      </MemoryRouter>
    )
    expect(screen.getByText('Go to home')).toBeInTheDocument()
  })
  it('tiene la clase correcta', () => {
    render(
      <MemoryRouter>
        <Button texto="Click" BtnClass="btn-test" path="/test" />
      </MemoryRouter>
    )
    const button = screen.getByRole('button')
    expect(button).toHaveClass('btn-test')
  })
  it('navega a la ruta indicada al hacer click', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Button texto="Go" BtnClass="btn" path="/profile" />
      </MemoryRouter>
    )
    await user.click(screen.getByRole('button'))
    expect(mockNavigate).toHaveBeenCalledWith('/profile')
  })
})
