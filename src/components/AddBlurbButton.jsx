import React from 'react';
import createBlurbIcon from '../assets/icon-add-color.svg';

const CreateBlurbButton = ({ onCreateBlurb }) => {
  return(
    <div
      className="create-blurb-button"
      onClick={onCreateBlurb} >
      <img
        src={createBlurbIcon}
        alt="Create New Blurb" />
    </div>
  );
};

export default CreateBlurbButton;
