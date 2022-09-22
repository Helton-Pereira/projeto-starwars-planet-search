import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FilterNumbers() {
  const { filterByNumericValues, handleChange,
    handleFilter } = useContext(StarWarsContext);
  const { column, comparison, value } = filterByNumericValues;

  return (
    <div>
      <select
        name="column"
        value={ column }
        onChange={ handleChange }
        data-testid="column-filter"
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>

      <select
        name="comparison"
        value={ comparison }
        onChange={ handleChange }
        data-testid="comparison-filter"
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input
        name="value"
        value={ value }
        type="number"
        onChange={ handleChange }
        data-testid="value-filter"
      />

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
