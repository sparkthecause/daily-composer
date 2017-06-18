import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import BlurbMenu from '../components/BlurbMenu';
import templates from 'daily-templates';

const blurb = (data, isEditing, type, updateData) => {
  const templateName = Object.keys(templates).find(tpl => tpl.toLowerCase() === type);
  const Template = templates[templateName];
  return Template && <Template data={data} isEditing={isEditing} updateData={updateData} />;
};

const BlurbWithMenu = SortableElement(({
  data,
  id,
  isChangePending,
  isDeleting,
  isEditable,
  isEditing,
  isMenuVisible,
  menuActions,
  onShowMenuForBlurb,
  type,
  updateData
}) => (
  <div
    onMouseEnter={() => onShowMenuForBlurb(id)}
    className={`blurbWrapper ${isMenuVisible ? 'active' : ''} ${isDeleting ? 'deleting' : ''}`}>
    {blurb(data, isEditing, type, updateData)}
    {isMenuVisible && (
      <BlurbMenu
        id={id}
        isChangePending={isChangePending}
        isEditable={isEditable}
        isEditing={isEditing}
        isDeleting={isDeleting}
        onCancel={menuActions.onCancel}
        onEdit={menuActions.onEdit}
        onDelete={menuActions.onDelete}
        onSave={menuActions.onSave} />
    )}
  </div>
));

BlurbWithMenu.propTypes = {
  // isEditable: PropTypes.bool.isRequired,
  // isEditing: PropTypes.bool.isRequired,
  // isDeleting: PropTypes.bool.isRequired,
  // onCancel: PropTypes.func.isRequired,
  // onDelete: PropTypes.func.isRequired,
  // onEdit: PropTypes.func.isRequired,
  // onSave: PropTypes.func.isRequired
};

export default BlurbWithMenu;
