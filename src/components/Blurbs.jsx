import React from 'react';
import templates from 'daily-templates';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
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

const Blurbs = SortableContainer(({ blurbs, onCancel, onDelete, onEdit, onSave, onShowMenu }) => {
  const BlurbWithMenu = SortableElement(({ data, id, isEditable, isEditing, isDeleting, isMenuVisible, isRepositioning, type }) => (
    <div
      onMouseEnter={() => onShowMenu(id)}
      className={`blurbWrapper ${isMenuVisible ? 'active' : ''} ${isDeleting ? 'deleting' : ''}`}>
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
          onSave={onSave}/>
      )}
    </div>
  ));

  return(
    <div className="blurbs">
      {blurbs.map(({ data, id, isEditable, isEditing, isDeleting, isMenuVisible, isRepositioning, position, type }) => (
        <BlurbWithMenu
          key={id}
          index={position}

          data={data}
          id={id}
          isEditable={isEditable}
          isEditing={isEditing}
          isDeleting={isDeleting}
          isMenuVisible={isMenuVisible}
          isRepositioning={isRepositioning}
          type={type}/>
        ))
      }
    </div>
  );
});

Blurbs.propTypes = {
  blurbs: React.PropTypes.array.isRequired,
};

export default Blurbs;
