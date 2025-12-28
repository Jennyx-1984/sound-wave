import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Presentacion from '../pages/presentacion';

vi.mock('../components/atomic/Circle', () => ({
  default: ({ id }) => <div data-testid={id}></div>,
}));
vi.mock('../components/atomic/Button', () => ({
  default: ({ texto }) => <button>{texto}</button>,
}));
vi.mock('../css/presentacion.css', () => ({}));
vi.mock('../assets/images/landing-page-girl.png', () => ({
  default: 'mock-image.png',
}));
describe('Presentacion component', () => {
  it('renderiza main, círculos, imagen, título, párrafo y button', () => {
    const { container } = render(<Presentacion />);
    expect(container.querySelector('.present')).toBeInTheDocument();
    expect(screen.getByTestId('circle-one')).toBeInTheDocument();
    expect(screen.getByTestId('circle-two')).toBeInTheDocument();
    expect(screen.getByTestId('circle-three')).toBeInTheDocument();
    expect(screen.getByAltText(/chica escuchando musica/i)).toBeInTheDocument();
    expect(screen.getByText(/feel the music/i)).toBeInTheDocument();
    expect(screen.getByText(/stream over 20 thousand songs/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /join now/i })).toBeInTheDocument();
  });
});
