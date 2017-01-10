import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import BlurbMenu from '../components/BlurbMenu';
import templates from 'daily-templates';

const blurbDomForData = (type, data) => {
  const templateName = Object.keys(templates).find(tpl => tpl.toLowerCase() === type);
  const Template = templates[templateName];
  return Template && <Template data={data} />;
};

const blurbEditModeDomForData = (type, data, updateData) => {
  const templateName = Object.keys(templates).find(tpl => tpl.toLowerCase() === type);
  const Template = templates[`${templateName}EditMode`];
  return Template && <Template data={data} updateData={updateData} />;
};

const BlurbWithMenu = SortableElement(({
  data,
  id,
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
    {isEditing ? blurbEditModeDomForData(type, data, updateData) : blurbDomForData(type, data)}
    {isMenuVisible && (
      <BlurbMenu
        id={id}
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
  // isEditable: React.PropTypes.bool.isRequired,
  // isEditing: React.PropTypes.bool.isRequired,
  // isDeleting: React.PropTypes.bool.isRequired,
  // onCancel: React.PropTypes.func.isRequired,
  // onDelete: React.PropTypes.func.isRequired,
  // onEdit: React.PropTypes.func.isRequired,
  // onSave: React.PropTypes.func.isRequired
};

export default BlurbWithMenu;
