import React from 'react';
import Router from 'react-router';
import './App.css';

const App = ({children}) => {

  return (
    <div className="App">
      <div className="container">
        {children}
      </div>
    </div>
  );

}

export default App;
