import React from 'react';
import deleteIcon from '../assets/icon-cancel-color.svg';
import editIcon from '../assets/icon-pencil-color.svg';
import doneIcon from '../assets/icon-checkmark-color.svg';
import repositionIcon from '../assets/icon-reorder-color.svg';

const BlurbMenu = ({id, isEditable, isEditing, isDeleting, isRepositioning, onDelete, onEdit, onReposition, onSave }) => {
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
      {(isEditing || isDeleting || isRepositioning) && (
        <button onClick={onSave}>
          <img src={doneIcon} alt="✏️" />
        </button>
      )}
      {!isEditing && !isDeleting && !isRepositioning && (
        <button onClick={() => onReposition(id)}>
          <img src={repositionIcon} alt="↕️" />
        </button>
      )}
      {!isEditing && !isDeleting && !isRepositioning && (
        <button onClick={() => onDelete(id)}>
          <img src={deleteIcon} alt="🗑" />
        </button>
      )}
    </div>
  );
};

export default BlurbMenu;
