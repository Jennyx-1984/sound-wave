import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import ButtonDiscover from '../components/atomic/ButtonDiscover'
import React from 'react'

describe('ButtonDiscover', () => {
  const props = {
    text: 'Charts',
    image: '/assets/images/microphone.svg',
    path: '/construction'
  }
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <ButtonDiscover {...props} />
      </MemoryRouter>
    )
  it('muestra el texto correctamente', () => {
    renderComponent()
    expect(screen.getByText('Charts')).toBeInTheDocument()
  })
  it('muestra la imagen con el alt correcto', () => {
    renderComponent()
    const image = screen.getByRole('img', { name: 'Charts' })
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/assets/images/microphone.svg')
  })
  it('el link apunta a la ruta correcta', () => {
    renderComponent()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/construction')
  })
  it('contiene un botón clickeable', () => {
    renderComponent()
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })
})
