import React from 'react';
import cancelIcon from '../assets/icon-cancel-color.svg';
import removeIcon from '../assets/icon-cancel.svg';
import editIcon from '../assets/icon-pencil-color.svg';
import doneIcon from '../assets/icon-checkmark-color.svg';
import repositionIcon from '../assets/icon-reorder-color.svg';

const BlurbMenu = ({isEditable, isEditing, isDeleting, isRepositioning, onCancel, onDelete, onEdit, onReposition, onSave }) => {
  return(
    <div
    className={'blurbMenu'}>
      <div className='purpleLine'/>
      {isEditable && !isEditing && !isDeleting && !isRepositioning && (
        <button
          onClick={onEdit}>
          <img src={editIcon} alt="✏️" />
        </button>
      )}
      {!isEditing && !isDeleting && !isRepositioning && (
        <button onClick={onReposition}>
          <img src={repositionIcon} alt="↕️" />
        </button>
      )}
      {!isEditing && !isDeleting && !isRepositioning && (
        <button onClick={onDelete}>
          <img src={removeIcon} alt="🗑" />
        </button>
      )}
      {(isEditing || isDeleting) && (
        <button onClick={onSave}>
          <img src={doneIcon} alt="✏️" />
        </button>
      )}
      {(isEditing || isDeleting) && (
        <button onClick={onCancel}>
          <img src={cancelIcon} alt="X" />
        </button>
      )}
    </div>
  );
};

export default BlurbMenu;
