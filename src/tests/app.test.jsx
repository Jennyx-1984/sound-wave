import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '../App';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Discover from '../pages/discover';
import Join from '../pages/join';

vi.mock('../components/Loading', () => ({
  default: () => <div>Loading</div>,
}));
vi.mock('../components/Header', () => ({
  default: () => <header>Header</header>,
}));
vi.mock('../pages/presentacion', () => ({
  default: () => <div>Presentacion</div>,
}));
vi.mock('../pages/discover', () => ({
  default: () => <div>Discover</div>,
}));
vi.mock('../pages/join', () => ({
  default: () => <div>Join Us</div>,
}));
vi.mock('../pages/construction', () => ({
  default: () => <div>Under Construction</div>,
}));
vi.mock('../pages/submit', () => ({
  default: () => <div>Submit</div>,
}));
vi.mock('../layouts/MainLayout', () => ({
  default: ({ children }) => <div>Layout {children}</div>,
}));
describe('App component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it('muestra Loading inicialmente', () => {
    render(<App />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
  it('renderiza Presentacion después del timeout', () => {
    render(<App />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(screen.getByText(/Presentacion/i)).toBeInTheDocument();
    expect(screen.getByText(/Header/i)).toBeInTheDocument();
  });
  it('renderiza Discover page usando MemoryRouter', () => {
    render(
    <MemoryRouter initialEntries={['/discover']}>
        <Routes>
            <Route path="/discover" element={<Discover />} />
        </Routes>
    </MemoryRouter>
);
    expect(screen.getByText(/Discover/i)).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(2500);
    });

    expect(screen.getByText(/Discover/i)).toBeInTheDocument();
  });
  it('renderiza Join page usando MemoryRouter', () => {
    render(
    <MemoryRouter initialEntries={['/join']}>
        <Routes>
            <Route path="/join" element={<Join />} />
        </Routes>
    </MemoryRouter>
    );
    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(screen.getByText(/Join Us/i)).toBeInTheDocument();
  });
});
