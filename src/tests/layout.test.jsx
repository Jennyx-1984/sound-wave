import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MainLayout from '../layouts/MainLayout';

vi.mock('../components/Header', () => ({ default: () => <div data-testid="header">Header</div> }));
vi.mock('../components/Footer', () => ({ default: () => <div data-testid="footer">Footer</div> }));
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, Outlet: () => <div data-testid="outlet" /> };
});

describe('MainLayout component', () => {
  it('renderiza la estructura con el Header, Outlet y Footer', () => {
    const { container } = render(<MainLayout />);
    expect(screen.getByTestId('main-structure')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});

