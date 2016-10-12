import React from 'react';
import { Link } from 'react-router';
import './App.css';

const App = ({children}) => {

  return (
    <div className="App">
      <div className="container">
        {children ? null : <Link to="/editions">Editions Link</Link>}
        {children}
      </div>
    </div>
  );

}

export default App;
