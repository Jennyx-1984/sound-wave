import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Form from '../components/Form';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { checkEmailExists } from '../services/userService.js';


const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock('../services/userService', () => ({
    checkEmailExists: vi.fn((email) => {
      if (email === 'Jennyx1984@gmail.com') {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    }),
  }));

describe('Form component', () => {
  let mockCreateData;

  beforeEach(() => {
  vi.spyOn(window, "alert").mockImplementation(() => {});
  mockCreateData = vi.fn().mockResolvedValue({ err: false, id: '123' });
  mockNavigate.mockClear();
  window.alert.mockClear();
});
  it('Renderiza inputs y button', () => {
    render(
      <MemoryRouter>
        <Form createData={mockCreateData} />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /join now/i })).toBeInTheDocument();
  });
  it('Muestra alert cuando los campos están vacíos', async () => {
    render(
      <MemoryRouter>
        <Form createData={mockCreateData} />
      </MemoryRouter>
    );
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /join now/i }));
    });

    expect(window.alert).toHaveBeenCalledWith('All fields are required');
  });
  it('Llama a createData y navega si el form es valido', async () => {
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
      fireEvent.change(emailInput, { target: { value: 'Margarita@gmail.com' } });
      fireEvent.change(passwordInput, { target: { value: '12345678' } });
      fireEvent.click(button);
    });
    expect(mockCreateData).toHaveBeenCalledWith({
      name: 'Jenny',
      email: 'Margarita@gmail.com',
      password: '12345678',
    });
    expect(mockNavigate).toHaveBeenCalledWith('/submit', { state: { err: false, id: '123' } });
  });
});

describe('Alerta de error', () => {
  let alertMock;
  let mockCreateData;
  beforeEach(() => {
    alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    mockCreateData = vi.fn().mockResolvedValue({ err: true });
  });
  it('Muestra alert "Server error" cuando createData devuelve error', async () => {
    render(
      <MemoryRouter>
        <Form createData={mockCreateData} />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jenny' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'Margarita@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '12345678' } });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /join now/i }));
    } );
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Server error");
    });
    expect(mockCreateData).toHaveBeenCalledWith({
      name: 'Jenny',
      email: 'Margarita@gmail.com',
      password: '12345678',
    });
    alertMock.mockRestore();
        
  });

  describe('Spans de información incorrecta',()=>{
    it("Si el nombre está vacio",()=>{
      render(
        <MemoryRouter>
          <Form createData={mockCreateData} />
        </MemoryRouter>
      );
      const nameInput = screen.getByLabelText(/name/i);
      fireEvent.blur(nameInput);
      expect(screen.getByText("Empty field")).toBeInTheDocument();
    })
    it("Si el nombre tiene un cáracter inválido",()=>{
      render(
        <MemoryRouter>
          <Form createData={mockCreateData} />
        </MemoryRouter>
      );
      const nameInput = screen.getByLabelText(/name/i);
      fireEvent.change(nameInput, { target: { value: '@' } });
      fireEvent.blur(nameInput);
      expect(screen.getByText("Invalid name")).toBeInTheDocument();
    })
    it("Si el nombre tiene menos de 2 caracteres",()=>{
      render(
        <MemoryRouter>
          <Form createData={mockCreateData} />
        </MemoryRouter>
      );
      const nameInput = screen.getByLabelText(/name/i);
      fireEvent.change(nameInput, { target: { value: ' J ' } });
      fireEvent.blur(nameInput);
      expect(screen.getByText("Name must be at least 2 characters long")).toBeInTheDocument();
    })
    it("Si el email está vacío",()=>{
      render(
        <MemoryRouter>
          <Form createData={mockCreateData} />
        </MemoryRouter>
      ); 
      const emailInput = screen.getByLabelText(/email/i);
      fireEvent.blur(emailInput);
      expect(screen.getByText("Empty field")).toBeInTheDocument();
    })
    it("Si el email es inválido",()=>{
      render(
        <MemoryRouter>
          <Form createData={mockCreateData} />
        </MemoryRouter>
      );
      const emailInput = screen.getByLabelText(/email/i);
      fireEvent.change(emailInput, { target: { value: 'Jennygmail.com' } });
      fireEvent.blur(emailInput);
      expect(screen.getByText("Invalid Email")).toBeInTheDocument();
    })
    it("Si el email ya está registrado",async ()=>{
      render(
        <MemoryRouter>
          <Form createData={mockCreateData} />
        </MemoryRouter>
      );
      const emailInput = screen.getByLabelText(/email/i);
      fireEvent.change(emailInput, { target: { value: 'Jennyx1984@gmail.com' } });
      await act(async () => {
        fireEvent.blur(emailInput);
      });
      await waitFor(() => {
        expect(screen.getByText("Email already registered")).toBeInTheDocument();
      });
    })
    it("Si la contraseña está vacía",()=>{
      render(
        <MemoryRouter>
          <Form createData={mockCreateData} />
        </MemoryRouter>
      );
      const passwordInput = screen.getByLabelText(/password/i);
      fireEvent.blur(passwordInput);
      expect(screen.getByText("Empty field")).toBeInTheDocument();
    })
    it("Si la contraseña es menor a 8 caracteres",()=>{
      render(
        <MemoryRouter>
          <Form createData={mockCreateData} />
        </MemoryRouter>
      );
      const passwordInput = screen.getByLabelText(/password/i);
      fireEvent.change(passwordInput, { target: { value: '12345' } });
      fireEvent.blur(passwordInput);
      expect(screen.getByText("Password must be at least 8 characters long")).toBeInTheDocument();
    })
  });
});