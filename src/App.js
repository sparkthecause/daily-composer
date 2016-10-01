import React from 'react';
import Header from './components/Header';
import './App.css';

const App = () => {

  const title = "Daily Composer";

  return (
    <div className="App">
        <Header title={title} />
    </div>
  );

}

export default App;
