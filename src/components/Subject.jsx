import React from 'react';

const Subject = ({ onChange, subject }) => (
  <input
    className="subject"
    type="text"
    value={subject}
    onChange={(event) => onChange(event.target.value)} />
);

Subject.propTypes = {
  subject: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
};

export default Subject;
