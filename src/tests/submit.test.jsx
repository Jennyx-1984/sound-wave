import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Submit from '../pages/submit';
import { within } from '@testing-library/react';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');  
  return {
    ...actual,
    Link: ({ children, to }) => <a href={to}>{children}</a>,
    useLocation: () => ({
      state: {
        name: 'Jenny',
        email: 'jenny@gmail.com',
        password: 'password123'
      },
    }),
  };
});

vi.mock('../css/submit.module.css', () => ({
  default: {
    container_submit: 'container_submit',
    container_results: 'container_results',
    title_submit: 'title_submit',
    color_app: 'color_app',
    welcome: 'welcome',
    result: 'result',
    button_field: 'button_field',
    back: 'back',
  },
}));

describe('Contenido de Submit', () => {
  it('Renderiza mensaje de agradecimiento y la información registrada', () => {
    render(<Submit />);
    const welcomeParagraph = screen.getByText(/welcome to/i).closest('p');
    const soundwaves = screen.getAllByText(/soundwave/i);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(soundwaves[0]).toBeInTheDocument();
    expect(within(welcomeParagraph).getByText('Jenny')).toBeInTheDocument();
    expect(soundwaves[1]).toBeInTheDocument();
    expect(screen.getByText(/Jenny@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/password123/i)).toBeInTheDocument();
    expect(screen.getByText(/registering/i)).toBeInTheDocument();
    const backLink = screen.getByRole('link', { name: /back/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/');
  });
});
