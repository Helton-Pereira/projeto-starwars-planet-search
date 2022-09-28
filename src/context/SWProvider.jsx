import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchPlanets from '../services';
import columnOptions from '../helpers/columnOptions';

function SWProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const [options, setOptions] = useState(columnOptions);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const getPlanets = async () => {
    const apiPlanets = await fetchPlanets();
    setPlanets(apiPlanets);
    setFilteredPlanets(apiPlanets);
  };

  const handleSearch = ({ target }) => {
    const filteredResults = planets.filter(
      (planet) => planet.name.toLowerCase().includes(target.value.toLowerCase()),
    );
    setFilteredPlanets(filteredResults);
  };

  const handleChangeColumn = ({ target }) => {
    setColumn(target.value);
  };

  const handleChangeComparison = ({ target }) => {
    setComparison(target.value);
  };

  const handleChangeValue = ({ target }) => {
    setValue(target.value);
  };

  const handleRepetitionOfColumn = () => {
    const filterColumn = options.filter((item) => item !== column);
    setFilteredOptions(filterColumn);
    setColumn(filterColumn[0]);
  };

  const handleFilter = () => {
    let filter = [];

    if (comparison === 'maior que') {
      filter = filteredPlanets.filter((item) => +item[column] > +value);
    }
    if (comparison === 'menor que') {
      filter = filteredPlanets.filter((item) => +item[column] < +value);
    }
    if (comparison === 'igual a') {
      filter = filteredPlanets.filter((item) => +item[column] === +value);
    }
    setValue(0);
    setFilteredPlanets(filter);
    handleRepetitionOfColumn();
    setFilterByNumericValues([
      ...filterByNumericValues,
      {
        column,
        comparison,
        value,
      }]);
  };

  const removeFilters = () => {
    setOptions(columnOptions);
    setFilteredPlanets(planets);
    setFilterByNumericValues([]);
  };

  const contextValue = {
    planets,
    getPlanets,
    handleSearch,
    filteredPlanets,
    filterByNumericValues,
    handleFilter,
    filteredOptions,
    setOptions,
    column,
    comparison,
    value,
    handleChangeColumn,
    handleChangeComparison,
    handleChangeValue,
    removeFilters,
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      {children}
    </StarWarsContext.Provider>
  );
}

SWProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SWProvider;
