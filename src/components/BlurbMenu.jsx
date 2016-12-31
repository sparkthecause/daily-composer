import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import cancelIcon from '../assets/icon-cancel-color.svg';
import removeIcon from '../assets/icon-remove-color.svg';
import editIcon from '../assets/icon-pencil-color.svg';
import doneIcon from '../assets/icon-checkmark-color.svg';
import repositionIcon from '../assets/icon-reorder-color.svg';

const RepositionHandle = SortableHandle(() => (
  <button>
    <img src={repositionIcon} alt="↕️" />
  </button>
));

const DeleteButton = ({ onDelete }) => (
  <button onClick={onDelete}>
    <img src={removeIcon} alt="🗑" />
  </button>
);

const SaveButton = ({ onSave }) => (
  <button onClick={onSave}>
    <img src={doneIcon} alt="✏️" />
  </button>
);

const CancelButton = ({ onCancel }) => (
  <button onClick={onCancel}>
    <img src={cancelIcon} alt="X" />
  </button>
);

const EditButton = ({ onEdit }) => (
  <button
    onClick={onEdit}>
    <img src={editIcon} alt="✏️" />
  </button>
);

const BlurbMenu = ({isEditable, isEditing, isDeleting, onCancel, onDelete, onEdit, onSave }) => {
  return(
    <div
    className={'blurbMenu'}>
      <div className='purpleLine'/>
      {isEditable && !isEditing && !isDeleting && <EditButton onEdit={onEdit} />}
      {!isEditing && !isDeleting && <RepositionHandle />}
      {!isEditing && !isDeleting && <DeleteButton onDelete={onDelete} />}
      {(isEditing || isDeleting) && <SaveButton onSave={onSave} />}
      {(isEditing || isDeleting) && <CancelButton onCancel={onCancel} />}
    </div>
  );
};

BlurbMenu.propTypes = {
  isEditable: React.PropTypes.bool.isRequired,
  isEditing: React.PropTypes.bool.isRequired,
  isDeleting: React.PropTypes.bool.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired
};

export default BlurbMenu;
