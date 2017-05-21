import React from 'react';
import LoginForm from './containers/LoginForm';
import './App.css';

const App = ({children}) => {

  return (
    <div className="App">
      <div className="container">
        {children ? null : <LoginForm />}
        {children}
      </div>
    </div>
  );

}

export default App;
