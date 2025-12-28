import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../components/Footer';
import React from 'react';

describe('Footer', () => {
  test('renderiza los enlaces de navegación', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/Twitter/i)).toBeInTheDocument();
    expect(screen.getByText(/Facebook/i)).toBeInTheDocument();
  });
  test('tiene imágenes con alt correctos', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByAltText(/logo Twitter/i)).toBeInTheDocument();
    expect(screen.getByAltText(/logo Facebook/i)).toBeInTheDocument();
  });
  test('footer tiene rol contentinfo', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
