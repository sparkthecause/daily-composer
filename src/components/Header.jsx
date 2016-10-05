import React from 'react';
import nextIcon from '../assets/icon-arrow-right.svg';
import previousIcon from '../assets/icon-arrow-left.svg';
import checkIcon from '../assets/icon-checkmark.svg';

const Header = ({isApproved, onNext, onPrevious, publishDate}) => {

   // TODO: #6 make this publishDate a label and a date picker for fast nav

  return (
    <div>
      <a onClick={onPrevious}>
        <img src={previousIcon} alt="<" />
      </a>
      <span>{publishDate}</span>
      <img src={checkIcon} alt={isApproved ? '+' : '-'} />
      <a onClick={onNext}>
        <img src={nextIcon} alt=">" />
      </a>
    </div>
  );
}

export default Header;
