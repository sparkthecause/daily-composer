import React from 'react';

const Header = ({isApproved, onNext, onPrevious, publishDate}) => {

  return (
    <div>
      <a onClick={onPrevious}>Previous</a>
      <span>{publishDate}</span>
      <a onClick={onNext}>Next</a>
    </div>
  );
}

export default Header;
