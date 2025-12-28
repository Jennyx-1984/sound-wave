import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Form from '../components/Form';
import React from 'react';
import { checkEmailExists } from '../services/userService.js';

vi.mock('../services/userService', () => ({
  checkEmailExists: vi.fn((email) =>
    email === 'Jennyx1984@gmail.com' ? Promise.resolve(true) : Promise.resolve(false)
  ),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});
vi.spyOn(window, 'alert').mockImplementation(() => {});
describe('Validación del Form', () => {
  it('Llama a createData y navega si el form es valido', async () => {
    const mockCreateData = vi.fn().mockResolvedValue({ err: false, id: '123' });
    render(
      <MemoryRouter>
        <Form createData={mockCreateData} />
      </MemoryRouter>
    );
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole('button', { name: /join now/i });
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'Jenny' } });
      fireEvent.blur(nameInput);
      fireEvent.change(emailInput, { target: { value: 'Jenny@gmail.com' } });
      fireEvent.blur(emailInput);
      fireEvent.change(passwordInput, { target: { value: '12345678' } });
      fireEvent.blur(passwordInput);
      fireEvent.click(button);
    });
    expect(mockCreateData).toHaveBeenCalledWith({
      name: 'Jenny',
      email: 'Jenny@gmail.com',
      password: '12345678',
    });
    expect(mockNavigate).toHaveBeenCalledWith('/submit', { state: { err: false, id: '123' } });
  });
});
