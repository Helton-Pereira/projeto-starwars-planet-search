import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filter() {
  const { handleSearch } = useContext(StarWarsContext);

  return (
    <input
      type="text"
      placeholder="Busque por um planeta"
      onChange={ handleSearch }
      data-testid="name-filter"
    />
  );
}

export default Filter;
