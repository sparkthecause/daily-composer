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

const Blurbs = ({ blurbs, onEdit, onSaveEdit, onShowMenu }) => {
  const positionBlurbs = (a, b) => a.position > b.position;
  const blurbToDOM = ({ data, id, type, position, isEditing, isMenuVisible }) => (
    <div
      className='blurbWrapper'
      key={id}
      onMouseEnter={() => onShowMenu(id)}>
      {(isEditing) ? blurbEditModeDomForData(type, data) : blurbDomForData(type, data)}
      {isMenuVisible && <BlurbMenu id={id} isEditing={isEditing} onEdit={onEdit} onSaveEdit={onSaveEdit}/>}
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
