import React from 'react';
import './App.css';
import Filter from './components/Filter';
import Table from './components/Table';
import SWProvider from './context/SWProvider';

function App() {
  return (
    <SWProvider>
      <Filter />
      <Table />
    </SWProvider>
  );
}

export default App;
