import React from 'react';
import { Link } from 'react-router';
import nextIcon from '../assets/icon-arrow-right-color.svg';
import previousIcon from '../assets/icon-arrow-left-color.svg';
import unapprovedIcon from '../assets/icon-checkmark.svg';
import approvedIcon from '../assets/icon-checkmark-color.svg';
import infoIcon from '../assets/icon-info.svg';

const Header = ({isApproved, nextDate, onApprove, onInfo, previousDate, publishDate}) => {

  // TODO: #6 make publishDate a date picker for fast nav

  return (
    <div className="header">
      <Link to={`/editions/${previousDate}`}>
        <img
          src={previousIcon}
          alt="<" />
      </Link>
      {onInfo && isApproved !== undefined &&
        <a onClick={onInfo}>
          <img
            src={infoIcon}
            alt="i" />
        </a>
      }
      <span>{publishDate}</span>
      {onApprove && isApproved !== undefined &&
        <a onClick={onApprove}>
          <img
            src={isApproved ? approvedIcon : unapprovedIcon}
            alt={isApproved ? '+' : '-'} />
        </a>
      }
      <Link to={`/editions/${nextDate}`}>
        <img
          src={nextIcon}
          alt=">" />
      </Link>
    </div>
  );
}

export default Header;
