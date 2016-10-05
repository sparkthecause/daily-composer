import React from 'react';
import nextIcon from '../assets/icon-arrow-right.svg';
import previousIcon from '../assets/icon-arrow-left.svg';
import checkIcon from '../assets/icon-checkmark.svg';
import infoIcon from '../assets/icon-info.svg'

const Header = ({isApproved, onNext, onPrevious, publishDate}) => {

   // TODO: #6 make this publishDate a label and a date picker for fast nav

  return (
    <div className="header">
      <a onClick={onPrevious}>
        <img src={previousIcon} alt="<" />
      </a>
      <img src={infoIcon} alt={'i'} />
      <span>{publishDate}</span>
      <img src={checkIcon} alt={isApproved ? '+' : '-'} />
      <a onClick={onNext}>
        <img src={nextIcon} alt=">" />
      </a>
    </div>
  );
}

export default Header;
