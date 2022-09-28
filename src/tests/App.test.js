import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

describe('Testa a aplicação', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
  })

  test('Verifica se API é chamada quando a página for carregada', async () => {
    render(<App />)
    expect(fetch).toBeCalled()
    const planetName = await screen.findByText(/Tatooine/i)
    expect(planetName).toBeInTheDocument();

    const table = screen.getByRole('table');

    expect(table).toBeInTheDocument();
  })
  
  test('Verifica se filtragem "maior que" funciona', async () => {
    render(<App />)

    const valueInput = screen.getByLabelText(/Digite um valor/i)
    const filterButton = screen.getByRole('button', { name: /Filtrar/i})
    const planetName1 = await screen.findAllByRole('cell');
    expect(planetName1[0]).toHaveTextContent(/Tatooine/i);

    act(() => userEvent.type(valueInput, '200001') ) 
    userEvent.click(filterButton);

    const planetName2 = await screen.findAllByRole('cell');

    await waitFor(() => {
      expect(valueInput).toHaveValue(0);
      expect(planetName2[0]).toHaveTextContent(/Alderaan/i)
    });
  });

  test('VErifica remoção de filtros', async () => {
    render(<App />)

    const valueInput = screen.getByLabelText(/Digite um valor/i)
    const filterButton = screen.getByRole('button', { name: /Filtrar/i})
    const planetName1 = await screen.findAllByRole('cell');
    expect(planetName1[0]).toHaveTextContent(/Tatooine/i);

    act(() => userEvent.type(valueInput, '200001') ) 
    userEvent.click(filterButton);

    const filterCard = screen.getByTestId('filter')
    expect(filterCard).toBeInTheDocument()

    const removeFilters = screen.getByRole('button', { name: /Remove todos/i })
    userEvent.click(removeFilters)
    expect(filterCard).not.toBeInTheDocument()
  })

  test('Verifica a busca por Planetas', async () => {
    render(<App />)

    const inputNamePlanet = screen.getByTestId('name-filter');
    expect(inputNamePlanet).toBeInTheDocument();

    userEvent.type(inputNamePlanet, 'oo');
    const Tatooine = await screen.findByText(/Tatooine/i);
    
    await waitFor(() => {
      expect(Tatooine).toBeInTheDocument();
    })
    
  })

  test('Verifica se filtragem "menor que" funciona', async () => {
    render(<App />)

    const valueInput = screen.getByLabelText(/Digite um valor/i)
    const filterButton = screen.getByRole('button', { name: /Filtrar/i})
    const comparison = screen.getByTestId(/comparison-filter/i)
    const planetName1 = await screen.findAllByRole('cell');
    expect(planetName1[0]).toHaveTextContent(/Tatooine/i);

    userEvent.selectOptions(comparison, "menor que")
    act(() => userEvent.type(valueInput, '20000') ) 
    userEvent.click(filterButton);

    const planetName2 = await screen.findAllByRole('cell');

    await waitFor(() => {
      expect(valueInput).toHaveValue(0);
      expect(planetName2[0]).toHaveTextContent(/Yavin IV/i)
    });
  });
})
