import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchPlanets from '../services';

function SWProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState();
  const [filtered, setFiltered] = useState([]);

  const getPlanets = async () => {
    try {
      const apiPlanets = await fetchPlanets();
      setPlanets(apiPlanets);
      setFiltered(apiPlanets);
    } catch (error) {
      return (error.message);
    }
  };

  const handleSearch = ({ target: { value } }) => {
    setSearch(value);
    const filteredPlanets = planets.filter(
      (planet) => planet.name.toLowerCase().includes(value.toLowerCase()),
    );
    setFiltered(filteredPlanets);
  };

  const contextValue = {
    planets,
    getPlanets,
    search,
    handleSearch,
    filtered,
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
