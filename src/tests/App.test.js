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

    // render(<App />);
  })

  test('Verifica se API é chamada quando a página for carregada', async () => {
    render(<App />)
    expect(fetch).toBeCalled()
    const planetName = await screen.findByText(/Tatooine/i)
    expect(planetName).toBeInTheDocument();

    const table = screen.getByRole('table');

    expect(table).toBeInTheDocument();
  })

  test('Verifica se filtragem por comparação funciona', async () => {
    // const valueInput = screen.getByRole('spinbutton', { name: /Digite um valor/i });
    render(<App />)
    const planetName = await screen.findByText(/Tatooine/i)
    const valueInput = screen.getByLabelText(/Digite um valor/i)
    const filterButton = screen.getByRole('button', { name: /Filtrar/i})

    const planetName1 = await screen.findAllByRole('cell');
    expect(planetName1[0]).toHaveTextContent(/Tatooine/i);



 
     act(() => userEvent.type(valueInput, '{backspace}200001') ) 
     screen.debug()
      userEvent.click(filterButton);
   

    // const planetName2 = await screen.findAllByRole('cell');
    // await waitFor(() => {
    //   expect(valueInput).toHaveValue(0);
    //   expect(planetName2[0]).toHaveTextContent(/Aldebaran/i)
    // });
  });

})
