import React from 'react';
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
  isChangePending: React.PropTypes.bool.isRequired,
  isEditable: React.PropTypes.bool.isRequired,
  isEditing: React.PropTypes.bool.isRequired,
  isDeleting: React.PropTypes.bool.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired
};

export default BlurbMenu;
