import React from 'react';
import nextIcon from '../assets/icon-arrow-right.svg';
import previousIcon from '../assets/icon-arrow-left.svg';

const Header = ({isApproved, onNext, onPrevious, publishDate}) => {

  return (
    <div>
      <a onClick={onPrevious}>
        <img src={previousIcon} alt="<" />
      </a>
      <span>{publishDate}</span>
      <a onClick={onNext}>
        <img src={nextIcon} alt=">" />      
      </a>
    </div>
  );
}

export default Header;
