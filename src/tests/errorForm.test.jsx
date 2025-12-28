import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Form from '../components/Form';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';


describe("Si el formulario tiene errores, muestra alert al hacer submit", () => { 
    let alertMock;

    beforeEach(() => {
        alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    }); 
    it("Muestra alert si hay error en props al hacer submit", async () => { 
        render(
            <MemoryRouter>
                <Form error={true} errorMessage="Error de prueba" />
            </MemoryRouter>
        );  
        const nameInput = screen.getByLabelText(/name/i);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole('button', { name: /Join Now/i });   
        fireEvent.change(nameInput, { target: { value: 'J@hn' } });
        fireEvent.change(emailInput, { target: { value: 'John.doe.com' } });
        fireEvent.change(passwordInput, { target: { value: '123' } });
        await act(async () => {
            fireEvent.click(submitButton);
        }); 
        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith("API Error");
        });   
    });
});
   


