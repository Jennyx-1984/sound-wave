import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Discover from '../pages/discover';

vi.mock('../components/atomic/ButtonDiscover', () => ({
  default: ({ text }) => <button>{text}</button>,
}));
vi.mock('../css/discover.module.css', () => ({
  default: {
    main_discover: 'main_discover',
    discover: 'discover',
    container_discover: 'container_discover',
    title_discover: 'title_discover',
    field_btn: 'field_btn',
    intro_disc: 'intro_disc',
    field_covers: 'field_covers',
    covers: 'covers',
  },
}));

describe('Contenido de Discover', () => {
  it('renderiza el contenido de main, título, buttons, párrafo y imagen', () => {
    render(<Discover />);
    expect(document.querySelector('.main_discover')).toBeInTheDocument();
    expect(screen.getByText(/discover new music/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /charts/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /albums/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /more/i })).toBeInTheDocument();
    expect(screen.getByText(/by joining you can benefit/i)).toBeInTheDocument();
    expect(screen.getByAltText(/covers/i)).toBeInTheDocument();
  });
});
