import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Join from '../pages/join';

vi.mock('../css/join.module.css', () => ({
  default: {
    main_join: 'main_join',
    container_wrap: 'container_wrap',
    container_text: 'container_text',
    title_join: 'title_join',
    text_color: 'text_color',
    container_form: 'container_form',
  },
}));
vi.mock('../components/atomic/Circle', () => ({
  default: ({ id }) => <div data-testid={id}></div>,
}));

vi.mock('../components/Form', () => ({
  default: ({ createData }) => <form data-testid="form"></form>,
}));

vi.mock('../components/helpers/createData', () => ({
  default: () => ({ createData: vi.fn() }),
}));

describe('Contenido Join', () => {
  it('renderiza main, círcculos, título y form', () => {
    const { container } = render(<Join />);
    expect(container.querySelector('.main_join')).toBeInTheDocument();
    expect(screen.getByTestId('circle-four')).toBeInTheDocument();
    expect(screen.getByTestId('circle-five')).toBeInTheDocument();
    expect(screen.getByText(/join the/i)).toBeInTheDocument();
    expect(screen.getByText(/fun/i)).toBeInTheDocument();
    expect(screen.getByTestId('form')).toBeInTheDocument();
  });
});
