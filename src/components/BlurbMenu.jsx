import React from 'react';
import deleteIcon from '../assets/icon-cancel-color.svg';
import editIcon from '../assets/icon-pencil-color.svg';
import doneIcon from '../assets/icon-checkmark-color.svg';
import repositionIcon from '../assets/icon-reorder-color.svg';

const BlurbMenu = ({id, isEditing, onDelete, onEdit, onReposition, onSaveEdit }) => {
  return(
    <div
    className={'blurbMenu'}>
      <div className='purpleLine'/>
      {!isEditing && (
        <button
          onClick={() => onEdit(id)}>
          <img src={editIcon} alt="✏️" />
        </button>
      )}
      {isEditing && (
        <button onClick={onSaveEdit}>
          <img src={doneIcon} alt="✏️" />
        </button>
      )}
      {!isEditing && (
        <button onClick={() => onReposition(id)}>
          <img src={repositionIcon} alt="↕️" />
        </button>
      )}
      {!isEditing && (
        <button onClick={() => onDelete(id)}>
          <img src={deleteIcon} alt="🗑" />
        </button>
      )}
    </div>
  );
};

export default BlurbMenu;
