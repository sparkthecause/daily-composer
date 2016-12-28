import React from 'react';
import templates from 'daily-templates';
import BlurbMenu from './BlurbMenu';

const blurbDomForData = (type, data) => {
  const templateName = Object.keys(templates).find(tpl => tpl.toLowerCase() === type);
  const Template = templates[templateName];
  return (Template) ? <Template {...data}/> : null;
};

const blurbEditModeDomForData = (id, type, data) => {
  return <div>EDIT ME</div>;
  // const templateName = Object.keys(templates).find(tpl => tpl.toLowerCase() === type);
  // const Template = templates[templateName];
  // return (Template) ? <Template key={id} {...data}/> : null;
};

const Blurbs = ({ blurbs, onCancel, onDelete, onEdit, onReposition, onSave, onShowMenu }) => {
  const positionBlurbs = (a, b) => a.position > b.position;
  const blurbToDOM = ({ data, id, isEditable, isEditing, isDeleting, isMenuVisible, isRepositioning, position, type }) => (
    <div
      className={`blurbWrapper ${isMenuVisible ? 'active' : ''} ${isDeleting ? 'deleting' : ''}`}
      key={id}
      onMouseEnter={() => onShowMenu(id)}>
      {(isEditing) ? blurbEditModeDomForData(type, data) : blurbDomForData(type, data)}
      {isMenuVisible && (
        <BlurbMenu
          id={id}
          isEditable={isEditable}
          isEditing={isEditing}
          isDeleting={isDeleting}
          isRepositioning={isRepositioning}
          onCancel={onCancel}
          onEdit={onEdit}
          onDelete={onDelete}
          onReposition={onReposition}
          onSave={onSave}/>
      )}
    </div>
  );
  return(
    <div className="blurbs">
      {blurbs.sort(positionBlurbs).map(blurbToDOM)}
    </div>
  );
};

Blurbs.propTypes = {
  blurbs: React.PropTypes.array.isRequired,
};

export default Blurbs;
