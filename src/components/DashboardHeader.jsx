import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import nextIcon from '../assets/icon-arrow-right-color.svg';
import previousIcon from '../assets/icon-arrow-left-color.svg';

const DashboardHeader = ({ nextDate, previousDate, title }) => {

  return (
    <div className="header">
      <Link to={`/editions?weekOf=${previousDate}`}>
        <img
          src={previousIcon}
          alt="<" />
      </Link>
      <span>{title}</span>
      <Link to={`/editions?weekOf=${nextDate}`}>
        <img
          src={nextIcon}
          alt=">" />
      </Link>
    </div>
  );
};

DashboardHeader.propTypes = {
  nextDate: PropTypes.string.isRequired,
  previousDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default DashboardHeader;
