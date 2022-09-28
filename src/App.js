import React from 'react';
import './App.css';
import CardFilter from './components/CardFilter';
import Filter from './components/Filter';
import FilterNumbers from './components/FilterNumbers';
import Table from './components/Table';
import SWProvider from './context/SWProvider';

function App() {
  return (
    <SWProvider>
      <Filter />
      <FilterNumbers />
      <CardFilter />
      <Table />
    </SWProvider>
  );
}

export default App;
