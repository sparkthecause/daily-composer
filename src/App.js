import React from 'react';
import Header from './components/Header';
import './App.css';

const App = () => {

  const publishDate = "12/12/2016";
  const onNext = () => alert("next");
  const onPrevious = () => alert("previous");

  return (
    <div className="App">
        <Header
          publishDate={publishDate}
          isApproved={false}
          onNext={onNext}
          onPrevious={onPrevious} />
    </div>
  );

}

export default App;
