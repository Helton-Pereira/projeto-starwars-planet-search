import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchPlanets from '../services';

function SWProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const getPlanets = async () => {
    try {
      const apiPlanets = await fetchPlanets();
      setPlanets(apiPlanets);
    } catch (error) {
      return (error.message);
    }
  };

  const contextValue = {
    planets,
    getPlanets,
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
