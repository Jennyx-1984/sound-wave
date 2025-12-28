import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Construction from '../pages/construction';

import '../css/construction.module.css';
describe('Contenido Construction', () => {
  it('renderiza contenido principal, párrafo y div', () => {
    const { container } = render(<Construction />);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText(/under construction/i)).toBeInTheDocument();
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
