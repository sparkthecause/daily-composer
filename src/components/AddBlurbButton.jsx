import React from 'react';
import createBlurbIcon from '../assets/icon-add-color.svg';

const CreateBlurbButton = ({ isAddingBlurb, onAddBlurb, onBlurbTypeSelected, onCreateBlurb }) => {

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
      <select onChange={onBlurbTypeSelected}>
        <option value="title">Title</option>
        <option value="paragraph">Paragraph</option>
        <option value="divider">Divider</option>
        <option value="share">Share</option>
      </select>
      <button onClick={onCreateBlurb}>Done</button>
    </div>
  );

  return isAddingBlurb ? createBlurbButton : addBlurbButton;
};

CreateBlurbButton.propTypes = {
  onCreateBlurb: React.PropTypes.func.isRequired,
};

export default CreateBlurbButton;
