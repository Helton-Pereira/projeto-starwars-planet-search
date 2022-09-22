import React from 'react';
import './App.css';
import Filter from './components/Filter';
import FilterNumbers from './components/FilterNumbers';
import Table from './components/Table';
import SWProvider from './context/SWProvider';

function App() {
  return (
    <SWProvider>
      <Filter />
      <FilterNumbers />
      <Table />
    </SWProvider>
  );
}

export default App;
