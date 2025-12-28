import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from '../components/Header';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate, Link: ({ children, to }) => <a href={to}>{children}</a> };
});
describe('Header component', () => {
  it('renderiza el logo, título y navegación', () => {
    render(<Header />);
    expect(screen.getByAltText(/logo sound wave/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /soundwave/i })).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /discover/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /join/i })).toBeInTheDocument();
  });
});
