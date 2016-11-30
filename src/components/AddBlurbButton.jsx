import React from 'react';
import createBlurbIcon from '../assets/icon-add-color.svg';

const CreateBlurbButton = ({ onCreateBlurb }) => {
  return(
    <button
      className="create-blurb-button"
      onClick={onCreateBlurb} >
      <img
        src={createBlurbIcon}
        alt="create blurb" />
    </button>
  );
};

CreateBlurbButton.propTypes = {
  onCreateBlurb: React.PropTypes.func.isRequired,
};

export default CreateBlurbButton;
