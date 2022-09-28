import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function CardFilter() {
  const { filterByNumericValues, removeFilters } = useContext(StarWarsContext);
  return (
    <div>
      {
        filterByNumericValues.map((filter, index) => (
          <span
            key={ index }
            data-testid="filter"
          >
            <div>{ `${filter.column} ${filter.comparison} ${filter.value}` }</div>
            <button
              type="button"
              // onClick={ removeOneFilter }
            >
              remover filtro

            </button>
          </span>
        ))
      }
      <button
        type="button"
        testid="button-remove-filters"
        onClick={ removeFilters }
      >
        Remove todos os filtros

      </button>
    </div>
  );
}

export default CardFilter;
