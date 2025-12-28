import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loading from '../components/Loading';

describe('Loading component', () => {
  it('renders loading container with logo and text', () => {
    render(<Loading />);
    expect(document.querySelector('.loading')).toBeInTheDocument();
    expect(screen.getByAltText(/logo sound wave/i)).toBeInTheDocument();
    expect(screen.getByText(/soundwave/i)).toBeInTheDocument();
  });
});
