import React from 'react';
import templates from 'daily-templates';
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
        {
          Object.keys(templates).map(templateName => templateName && (
            <option
              key={templateName.toLowerCase()}
              value={templateName.toLowerCase()}>
                {templateName}
              </option>
            )
          )
        }
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
