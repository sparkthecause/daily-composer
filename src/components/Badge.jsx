import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const colors = {
  blue: "#64adfa",
  gray: "#959595",
  green: "#5bcc5d",
  orange: "#ff7d41",
  purple: "#8e59cd",
  red: "#f0625a",
  yellow: "#fdd713",
};

const Span = styled.span`
  color: ${props => props.color};
  min-width: 40px;
	min-height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  margin: 10px;
	border-radius: 40px;
  border: 2px solid ${props => props.color};
`;

const Badge = ({ color, value }) =>
  <Span color={colors[color]}>
      {value || '- -'}
  </Span>
;

Badge.propTypes = {
  color: PropTypes.string.isRequired,
  value: PropTypes.number
};

export default Badge;
