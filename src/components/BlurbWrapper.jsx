import React from 'react';
import templates from 'daily-templates';

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

const Blurbs = ({ blurbs, onEdit }) => {
  const positionBlurbs = (a, b) => a.position > b.position;
  const blurbToDOM = ({ data, id, type, position, isEditing }) => (
    <div key={id} onClick={() => onEdit(id)}>
      {(isEditing) ? blurbEditModeDomForData(type, data) : blurbDomForData(type, data)}
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
