import React from 'react';
import cancelIcon from '../assets/icon-cancel-color.svg';
import editIcon from '../assets/icon-pencil-color.svg';
import doneIcon from '../assets/icon-checkmark-color.svg';
import repositionIcon from '../assets/icon-reorder-color.svg';

const BlurbMenu = ({id, isEditable, isEditing, isDeleting, isRepositioning, onCancel, onDelete, onEdit, onReposition, onSave }) => {
  return(
    <div
    className={'blurbMenu'}>
      <div className='purpleLine'/>
      {isEditable && !isEditing && !isDeleting && !isRepositioning && (
        <button
          onClick={() => onEdit(id)}>
          <img src={editIcon} alt="✏️" />
        </button>
      )}
      {isEditing && (
        <button onClick={onSave}>
          <img src={doneIcon} alt="✏️" />
        </button>
      )}
      {isEditing && (
        <button onClick={onCancel}>
          <img src={cancelIcon} alt="X" />
        </button>
      )}
      {!isEditing && !isDeleting && !isRepositioning && (
        <button onClick={() => onReposition(id)}>
          <img src={repositionIcon} alt="↕️" />
        </button>
      )}
      {!isEditing && !isDeleting && !isRepositioning && (
        <button onClick={() => onDelete(id)}>
          <img src={cancelIcon} alt="🗑" />
        </button>
      )}
    </div>
  );
};

export default BlurbMenu;
