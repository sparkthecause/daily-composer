import React from 'react';
import createBlurbIcon from '../assets/icon-add-color.svg';

const CreateBlurbButton = ({ isAddingBlurb, onAddBlurb, onBlurbTypeSelected, selectedBlurbType }) => {

  const addBlurbButton = (
    <button
      className="create-blurb-button"
      onClick={onAddBlurb} >
      <img
        src={createBlurbIcon}
        alt="add blurb" />
      <p>add blurb</p>
    </button>
  );

  const createBlurbButton = (
    <div
      className="create-blurb-button">
      <select value={selectedBlurbType} onChange={onBlurbTypeSelected}>
        <option value="">Select</option>
        <option value="title">Title</option>
        <option value="paragraph">Paragraph</option>
        <option value="divider">Divider</option>
        <option value="share">Share</option>
        <option value="header">Header</option>
        <option value="unsubscribe">Unsubscribe</option>
      </select>
    </div>
  );

  return isAddingBlurb ? createBlurbButton : addBlurbButton;
};

CreateBlurbButton.propTypes = {
  isAddingBlurb: React.PropTypes.bool.isRequired,
  onAddBlurb: React.PropTypes.func.isRequired,
  onBlurbTypeSelected: React.PropTypes.func.isRequired
};

export default CreateBlurbButton;
