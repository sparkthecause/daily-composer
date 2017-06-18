import React from 'react';
import PropTypes from 'prop-types';
import { SortableHandle } from 'react-sortable-hoc';
import cancelIcon from '../assets/icon-cancel-color.svg';
import removeIcon from '../assets/icon-remove-color.svg';
import editIcon from '../assets/icon-pencil-color.svg';
import doneIcon from '../assets/icon-checkmark-color.svg';
import repositionIcon from '../assets/icon-reorder-color.svg';

const RepositionHandle = SortableHandle(() => (
  <button>
    <img draggable={false} src={repositionIcon} alt="↕️" />
  </button>
));

const DeleteButton = ({ onDelete }) => (
  <button onClick={onDelete}>
    <img src={removeIcon} alt="🗑" />
  </button>
);

const SaveButton = ({ isDisabled, onSave }) => (
  <button disabled={isDisabled} onClick={onSave}>
    <img src={doneIcon} alt="✏️" />
  </button>
);

const CancelButton = ({ onCancel }) => (
  <button onClick={onCancel}>
    <img src={cancelIcon} alt="X" />
  </button>
);

const EditButton = ({ onEdit }) => (
  <button onClick={onEdit}>
    <img src={editIcon} alt="✏️" />
  </button>
);

const BlurbMenu = ({ isChangePending, isEditable, isEditing, isDeleting, onCancel, onDelete, onEdit, onSave }) => (
  <div
  className={'blurbMenu'}>
    <div className='purpleLine'/>
    {isEditable && !isEditing && !isDeleting && <EditButton onEdit={onEdit} />}
    {!isEditing && !isDeleting && <RepositionHandle />}
    {!isEditing && !isDeleting && <DeleteButton onDelete={onDelete} />}
    {(isEditing || isDeleting) && <SaveButton onSave={onSave} isDisabled={!isChangePending && !isDeleting}/>}
    {(isEditing || isDeleting) && <CancelButton onCancel={onCancel} />}
  </div>
);

BlurbMenu.propTypes = {
  isChangePending: PropTypes.bool.isRequired,
  isEditable: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default BlurbMenu;
