import React from 'react';
import Header from './components/Header';
import './App.css';

const App = () => {

  const publishDate = "12/12/2016"; // TODO: use dynamic date
  const onNext = () => alert("next"); // TODO: Navigate to next date
  const onPrevious = () => alert("previous"); // TODO: Navigate to prev date

  return (
    <div className="App">
      <div className="container">
        <Header
          publishDate={publishDate}
          isApproved={false}
          onNext={onNext}
          onPrevious={onPrevious} />
      </div>
    </div>
  );

}

export default App;
