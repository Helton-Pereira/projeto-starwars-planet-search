import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchPlanets from '../services';

function SWProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState(
    { column: 'population', comparison: 'maior que', value: 0 },
  );

  const getPlanets = async () => {
    try {
      const apiPlanets = await fetchPlanets();
      setPlanets(apiPlanets);
      setFilteredPlanets(apiPlanets);
    } catch (error) {
      return (error.message);
    }
  };

  const handleSearch = ({ target: { value } }) => {
    const filteredResults = planets.filter(
      (planet) => planet.name.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredPlanets(filteredResults);
  };

  const handleChange = ({ target: { name, value } }) => {
    setFilterByNumericValues((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleFilter = () => {
    const { column, comparison, value } = filterByNumericValues;
    let filteredOptions = [];

    if (comparison === 'maior que') {
      filteredOptions = filteredPlanets.filter((item) => +item[column] > +value);
    }
    if (comparison === 'menor que') {
      filteredOptions = filteredPlanets.filter((item) => +item[column] < +value);
    }
    if (comparison === 'igual a') {
      filteredOptions = filteredPlanets.filter((item) => +item[column] === +value);
    }
    setFilteredPlanets(filteredOptions);
  };

  const contextValue = {
    planets,
    getPlanets,
    handleSearch,
    filteredPlanets,
    filterByNumericValues,
    handleChange,
    handleFilter,
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
