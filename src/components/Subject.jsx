import React from 'react';
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
  subject: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
};

export default Subject;
