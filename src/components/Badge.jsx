import React from 'react';

const colors = {
  blue: "#64adfa",
  gray: "#959595",
  green: "#5bcc5d",
  orange: "#ff7d41",
  purple: "#8e59cd",
  red: "#f0625a",
  yellow: "#fdd713",
};

const Badge = ({ color, size, value }) => {
  return (
    <div>
      <span>{value || '- -'}</span>
    </div>
  );
};

Badge.propTypes = {
  color: React.PropTypes.string.isRequired,
  size: React.PropTypes.string.isRequired,
  value: React.PropTypes.number
};

export default Badge;
