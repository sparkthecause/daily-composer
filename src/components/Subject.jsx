import React from 'react';
import PropTypes from 'prop-types';
import DebounceInput from 'react-debounce-input';

const Subject = ({ onChange, subject }) =>
  <DebounceInput
    className="subject"
    placeholder="Subject"
    type="text"
    value={subject || ''}
    debounceTimeout={500}
    onChange={(event) => onChange(event.target.value)} />

Subject.propTypes = {
  subject: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default Subject;
