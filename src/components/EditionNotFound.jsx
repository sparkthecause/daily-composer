import React from 'react';

const EditionNotFound = ({ createEdition }) => {
  return(
    <div className="no-edition-found">
      <p>No edition found.</p>
      <p>Want to create one?</p>
      <button
        className="create-edition-button"
        onClick={createEdition} >
        create edition
      </button>
    </div>
  );
};

EditionNotFound.propTypes = {
  createEdition: React.PropTypes.func.isRequired,
};

export default EditionNotFound;
