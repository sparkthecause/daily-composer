import React from 'react';
import nextIcon from '../assets/icon-arrow-right.svg';
import previousIcon from '../assets/icon-arrow-left.svg';
import checkIcon from '../assets/icon-checkmark.svg';
import infoIcon from '../assets/icon-info.svg'

const Header = ({isApproved, onApprove, onInfo, onNext, onPrevious, publishDate}) => {

  // TODO: #6 make publishDate a date picker for fast nav

  return (
    <div className="header">
      <a onClick={onPrevious}>
        <img
          src={previousIcon}
          alt="<" />
      </a>
      <a onClick={onInfo}>
        <img
          src={infoIcon}
          alt="i" />
      </a>
      <span>{publishDate}</span>
      <a onClick={onApprove}>
        <img
          src={checkIcon}
          alt={isApproved ? '+' : '-'} />
      </a>
      <a onClick={onNext}>
        <img
          src={nextIcon}
          alt=">" />
      </a>
    </div>
  );
}

export default Header;
