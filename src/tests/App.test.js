import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

describe('Testa a aplicação', () => {
  beforeEach(async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));

    await act(async () => render(<App />));
  })

  test('Verifica se API é chamada quando a página for carregada', async () => {
    expect(fetch).toBeCalled()
    const planetName = await screen.findByText(/Tatooine/i)
    expect(planetName).toBeInTheDocument();

    const table = screen.getByRole('table');

    expect(table).toBeInTheDocument();
  })

  test('Verifica se filtragem por comparação funciona', async () => {
    const valueInput = screen.getByRole('spinbutton', { name: /Digite um valor/i });
    const filterButton = screen.getByRole('button', { name: /Filtrar/i})

    const planetName = await screen.findAllByRole('cell');
    expect(planetName[0]).toHaveTextContent(/Tatooine/i);

    userEvent.type(valueInput, '3000000000')
    userEvent.click(filterButton);

    // expect(planetName[0]).toHaveTextContent(/Naboo/i)
  })
})