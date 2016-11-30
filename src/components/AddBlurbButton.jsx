import React from 'react';
import addBlurbIcon from '../assets/icon-add-color.svg';

const AddBlurbButton = ({ onAddBlurb }) => {
  return(
    <div
      className="add-blurb-container"
      onClick={onAddBlurb} >
      <img
        src={addBlurbIcon}
        alt="Create New Blurb" />
    </div>
  );
};

export default AddBlurbButton;
