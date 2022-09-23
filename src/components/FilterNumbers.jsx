import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FilterNumbers() {
  const { handleFilter, filteredOptions, handleChangeColumn, handleChangeComparison,
    handleChangeValue, column, comparison, value } = useContext(StarWarsContext);

  return (
    <div>
      <select
        name="column"
        value={ column }
        onChange={ handleChangeColumn }
        data-testid="column-filter"
      >
        {
          filteredOptions.map((option) => (
            <option key={ option }>{ option }</option>
          ))
        }
      </select>

      <select
        name="comparison"
        value={ comparison }
        onChange={ handleChangeComparison }
        data-testid="comparison-filter"
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <label htmlFor="value">
        Digite um valor
        <input
          name="value"
          value={ value }
          type="number"
          onChange={ handleChangeValue }
          id="value"
          data-testid="value-filter"
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilter }
      >
        Filtrar

      </button>
    </div>
  );
}

export default FilterNumbers;
